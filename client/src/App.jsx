import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TripProvider, useTrip } from './context/TripContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorCard } from './components/ErrorCard';
import { ItineraryView } from './components/ItineraryView';
import { Compass, Heart, Sparkles, Globe } from 'lucide-react';

const MainContent = () => {
  const { currentTrip, loading, error } = useTrip();

  return (
    <main className="flex-1 pb-16">
      {/* Hero Section shown when not viewing active itinerary or when generating */}
      {(!currentTrip || loading) && <HeroSection />}

      {/* Conditionally Render Components based on State */}
      {loading && <LoadingSkeleton />}

      {error && !loading && <ErrorCard />}

      {currentTrip && !loading && <ItineraryView />}
    </main>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <TripProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Navbar />
          <MainContent />

          {/* Footer */}
          <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 font-medium">
                <Compass className="w-4 h-4 text-brand-500" />
                <span>VoyageAI Trip Planner &copy; {new Date().getFullYear()}</span>
              </div>

              <div className="flex items-center gap-1 font-medium">
                <span>Engineered with React 19, Tailwind CSS & Groq</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hover:text-brand-500 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-brand-500 cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-brand-500 cursor-pointer transition-colors">API Status</span>
              </div>
            </div>
          </footer>
        </div>
      </TripProvider>
    </ThemeProvider>
  );
}

export default App;
