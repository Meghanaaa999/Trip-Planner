import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, XCircle, CornerDownLeft } from 'lucide-react';
import { SamplePrompts } from './SamplePrompts';
import { useTrip } from '../context/TripContext';

export const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const { generateItinerary, loading } = useTrip();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;
    generateItinerary(prompt.trim());
  };

  const handleKeyDown = (e) => {
    // Ctrl + Enter or Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-3 sm:p-4 transition-all focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500">
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. I want a 5-day trip to Japan during cherry blossom season under ₹90,000..."
            disabled={loading}
            rows={3}
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg focus:outline-none resize-none px-2 py-1 leading-relaxed"
          />

          {/* Action Bar inside prompt box */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 mt-2 px-1">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span>{prompt.length} / 500 chars</span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                <kbd className="font-sans font-bold">Ctrl</kbd> + <kbd className="font-sans font-bold">Enter</kbd>
                <CornerDownLeft className="w-3 h-3 ml-0.5" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              {prompt.length > 0 && !loading && (
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title="Clear input"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                disabled={!prompt.trim() || loading}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base text-white shadow-lg transition-all ${
                  !prompt.trim() || loading
                    ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed shadow-none text-slate-500'
                    : 'bg-gradient-to-r from-brand-600 via-brand-500 to-accent-purple hover:shadow-brand-500/30 cursor-pointer'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Designing Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/30" />
                    <span>Generate Trip</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </motion.button>
            </div>
          </div>

        </div>
      </form>

      {/* Interactive Sample Prompts */}
      <SamplePrompts
        onSelectPrompt={(selectedText) => {
          setPrompt(selectedText);
        }}
        disabled={loading}
      />
    </div>
  );
};
