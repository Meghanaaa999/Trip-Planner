import { safeJsonParse } from '../utils/safeJsonParse.js';
import { validateAndNormalizeTrip } from '../utils/validator.js';

let activeController = null;

/**
 * Fetches generated trip itinerary from backend Express API with AbortController support.
 * 
 * @param {string} prompt - User description of trip
 * @param {object} options - Optional parameters
 * @returns {Promise<object>} Validated trip data object
 */
export const fetchTripItinerary = async (prompt, options = {}) => {
  // Cancel any ongoing in-flight request
  if (activeController) {
    activeController.abort("New request initiated by user.");
  }

  // Create new AbortController
  activeController = new AbortController();
  const signal = activeController.signal;

  // Timeout safety (45 seconds)
  const timeoutId = setTimeout(() => {
    if (activeController) {
      activeController.abort("REQUEST_TIMEOUT");
    }
  }, 45000);

  try {
    const response = await fetch('/api/trip/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal,
    });

    clearTimeout(timeoutId);
    activeController = null;

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore json parse error of error response
      }

      const status = response.status;
      let message = errorData.error || `Server responded with status ${status}`;
      let code = errorData.code || `HTTP_${status}`;

      if (status === 429) {
        message = "Groq API rate limit reached. Please wait a few seconds and try again.";
        code = "RATE_LIMIT";
      } else if (status === 500 && code === "MISSING_API_KEY") {
        message = "GROQ_API_KEY is not configured in server environment file.";
      } else if (status >= 500) {
        message = "Backend service error while communicating with AI. Please try again.";
        code = "SERVER_ERROR";
      }

      const error = new Error(message);
      error.status = status;
      error.code = code;
      throw error;
    }

    const resJson = await response.json();

    if (!resJson.success || !resJson.data) {
      throw new Error("Invalid API response format from backend.");
    }

    // Safely parse JSON from raw AI output string
    const parsedObj = safeJsonParse(resJson.data);
    if (!parsedObj) {
      const err = new Error("Failed to parse JSON response from AI. Response may have been malformed.");
      err.code = "PARSE_ERROR";
      throw err;
    }

    // Validate and normalize trip schema
    const validatedTrip = validateAndNormalizeTrip(parsedObj);
    return validatedTrip;

  } catch (error) {
    clearTimeout(timeoutId);
    activeController = null;

    if (error.name === 'AbortError' || error.message === 'REQUEST_TIMEOUT') {
      if (error.message === 'REQUEST_TIMEOUT') {
        const timeoutErr = new Error("The request timed out. High traffic might be causing AI response delays.");
        timeoutErr.code = "TIMEOUT";
        throw timeoutErr;
      }
      // Silently throw custom cancellation error
      const cancelErr = new Error("Request cancelled");
      cancelErr.code = "CANCELLED";
      throw cancelErr;
    }

    if (!navigator.onLine) {
      const offlineErr = new Error("You appear to be offline. Please check your internet connection.");
      offlineErr.code = "OFFLINE";
      throw offlineErr;
    }

    throw error;
  }
};
