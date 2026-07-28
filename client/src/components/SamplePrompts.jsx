import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Map, Compass, Camera, Heart, Utensils } from 'lucide-react';

const SAMPLE_PROMPTS = [
  {
    icon: Camera,
    label: "Japan Cherry Blossom",
    prompt: "I want a 5-day trip to Japan during cherry blossom season under ₹90,000.",
    color: "from-pink-500/10 to-rose-500/10 border-pink-500/30 text-pink-700 dark:text-pink-300"
  },
  {
    icon: Compass,
    label: "Amalfi Coast Romantic",
    prompt: "7 days romantic luxury trip to Amalfi Coast & Capri, Italy with scenic coastal drives and cliffside dining.",
    color: "from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
  },
  {
    icon: Map,
    label: "Budget Paris Weekend",
    prompt: "3-day budget weekend getaway to Paris under €500 covering Louvre, Eiffel Tower, and historic bakeries.",
    color: "from-purple-500/10 to-indigo-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300"
  },
  {
    icon: Utensils,
    label: "Thailand Island & Food",
    prompt: "6 days trip to Phuket & Bangkok exploring street food markets, island hopping, and night markets under ₹60,000.",
    color: "from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
  },
  {
    icon: Heart,
    label: "Switzerland Alpine",
    prompt: "5 days scenic train journey across Interlaken & Zermatt, Switzerland enjoying snow peaks and alpine lakes.",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
  }
];

export const SamplePrompts = ({ onSelectPrompt, disabled }) => {
  return (
    <div className="w-full mt-6">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Popular Travel Prompts (Click to test)
      </div>

      <div className="flex flex-wrap gap-2.5">
        {SAMPLE_PROMPTS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: disabled ? 1 : 1.03 }}
              whileTap={{ scale: disabled ? 1 : 0.97 }}
              disabled={disabled}
              onClick={() => onSelectPrompt(item.prompt)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border backdrop-blur-md bg-gradient-to-r ${item.color} transition-all shadow-sm ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
