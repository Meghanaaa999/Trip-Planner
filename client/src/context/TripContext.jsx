import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchTripItinerary } from '../services/api';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [currentTrip, setCurrentTrip] = useLocalStorage('current_trip', null);
  const [savedTrips, setSavedTrips] = useLocalStorage('saved_trips_history', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState('');

  // Auto save new non-duplicate trip into saved history when currentTrip updates
  useEffect(() => {
    if (currentTrip && currentTrip.id) {
      setSavedTrips(prev => {
        const exists = prev.some(item => item.id === currentTrip.id);
        if (exists) {
          return prev.map(item => item.id === currentTrip.id ? currentTrip : item);
        } else {
          return [currentTrip, ...prev];
        }
      });
    }
  }, [currentTrip, setSavedTrips]);

  // Generate Itinerary
  const generateItinerary = async (promptText) => {
    setLoading(true);
    setError(null);
    setLastPrompt(promptText);

    try {
      const tripData = await fetchTripItinerary(promptText);
      setCurrentTrip(tripData);
    } catch (err) {
      if (err.code !== 'CANCELLED') {
        console.error("Error generating trip:", err);
        setError({
          message: err.message || "Failed to generate trip itinerary.",
          code: err.code || "UNKNOWN_ERROR",
          status: err.status
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const retryGeneration = () => {
    if (lastPrompt) {
      generateItinerary(lastPrompt);
    }
  };

  const clearCurrentTrip = () => {
    setCurrentTrip(null);
    setError(null);
  };

  // Interactive Itinerary Mutators
  const toggleStopCompletion = (dayId, stopId) => {
    if (!currentTrip) return;

    const updatedDays = currentTrip.days.map(day => {
      if (day.id !== dayId) return day;

      const updatedStops = day.stops.map(stop => {
        if (stop.id !== stopId) return stop;
        return { ...stop, completed: !stop.completed };
      });

      return { ...day, stops: updatedStops };
    });

    setCurrentTrip({ ...currentTrip, days: updatedDays });
  };

  const deleteDay = (dayId) => {
    if (!currentTrip) return;
    const filteredDays = currentTrip.days
      .filter(d => d.id !== dayId)
      .map((day, idx) => ({ ...day, day: idx + 1 })); // recalculate day numbers

    setCurrentTrip({ ...currentTrip, days: filteredDays });
  };

  const moveDay = (dayId, direction) => {
    if (!currentTrip) return;
    const days = [...currentTrip.days];
    const index = days.findIndex(d => d.id === dayId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= days.length) return;

    // Swap elements
    const temp = days[index];
    days[index] = days[targetIndex];
    days[targetIndex] = temp;

    // Re-index day numbers
    const reindexedDays = days.map((d, i) => ({ ...d, day: i + 1 }));
    setCurrentTrip({ ...currentTrip, days: reindexedDays });
  };

  const reorderDays = (newDays) => {
    if (!currentTrip) return;
    const reindexedDays = newDays.map((d, i) => ({ ...d, day: i + 1 }));
    setCurrentTrip({ ...currentTrip, days: reindexedDays });
  };

  const updateDayHeader = (dayId, newTitle, newDescription) => {
    if (!currentTrip) return;
    const updatedDays = currentTrip.days.map(d => {
      if (d.id !== dayId) return d;
      return {
        ...d,
        title: newTitle !== undefined ? newTitle : d.title,
        description: newDescription !== undefined ? newDescription : d.description
      };
    });
    setCurrentTrip({ ...currentTrip, days: updatedDays });
  };

  const loadSavedTrip = (tripId) => {
    const trip = savedTrips.find(t => t.id === tripId);
    if (trip) {
      setCurrentTrip(trip);
      setError(null);
    }
  };

  const deleteSavedTrip = (tripId, e) => {
    if (e) e.stopPropagation();
    setSavedTrips(prev => prev.filter(t => t.id !== tripId));
    if (currentTrip && currentTrip.id === tripId) {
      setCurrentTrip(null);
    }
  };

  return (
    <TripContext.Provider value={{
      currentTrip,
      savedTrips,
      loading,
      error,
      lastPrompt,
      generateItinerary,
      retryGeneration,
      clearCurrentTrip,
      toggleStopCompletion,
      deleteDay,
      moveDay,
      reorderDays,
      updateDayHeader,
      loadSavedTrip,
      deleteSavedTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
