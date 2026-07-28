import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MapPin, Globe, ShieldCheck, Zap } from 'lucide-react';
import { PromptInput } from './PromptInput';

export const HeroSection = () => {
  return (
    <div className="relative pt-8 pb-16 overflow-hidden">
      {/* Dynamic Animated Gradient Mesh Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-500/20 via-accent-purple/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/50 dark:border-slate-700/50 backdrop-blur-md text-xs font-semibold text-brand-600 dark:text-brand-400 mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
          <span>Next-Gen Groq AI Engine</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
        >
          Plan Your Next Journey with{' '}
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-purple bg-clip-text text-transparent">
            AI Precision
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Describe your dream trip in plain language and let artificial intelligence design a complete, interactive day-by-day itinerary.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 mb-8 text-xs font-semibold text-slate-500 dark:text-slate-400"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-brand-500" />
            <span>Instant Generation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-500" />
            <span>Global Destinations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>100% Drag & Drop Customization</span>
          </div>
        </motion.div>

        {/* Textarea & Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PromptInput />
        </motion.div>
      </div>
    </div>
  );
};
