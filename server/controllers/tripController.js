import { generateTripItinerary } from "../services/groqService.js";

/**
 * Handles trip itinerary generation requests
 */
export const createTripItinerary = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required and must be a non-empty string.",
        code: "INVALID_PROMPT"
      });
    }

    if (prompt.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: "Prompt is too short. Please provide a more descriptive trip request.",
        code: "PROMPT_TOO_SHORT"
      });
    }

    const rawJsonText = await generateTripItinerary(prompt.trim());

    return res.status(200).json({
      success: true,
      data: rawJsonText
    });
  } catch (error) {
    console.error("Controller error during trip generation:", error);
    const statusCode = error.statusCode || 500;
    
    return res.status(statusCode).json({
      success: false,
      error: error.message || "An unexpected error occurred while generating your itinerary.",
      code: error.code || "SERVER_ERROR"
    });
  }
};
