import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, WifiOff, Key, Clock, Server } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export const ErrorCard = () => {
  const { error, retryGeneration } = useTrip();

  if (!error) return null;

  const getErrorDetails = () => {
    switch (error.code) {
      case 'OFFLINE':
        return {
          icon: WifiOff,
          title: "You're Offline",
          message: "Please check your internet connection and try again.",
          color: "text-amber-500 bg-amber-500/10 border-amber-500/30"
        };
      case 'MISSING_API_KEY':
        return {
          icon: Key,
          title: "Groq API Key Required",
          message: "Please ensure GROQ_API_KEY is properly set in the server/.env file.",
          color: "text-red-500 bg-red-500/10 border-red-500/30"
        };
      case 'RATE_LIMIT':
        return {
          icon: Clock,
          title: "AI Rate Limit Reached",
          message: "Groq API rate limit has been exceeded. Please wait 10 seconds before retrying.",
          color: "text-orange-500 bg-orange-500/10 border-orange-500/30"
        };
      case 'TIMEOUT':
        return {
          icon: Clock,
          title: "Request Timed Out",
          message: "The AI took longer than expected to generate your trip. Please retry.",
          color: "text-amber-500 bg-amber-500/10 border-amber-500/30"
        };
      case 'PARSE_ERROR':
        return {
          icon: AlertTriangle,
          title: "Response Formatting Issue",
          message: "The AI output could not be parsed into a clean JSON itinerary. Click retry to regenerate.",
          color: "text-purple-500 bg-purple-500/10 border-purple-500/30"
        };
      default:
        return {
          icon: Server,
          title: "Unable to Generate Itinerary",
          message: error.message || "An unexpected error occurred while communicating with backend.",
          color: "text-red-500 bg-red-500/10 border-red-500/30"
        };
    }
  };

  const details = getErrorDetails();
  const Icon = details.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto my-8 p-6 rounded-3xl glass-card border border-red-200 dark:border-red-900/40 shadow-xl"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl ${details.color} border`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {details.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {details.message}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={retryGeneration}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-md hover:shadow-brand-500/25 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Generation</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
