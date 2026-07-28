import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Bookmark, PlusCircle, MapPin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SavedTripsDrawer } from './SavedTripsDrawer';
import { useTrip } from '../context/TripContext';

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { savedTrips, clearCurrentTrip, currentTrip } = useTrip();

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={clearCurrentTrip}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-purple flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
              <Compass className="w-6 h-6 animate-pulse-slow" />
              <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-slate-900 via-brand-900 to-brand-600 dark:from-white dark:via-slate-100 dark:to-brand-400 bg-clip-text text-transparent tracking-tight">
                  VoyageAI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full border border-brand-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                Smart AI Travel Architect
              </p>
            </div>
          </motion.div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {currentTrip && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={clearCurrentTrip}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-brand-500" />
                New Trip
              </motion.button>
            )}

            {/* Saved Trips Drawer Trigger */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Bookmark className="w-4 h-4 text-brand-500" />
              <span className="hidden sm:inline">Saved Trips</span>
              {savedTrips.length > 0 && (
                <span className="ml-1 bg-brand-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {savedTrips.length}
                </span>
              )}
            </motion.button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Drawer Component */}
      <SavedTripsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
