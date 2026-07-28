# VoyageAI - Full-Stack AI Trip Planner ✈️🌸

A commercial-grade, full-stack AI Trip Planner application built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, **@dnd-kit**, **Express**, and **Google Gemini API**.

---

## 🌟 Overview

VoyageAI transforms natural language travel prompts (e.g. *"I want a 5-day trip to Japan during cherry blossom season under ₹90,000"*) into complete, interactive, and customizable day-by-day itineraries.

> **Key Guarantee**: The AI never returns raw conversational markdown or unparsed text. All output is strictly structured JSON, validated on both client and server, and parsed directly into interactive React components.

---

## ✨ Features

- 🧠 **Google Gemini 2.0 Integration**: Powered by `@google/generative-ai` through a secure Express backend.
- 🎨 **Glassmorphic UI & Dark Mode**: Sleek modern design inspired by Google Travel, Airbnb, and Notion with theme persistence.
- 🖐️ **Drag & Drop Reordering**: Full day reordering powered by `@dnd-kit/core` and `@dnd-kit/sortable`.
- 📝 **Live Accordion Editing**: Expand/collapse days, edit day titles and descriptions, move days up/down, or delete days.
- ✅ **Interactive Checklist**: Mark stops as visited/unvisited with dynamic progress bar calculation.
- 📊 **Summary Dashboard**: Displays overall budget, best season recommendations, travel tips, and completion statistics.
- 💾 **LocalStorage Sync**: Automatically saves generated trips locally and lets users switch between past itineraries using a slide-over drawer.
- 📤 **Export & Print**: Download itineraries as structured JSON or open a formatted print/PDF view.
- 🛡️ **Bulletproof Error Handling**: Custom `safeJsonParse()` handles code blocks, control characters, and malformed responses; gracefully handles timeouts, offline states, and 429 rate limits with retries.

---

## 🏗️ Architecture & Folder Structure

```
trip-planner/
├── README.md
├── server/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── .env
│   ├── routes/
│   │   └── tripRoutes.js
│   ├── controllers/
│   │   └── tripController.js
│   ├── services/
│   │   └── geminiService.js
│   └── utils/
│       └── promptBuilder.js
└── client/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── index.css
        ├── main.jsx
        ├── App.jsx
        ├── context/
        │   ├── ThemeContext.jsx
        │   └── TripContext.jsx
        ├── hooks/
        │   ├── useLocalStorage.js
        │   └── useTripPlanner.js
        ├── services/
        │   └── api.js
        ├── utils/
        │   ├── safeJsonParse.js
        │   ├── validator.js
        │   └── exportUtils.js
        └── components/
            ├── Navbar.jsx
            ├── HeroSection.jsx
            ├── PromptInput.jsx
            ├── SamplePrompts.jsx
            ├── ItineraryView.jsx
            ├── DayCard.jsx
            ├── StopItem.jsx
            ├── SummaryPanel.jsx
            ├── LoadingSkeleton.jsx
            ├── ErrorCard.jsx
            ├── ThemeToggle.jsx
            └── SavedTripsDrawer.jsx
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Server Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder (or copy from `.env.example`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```
> Obtain your Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

Run the backend server:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### 2. Client Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
# Vite dev server will start on http://localhost:5173
```

---

## 🧠 AI Prompt Strategy

The backend enforces strict JSON returning rules via system prompts in `server/utils/promptBuilder.js`:

1. **System Directives**: `responseMimeType: "application/json"` is configured on the Gemini model.
2. **Schema Enforcement**: The prompt contains an explicit JSON schema structure detailing `tripTitle`, `summary`, `budget`, `currency`, `bestSeason`, `travelTips`, and a `days` array containing `stops` objects.
3. **No Markdown Rule**: Gemini is explicitly instructed to omit markdown backtick fences and intro/outro text.

---

## 🛡️ Error Handling & Resilience

- **`safeJsonParse(input)`**: Strips ```json wrappers, cleans trailing commas, and extracts valid JSON objects safely.
- **`validateAndNormalizeTrip(data)`**: Asserts schema rules, injects default values for missing keys, and normalizes stop category types.
- **Network AbortController**: Cancels any previous in-flight requests when a user submits a new prompt.
- **Error Boundaries & Retry Cards**: Custom UI cards for 429 Rate Limits, Missing API Keys, Offline states, and Timeouts with direct Retry buttons.

---

## 🔍 Known Limitations & Considerations

- **Free Tier Gemini Quota**: High rapid request rates may hit Gemini 429 quota limits (handled gracefully via the retry UI).
- **Location Geocoding**: Real-time map API integration (Google Maps JS SDK) can be added as a future enhancement.

---

## ⏱️ Evaluation Notes

- **Time Spent**: ~4 hours (Architecture, Frontend & Backend Implementation, Styling, Testing).
- **AI Tools Used**: Google Antigravity & Gemini 3.6 Flash.
- **Future Improvements**:
  - Interactive Google Maps route preview.
  - Multi-currency currency converter.
  - Collaborative sharing links via backend database.
