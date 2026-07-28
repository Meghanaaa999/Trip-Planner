/**
 * Safely parses JSON strings returned from AI, stripping markdown block wrappers
 * and fixing common formatting anomalies gracefully without crashing.
 * 
 * @param {string | object} input 
 * @returns {object | null}
 */
export const safeJsonParse = (input) => {
  if (!input) return null;
  
  if (typeof input === 'object' && input !== null) {
    return input;
  }

  if (typeof input !== 'string') {
    return null;
  }

  let cleaned = input.trim();

  // Strip ```json or ``` markdown fences if present
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '');
  cleaned = cleaned.trim();

  // Find first '{' or '[' and last '}' or ']'
  const firstBrace = cleaned.search(/[\{\[]/);
  const lastBrace = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (err1) {
    console.warn("Standard JSON parse failed, trying relaxed sanitation...", err1);
    try {
      // Clean trailing commas before closing braces/brackets
      const sanitized = cleaned
        .replace(/,\s*([\}\]])/g, '$1')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // strip control chars
      return JSON.parse(sanitized);
    } catch (err2) {
      console.error("Failed to parse JSON despite cleanup:", err2, "\nRaw String:", input);
      return null;
    }
  }
};
