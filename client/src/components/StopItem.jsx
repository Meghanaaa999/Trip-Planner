import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Utensils, Compass, Bus, Hotel, Sparkles, MapPin } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const StopItem = ({ stop, dayId }) => {
  const { toggleStopCompletion } = useTrip();

  // Pick category icon
  const getCategoryBadge = (type) => {
    switch (type) {
      case 'Food':
        return {
          icon: Utensils,
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        };
      case 'Transport':
        return {
          icon: Bus,
          color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        };
      case 'Stay':
        return {
          icon: Hotel,
          color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
        };
      case 'Activity':
        return {
          icon: Sparkles,
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        };
      default:
        return {
          icon: Compass,
          color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20'
        };
    }
  };

  const badge = getCategoryBadge(stop.type);
  const CategoryIcon = badge.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group p-4 rounded-2xl border transition-all duration-200 ${
        stop.completed
          ? 'bg-slate-100/60 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800/50 opacity-70'
          : 'bg-white/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:shadow-md hover:border-brand-500/40'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Completion Checkbox */}
        <button
          onClick={() => toggleStopCompletion(dayId, stop.id)}
          className="mt-0.5 text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors focus:outline-none"
          title={stop.completed ? "Mark as unvisited" : "Mark as visited"}
        >
          {stop.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className={`font-bold text-sm sm:text-base ${
              stop.completed
                ? 'line-through text-slate-500 dark:text-slate-400'
                : 'text-slate-900 dark:text-slate-100'
            }`}>
              {stop.name}
            </h5>

            <div className="flex items-center gap-2 text-xs">
              {/* Category Pill */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold border ${badge.color}`}>
                <CategoryIcon className="w-3 h-3" />
                {stop.type}
              </span>

              {/* Time Slot */}
              {stop.time && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                  <Clock className="w-3 h-3" />
                  {stop.time}
                </span>
              )}
            </div>
          </div>

          <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
            stop.completed ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'
          }`}>
            {stop.description}
          </p>

          {/* Duration info */}
          {stop.estimatedDuration && (
            <div className="mt-2 text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <span>Duration: {stop.estimatedDuration}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
