import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Clock, Calendar } from 'lucide-react';

export const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Loading Status Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-3xl glass-panel border border-brand-500/30 bg-gradient-to-r from-brand-500/10 via-accent-purple/10 to-transparent flex items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-500">
            <Sparkles className="w-6 h-6 animate-spin text-brand-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Curating Your Custom Travel Experience...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Querying Groq AI for realistic routes, local highlights, and accurate estimates.
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1.5 rounded-full">
          <span>Structuring JSON</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary Panel Skeleton */}
        <div className="lg:col-span-1 p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4" />
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
          
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
          </div>

          <div className="pt-4 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/5" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
          </div>
        </div>

        {/* Right: Days List Skeletons */}
        <div className="lg:col-span-2 space-y-5">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-xl w-48" />
                </div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-20" />
              </div>

              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />

              {/* Stops Skeletons */}
              <div className="space-y-3 pt-2">
                {[1, 2].map((sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
