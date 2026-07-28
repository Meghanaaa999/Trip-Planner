/**
 * Builds the system instructions and user prompt for Groq API
 * enforcing strictly structured JSON output.
 */

export const JSON_SCHEMA_EXAMPLE = {
  tripTitle: "5-Day Tokyo & Kyoto Cherry Blossom Highlights",
  summary: "An enchanting spring journey through Japan's historic temples, serene gardens, and modern delights during peak cherry blossom season.",
  budget: "₹90,000",
  currency: "INR",
  bestSeason: "Late March to Early April (Spring)",
  travelTips: [
    "Purchase a Suica or Pasmo IC card for easy train transfers.",
    "Book Shinkansen tickets in advance for peak sakura week.",
    "Carry cash as small local eateries may not take credit cards."
  ],
  days: [
    {
      day: 1,
      title: "Arrival in Tokyo & Shinjuku Nightlights",
      description: "Land in Tokyo, settle in, and explore the neon-lit avenues of Shinjuku and Omoide Yokocho.",
      estimatedCost: "₹12,000",
      stops: [
        {
          name: "Arrival at Narita/Haneda Airport",
          time: "14:00",
          description: "Clear customs, pick up pocket Wi-Fi, and take Express Train to city center.",
          type: "Transport",
          estimatedDuration: "2 hours"
        },
        {
          name: "Shinjuku Gyoen National Garden",
          time: "16:30",
          description: "Stroll under hundreds of early cherry blossom trees in full bloom.",
          type: "Sightseeing",
          estimatedDuration: "2 hours"
        },
        {
          name: "Dinner at Omoide Yokocho",
          time: "19:00",
          description: "Enjoy authentic yakitori skewers and ramen in atmospheric lantern-lit alleyways.",
          type: "Food",
          estimatedDuration: "1.5 hours"
        }
      ]
    }
  ]
};

export const buildPrompt = (userPrompt) => {
  return `
You are an expert AI Travel Planner.
Your task is to generate a comprehensive, highly realistic, and visually structured travel itinerary based on the user request.

USER REQUEST:
"${userPrompt}"

RULES FOR OUTPUT:
1. You MUST respond ONLY with valid JSON.
2. Do NOT write markdown (do NOT wrap output in \`\`\`json blocks if possible, or keep it strictly clean JSON).
3. Do NOT include intro or outro text (no "Here is your plan:", "Hope this helps!", etc.).
4. Strictly follow the JSON schema provided below.
5. All fields must be filled with sensible, real-world data (durations, realistic costs, time slots, practical travel tips).
6. Ensure each day has 3 to 5 realistic stops (e.g. Morning, Afternoon, Evening, Dinner, Night).
7. Ensure valid stop types: "Sightseeing", "Food", "Transport", "Stay", "Activity".

SCHEMA FORMAT EXAMPLE:
${JSON.stringify(JSON_SCHEMA_EXAMPLE, null, 2)}
`;
};
