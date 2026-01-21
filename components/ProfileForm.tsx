
import React, { useState } from 'react';
import { UserProfile, ActivityLevel, FitnessGoal } from '../types';
import { Save, ChevronRight, User, Ruler, Weight, Activity, Trophy } from 'lucide-react';

interface ProfileFormProps {
  initialProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile, onSave, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile || {
    age: 20,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: ActivityLevel.MODERATE,
    goal: FitnessGoal.MAINTAIN
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-500 dark:text-slate-400 mb-10">We use this data to calculate your personalized TDEE and macro distribution.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-emerald-500" />
                Age
              </label>
              <input 
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User size={16} className="text-emerald-500" />
                Gender
              </label>
              <select 
                value={profile.gender}
                onChange={(e) => setProfile({...profile, gender: e.target.value as any})}
                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Weight size={16} className="text-emerald-500" />
                Weight (kg)
              </label>
              <input 
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Ruler size={16} className="text-emerald-500" />
                Height (cm)
              </label>
              <input 
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Activity size={16} className="text-emerald-500" />
              Activity Level
            </label>
            <select 
              value={profile.activityLevel}
              onChange={(e) => setProfile({...profile, activityLevel: e.target.value as ActivityLevel})}
              className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {Object.values(ActivityLevel).map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Trophy size={16} className="text-emerald-500" />
              Your Main Goal
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(FitnessGoal).map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setProfile({...profile, goal})}
                  className={`p-4 rounded-2xl text-left transition-all border-2 ${
                    profile.goal === goal 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                      : 'border-transparent bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold">{goal}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          disabled={isLoading}
          type="submit"
          className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Save size={20} />
              Calculate My Strategy
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
