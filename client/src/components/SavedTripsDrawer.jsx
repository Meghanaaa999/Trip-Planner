import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, Trash2, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const SavedTripsDrawer = ({ isOpen, onClose }) => {
  const { savedTrips, loadSavedTrip, deleteSavedTrip, currentTrip } = useTrip();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 border-l border-slate-200 dark:border-slate-800 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">Saved Itineraries</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {savedTrips.length} {savedTrips.length === 1 ? 'trip' : 'trips'} saved locally
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              {savedTrips.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">No Saved Trips Yet</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Generations are automatically saved here so you can access them anytime.
                  </p>
                </div>
              ) : (
                savedTrips.map(trip => {
                  const isActive = currentTrip && currentTrip.id === trip.id;
                  return (
                    <motion.div
                      key={trip.id}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group relative ${
                        isActive
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 shadow-md ring-1 ring-brand-500'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                      onClick={() => {
                        loadSavedTrip(trip.id);
                        onClose();
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {trip.tripTitle}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {trip.summary}
                          </p>

                          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full">
                              <Calendar className="w-3 h-3" />
                              {trip.days?.length || 0} Days
                            </span>
                            <span>Budget: {trip.budget}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => deleteSavedTrip(trip.id, e)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            title="Delete itinerary"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center text-xs text-slate-500">
              Stored in LocalStorage (No account required)
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
