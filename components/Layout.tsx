
import React from 'react';
import { ViewType } from '../types';
import { 
  LayoutDashboard, 
  UserCircle, 
  Camera, 
  BookOpen, 
  Settings, 
  Moon, 
  Sun 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onNavigate, 
  isDarkMode, 
  toggleTheme 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: UserCircle },
    { id: 'physique', label: 'Physique', icon: Camera },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <h1 className="text-xl font-bold dark:text-white">NutriFit AI</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                    : 'text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={toggleTheme}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </aside>

      {/* Mobile Nav */}
      <header className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">N</div>
            <span className="font-bold">NutriFit</span>
          </div>
          <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-slate-400">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950 p-4 md:p-10">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex justify-around p-2 sticky bottom-0 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewType)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                isActive ? 'text-emerald-500' : 'text-gray-400 dark:text-slate-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
