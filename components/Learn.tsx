
import React from 'react';
import { BookOpen, HelpCircle, Dumbbell, Apple, Activity, HeartPulse } from 'lucide-react';

const Learn: React.FC = () => {
  const topics = [
    {
      title: "Calories 101",
      icon: <Activity className="text-orange-500" />,
      content: "Calories are units of energy. Your Body Maintenance Calories (TDEE) is what you burn daily. Eat more to grow (surplus), eat less to lose fat (deficit).",
      color: "bg-orange-50 dark:bg-orange-900/10"
    },
    {
      title: "Protein Importance",
      icon: <Dumbbell className="text-blue-500" />,
      content: "Protein builds and repairs muscle. It's especially crucial during a fat-loss phase to preserve the muscle you already have.",
      color: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
      title: "Bulk vs. Cut",
      icon: <Apple className="text-emerald-500" />,
      content: "Bulking (surplus) is for building muscle. Cutting (deficit) is for losing fat. Recomposition is a slow process of doing both at once.",
      color: "bg-emerald-50 dark:bg-emerald-900/10"
    },
    {
      title: "Healthy Fats",
      icon: <HeartPulse className="text-rose-500" />,
      content: "Fats are essential for hormone production. Never cut fats to zero! They help keep your body functioning properly.",
      color: "bg-rose-50 dark:bg-rose-900/10"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
        <p className="text-gray-500 dark:text-slate-400">Learn the science behind sustainable fitness. No myths, just facts.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, i) => (
          <div key={i} className={`${topic.color} p-8 rounded-3xl border border-white/50 dark:border-white/5 shadow-sm`}>
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              {topic.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{topic.title}</h3>
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-sm">
              {topic.content}
            </p>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-emerald-500" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-8">
          <div>
            <h4 className="font-bold text-lg mb-2">Can I build muscle and lose fat at the same time?</h4>
            <p className="text-gray-600 dark:text-slate-400">Yes! This is called body recomposition. It's most effective for beginners or those returning from a long break. It requires eating at maintenance and heavy resistance training.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Do I need to eat 6 meals a day?</h4>
            <p className="text-gray-600 dark:text-slate-400">Total daily calories and protein are more important than meal timing. Eat in a way that fits your schedule and lifestyle sustainably.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Should I cut out carbs to lose weight?</h4>
            <p className="text-gray-600 dark:text-slate-400">No. Carbs are your body's primary energy source. Fat loss is driven by a calorie deficit, not by removing a specific food group.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learn;
