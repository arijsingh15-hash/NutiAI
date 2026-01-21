
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProfileForm from './components/ProfileForm';
import PhysiqueInsightComponent from './components/PhysiqueInsight';
import Learn from './components/Learn';
import { ViewType, UserProfile, NutritionPlan } from './types';
import { getNutritionPlan } from './services/geminiService';
import { Settings as SettingsIcon, Shield, Info, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load persistence
  useEffect(() => {
    const savedProfile = localStorage.getItem('nutrifit_profile');
    const savedPlan = localStorage.getItem('nutrifit_plan');
    const savedTheme = localStorage.getItem('nutrifit_theme');
    
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedPlan) setNutritionPlan(JSON.parse(savedPlan));
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const handleSaveProfile = async (newProfile: UserProfile) => {
    setIsLoading(true);
    try {
      const plan = await getNutritionPlan(newProfile);
      setProfile(newProfile);
      setNutritionPlan(plan);
      localStorage.setItem('nutrifit_profile', JSON.stringify(newProfile));
      localStorage.setItem('nutrifit_plan', JSON.stringify(plan));
      setActiveView('dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to generate plan. Please check your API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('nutrifit_theme', newTheme ? 'dark' : 'light');
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all your data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard plan={nutritionPlan} profile={profile} onStart={() => setActiveView('profile')} />;
      case 'profile':
        return <ProfileForm initialProfile={profile} onSave={handleSaveProfile} isLoading={isLoading} />;
      case 'physique':
        return <PhysiqueInsightComponent />;
      case 'learn':
        return <Learn />;
      case 'settings':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-emerald-500" />
                  <div>
                    <p className="font-bold">Privacy Policy</p>
                    <p className="text-xs text-gray-500">How we handle your data</p>
                  </div>
                </div>
                <button className="text-emerald-500 font-bold text-sm">Read</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Info size={20} className="text-emerald-500" />
                  <div>
                    <p className="font-bold">App Version</p>
                    <p className="text-xs text-gray-500">v1.0.4 - NutriFit AI</p>
                  </div>
                </div>
                <span className="text-gray-400 font-bold text-sm">Latest</span>
              </div>

              <div className="pt-4">
                <button 
                  onClick={resetAll}
                  className="w-full py-4 border-2 border-rose-100 dark:border-rose-900/30 text-rose-500 rounded-2xl font-bold hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Reset My Journey
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard plan={nutritionPlan} profile={profile} onStart={() => setActiveView('profile')} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
