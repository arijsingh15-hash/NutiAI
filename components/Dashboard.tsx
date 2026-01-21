
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { NutritionPlan, UserProfile } from '../types';
import { Zap, Flame, Target, Utensils, Info } from 'lucide-react';

interface DashboardProps {
  plan: NutritionPlan | null;
  profile: UserProfile | null;
  onStart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plan, profile, onStart }) => {
  if (!plan || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <Zap size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-md mb-8">
          Complete your profile to receive a personalized nutrition plan based on your unique goals and physiology.
        </p>
        <button 
          onClick={onStart}
          className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all"
        >
          Build My Plan
        </button>
      </div>
    );
  }

  const data = [
    { name: 'Protein', value: plan.macros.protein * 4, grams: plan.macros.protein, color: '#10b981' },
    { name: 'Carbs', value: plan.macros.carbs * 4, grams: plan.macros.carbs, color: '#3b82f6' },
    { name: 'Fats', value: plan.macros.fats * 9, grams: plan.macros.fats, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Hello, Athlete! 👋</h1>
          <p className="text-gray-500 dark:text-slate-400">Here's your sustainable nutrition strategy for <span className="text-emerald-500 font-semibold">{profile.goal}</span>.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
          <Target className="text-emerald-500" size={20} />
          <span className="font-medium">{profile.goal}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calories Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Daily Breakdown</h3>
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
              <Flame size={16} />
              {plan.dailyCalories} kcal
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full h-64 md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-4">
              {data.map((macro) => (
                <div key={macro.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                    <span className="font-semibold">{macro.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{macro.grams}g</div>
                    <div className="text-xs text-gray-500">{Math.round((macro.value / plan.dailyCalories) * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-emerald-500 text-white rounded-3xl p-8 shadow-lg shadow-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Info size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Why these numbers?</h3>
            <p className="text-emerald-50 text-sm leading-relaxed mb-6">
              {plan.explanation}
            </p>
          </div>
          <button className="w-full py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
            Read Theory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Food Suggestions */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Utensils className="text-emerald-500" />
            <h3 className="text-xl font-bold">Recommended Foods</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.foodSuggestions.map((food, i) => (
              <span key={i} className="bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium">
                {food}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-amber-500" />
            <h3 className="text-xl font-bold">Expert Tips</h3>
          </div>
          <ul className="space-y-4">
            {plan.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-slate-400">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-2xl flex gap-3 text-sm text-amber-700 dark:text-amber-400">
        <Info size={18} className="shrink-0" />
        <p>Disclaimer: This plan is AI-generated for educational purposes. Always consult a medical professional or certified nutritionist before starting a new diet or exercise regimen, especially if you have underlying health conditions.</p>
      </div>
    </div>
  );
};

export default Dashboard;
