import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Wallet,
  Sun,
  Lightbulb,
  CheckCircle2,
  Share2,
  Download,
  Printer,
  Calendar,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { exportTripAsJSON, printTripItinerary } from '../utils/exportUtils';

export const SummaryPanel = () => {
  const { currentTrip } = useTrip();

  if (!currentTrip) return null;

  // Calculate completion metrics across all days
  const allStops = currentTrip.days?.flatMap(d => d.stops || []) || [];
  const totalStops = allStops.length;
  const completedStops = allStops.filter(s => s.completed).length;
  const progressPercent = totalStops > 0 ? Math.round((completedStops / totalStops) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-6 sticky top-28"
    >
      {/* Title & Summary */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-extrabold text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Generated Itinerary</span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {currentTrip.tripTitle}
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentTrip.summary}
        </p>
      </div>

      {/* Progress Bar & Checklist Metrics */}
      <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800/50 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Trip Readiness Progress
          </span>
          <span className="text-brand-600 dark:text-brand-400 font-extrabold">{progressPercent}%</span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-brand-500 to-accent-emerald h-full rounded-full"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <span>{completedStops} of {totalStops} places visited</span>
          <span>{currentTrip.days?.length || 0} Total Days</span>
        </div>
      </div>

      {/* Quick Meta Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Budget */}
        <div className="p-3.5 rounded-2xl bg-brand-50/50 dark:bg-slate-800/60 border border-brand-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-300">
            <Wallet className="w-4 h-4 text-brand-500" />
            <span>Target Budget</span>
          </div>
          <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white">
            {currentTrip.budget}
          </p>
        </div>

        {/* Season */}
        <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Best Season</span>
          </div>
          <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1">
            {currentTrip.bestSeason}
          </p>
        </div>
      </div>

      {/* Travel Tips List */}
      {currentTrip.travelTips && currentTrip.travelTips.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Essential Travel Tips
          </h4>

          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {currentTrip.travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => exportTripAsJSON(currentTrip)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export JSON</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={printTripItinerary}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700"
          title="Print or save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
