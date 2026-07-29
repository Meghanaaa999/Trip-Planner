/**
 * Validates and normalizes raw trip data objects.
 * Guarantees required properties exist and provides fallback values if missing.
 */
export const validateAndNormalizeTrip = (rawData) => {
  if (!rawData || typeof rawData !== 'object') {
    throw new Error("Invalid or empty trip data received.");
  }

  const normalized = {
    id: rawData.id || `trip-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: rawData.createdAt || new Date().toISOString(),
    tripTitle: rawData.tripTitle || rawData.title || "Custom AI Travel Itinerary",
    summary: rawData.summary || "A tailor-made travel experience crafted by AI.",
    budget: rawData.budget || "Flexible",
    currency: rawData.currency || "USD",
    bestSeason: rawData.bestSeason || "Year-round",
    travelTips: Array.isArray(rawData.travelTips) 
      ? rawData.travelTips.filter(tip => typeof tip === 'string' && tip.trim().length > 0)
      : ["Check local entry/visa requirements before traveling.", "Keep digital copies of essential documents."],
    days: []
  };

  // Process Days
  const rawDays = Array.isArray(rawData.days) ? rawData.days : [];
  
  normalized.days = rawDays.map((dayItem, index) => {
    const dayNumber = dayItem.day || index + 1;
    const dayId = dayItem.id || `day-${dayNumber}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    
    // Process Stops for this day
    const rawStops = Array.isArray(dayItem.stops) ? dayItem.stops : [];
    const stops = rawStops.map((stopItem, stopIdx) => ({
      id: stopItem.id || `stop-${dayId}-${stopIdx + 1}-${Math.random().toString(36).substring(2, 5)}`,
      name: stopItem.name || stopItem.title || `Stop ${stopIdx + 1}`,
      time: stopItem.time || "Flexible Time",
      description: stopItem.description || "Explore and enjoy this location.",
      type: normalizeStopType(stopItem.type),
      estimatedDuration: stopItem.estimatedDuration || stopItem.duration || "1-2 hours",
      completed: Boolean(stopItem.completed)
    }));

    return {
      id: dayId,
      day: dayNumber,
      title: dayItem.title || `Day ${dayNumber}: Highlights`,
      description: dayItem.description || `Activities and sightseeings for Day ${dayNumber}.`,
      estimatedCost: dayItem.estimatedCost || "Included in budget",
      stops: stops.length > 0 ? stops : [
        {
          id: `stop-${dayId}-default`,
          name: "Arrival & City Walk",
          time: "10:00",
          description: "Get oriented with local surroundings.",
          type: "Sightseeing",
          estimatedDuration: "2 hours",
          completed: false
        }
      ]
    };
  });

  // Ensure at least 1 day exists
  if (normalized.days.length === 0) {
    normalized.days.push({
      id: `day-1-fallback`,
      day: 1,
      title: "Day 1: Arrival & Exploration",
      description: "Welcome to your destination! Settle in and start exploring.",
      estimatedCost: "Moderate",
      stops: [
        {
          id: "stop-day1-1",
          name: "Hotel Check-in & Relax",
          time: "14:00",
          description: "Unpack and prepare for your afternoon tour.",
          type: "Stay",
          estimatedDuration: "1 hour",
          completed: false
        },
        {
          id: "stop-day1-2",
          name: "City Center Walking Tour",
          time: "16:00",
          description: "Discover landmark sights and local culture.",
          type: "Sightseeing",
          estimatedDuration: "3 hours",
          completed: false
        }
      ]
    });
  }

  return normalized;
};

/**
 * Normalizes stop categories for visual styling and icon selection
 */
const normalizeStopType = (rawType) => {
  if (!rawType || typeof rawType !== 'string') return "Sightseeing";
  const typeLower = rawType.toLowerCase();
  
  if (typeLower.includes('food') || typeLower.includes('dining') || typeLower.includes('restaurant') || typeLower.includes('lunch') || typeLower.includes('dinner') || typeLower.includes('breakfast')) {
    return "Food";
  }
  if (typeLower.includes('transport') || typeLower.includes('flight') || typeLower.includes('train') || typeLower.includes('bus') || typeLower.includes('taxi') || typeLower.includes('drive')) {
    return "Transport";
  }
  if (typeLower.includes('stay') || typeLower.includes('hotel') || typeLower.includes('resort') || typeLower.includes('check-in')) {
    return "Stay";
  }
  if (typeLower.includes('activity') || typeLower.includes('tour') || typeLower.includes('hike') || typeLower.includes('swim') || typeLower.includes('museum')) {
    return "Activity";
  }
  
  return "Sightseeing";
};
