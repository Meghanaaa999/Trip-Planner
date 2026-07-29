import { buildPrompt } from "../utils/promptBuilder.js";

/**
 * Service to interact with the Groq chat API
 */
export const generateTripItinerary = async (userPrompt) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_groq_api_key_here") {
    const error = new Error("GROQ_API_KEY is missing or invalid in server .env file.");
    error.statusCode = 500;
    error.code = "MISSING_API_KEY";
    throw error;
  }

  const prompt = buildPrompt(userPrompt);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        top_p: 0.95,
        messages: [
          {
            role: "system",
            content: "You are an expert AI travel planner. Return only valid JSON matching the user's schema and instructions."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const error = new Error(`Groq API request failed with status ${response.status}: ${errorBody}`);
      error.statusCode = response.status;
      error.code = response.status === 429 ? "RATE_LIMIT" : "AI_REQUEST_FAILED";
      throw error;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text || text.trim() === "") {
      const error = new Error("Empty response received from Groq API.");
      error.statusCode = 502;
      error.code = "EMPTY_RESPONSE";
      throw error;
    }

    return text;
  } catch (error) {
    console.error("Error invoking Groq API:", error);

    if (error.statusCode === 429 || error.message?.includes("429") || error.message?.includes("rate limit")) {
      const rateLimitErr = new Error("Groq API rate limit reached or quota exceeded. Please try again in a moment.");
      rateLimitErr.statusCode = 429;
      rateLimitErr.code = "RATE_LIMIT";
      throw rateLimitErr;
    }

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
};
