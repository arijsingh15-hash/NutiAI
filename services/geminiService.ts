
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, NutritionPlan, PhysiqueInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const NUTRITION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    dailyCalories: { type: Type.NUMBER },
    macros: {
      type: Type.OBJECT,
      properties: {
        protein: { type: Type.NUMBER, description: "Grams of protein" },
        carbs: { type: Type.NUMBER, description: "Grams of carbs" },
        fats: { type: Type.NUMBER, description: "Grams of fats" },
        calories: { type: Type.NUMBER },
      },
      required: ["protein", "carbs", "fats", "calories"]
    },
    explanation: { type: Type.STRING },
    foodSuggestions: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    tips: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    }
  },
  required: ["dailyCalories", "macros", "explanation", "foodSuggestions", "tips"]
};

export const getNutritionPlan = async (profile: UserProfile): Promise<NutritionPlan> => {
  const prompt = `
    Acts as a world-class student-friendly nutritionist. 
    Calculate a safe and sustainable nutrition plan for:
    Age: ${profile.age}
    Weight: ${profile.weight}kg
    Height: ${profile.height}cm
    Gender: ${profile.gender}
    Activity: ${profile.activityLevel}
    Goal: ${profile.goal}
    
    Provide an educational explanation of WHY these numbers were chosen, focusing on long-term health, not extreme dieting.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: NUTRITION_SCHEMA,
    },
  });

  return JSON.parse(response.text || '{}');
};

export const analyzePhysique = async (base64Image: string): Promise<PhysiqueInsight> => {
  const prompt = `
    Analyze this physique photo for fitness and nutrition guidance. 
    CRITICAL RULES:
    1. Do NOT judge appearance or use body-shaming language.
    2. Focus on estimating general body type (ectomorph, mesomorph, endomorph) and fat vs muscle dominance.
    3. Provide nutrition-focused recommendations only.
    4. Provide a clear disclaimer that AI estimates are not professional medical advice.
    5. Be encouraging and focus on sustainability.
  `;

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image.split(',')[1],
    },
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bodyType: { type: Type.STRING },
          compositionNotes: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          disclaimer: { type: Type.STRING }
        },
        required: ["bodyType", "compositionNotes", "recommendations", "disclaimer"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
