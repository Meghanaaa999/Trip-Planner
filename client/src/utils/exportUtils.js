/**
 * Utility functions for exporting and sharing itineraries
 */

export const exportTripAsJSON = (trip) => {
  if (!trip) return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trip, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `${trip.tripTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_itinerary.json`;
  
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const printTripItinerary = () => {
  window.print();
};
