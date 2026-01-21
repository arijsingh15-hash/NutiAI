
import React, { useState, useRef } from 'react';
import { analyzePhysique } from '../services/geminiService';
import { PhysiqueInsight } from '../types';
import { Camera, Upload, ShieldAlert, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const PhysiqueInsightComponent: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [insight, setInsight] = useState<PhysiqueInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setInsight(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const result = await analyzePhysique(image);
      setInsight(result);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold">Physique Insights</h1>
        <p className="text-gray-500 dark:text-slate-400">Upload a photo for AI-powered body type and nutrition guidance.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="text-emerald-500" size={20} />
              Privacy & Sensitivity
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                Photos are processed securely via Gemini AI.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                No body shaming. Our AI focuses on physiology and muscle/fat ratios.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                Wear gym attire or form-fitting clothing for best results.
              </li>
            </ul>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all overflow-hidden aspect-square md:aspect-auto md:h-80"
          >
            {image ? (
              <img src={image} className="absolute inset-0 w-full h-full object-contain p-4" alt="Uploaded" />
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <Upload size={32} />
                </div>
                <p className="font-bold">Click to Upload Photo</p>
                <p className="text-xs text-gray-500 mt-2">JPEG, PNG up to 10MB</p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </div>

          {image && !insight && (
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze My Physique
                </>
              )}
            </button>
          )}
        </div>

        <div className="space-y-6">
          {insight ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 animate-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="text-amber-500" />
                AI Analysis
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Estimated Body Type</label>
                  <p className="text-xl font-bold text-emerald-500">{insight.bodyType}</p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Composition Notes</label>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{insight.compositionNotes}</p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 block">Personalized Recommendations</label>
                  <ul className="space-y-3">
                    {insight.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-3 text-sm bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex gap-3 text-xs text-amber-700 dark:text-amber-400 italic">
                  <AlertCircle size={16} className="shrink-0" />
                  {insight.disclaimer}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-10 bg-gray-100/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-gray-300 dark:border-slate-800 text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 text-gray-300">
                <Camera size={32} />
              </div>
              <h4 className="font-bold text-gray-400">Analysis results will appear here</h4>
              <p className="text-sm text-gray-400 mt-2 max-w-xs">Upload a photo and click analyze to see AI-generated insights about your physique.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysiqueInsightComponent;
