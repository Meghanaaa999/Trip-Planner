<<<<<<< HEAD
# VoyageAI - AI Trip Planner 

A commercial-grade, full-stack AI Trip Planner application built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, **@dnd-kit**, **Express**, and **Groq API**.

---

##  Overview

VoyageAI transforms natural language travel prompts (e.g. *"I want a 5-day trip to Japan during cherry blossom season under ₹90,000"*) into complete, interactive, and customizable day-by-day itineraries.

> **Key Guarantee**: The AI never returns raw conversational markdown or unparsed text. All output is strictly structured JSON, validated on both client and server, and parsed directly into interactive React components.

---

##  Features

-  **Groq Integration**: Powered by `Groq API` through a secure Express backend.
-  **Glassmorphic UI & Dark Mode**: Sleek modern design inspired by Google Travel, Airbnb, and Notion with theme persistence.
-  **Drag & Drop Reordering**: Full day reordering powered by `@dnd-kit/core` and `@dnd-kit/sortable`.
-  **Live Accordion Editing**: Expand/collapse days, edit day titles and descriptions, move days up/down, or delete days.
-  **Interactive Checklist**: Mark stops as visited/unvisited with dynamic progress bar calculation.
- **Summary Dashboard**: Displays overall budget, best season recommendations, travel tips, and completion statistics.
-  **LocalStorage Sync**: Automatically saves generated trips locally and lets users switch between past itineraries using a slide-over drawer.
-  **Export & Print**: Download itineraries as structured JSON or open a formatted print/PDF view.
-  **Bulletproof Error Handling**: Custom `safeJsonParse()` handles code blocks, control characters, and malformed responses; gracefully handles timeouts, offline states, and 429 rate limits with retries.

---

##  Architecture & Folder Structure

```
trip-planner/
├── README.md
=======
# VoyageAI – Trip Planner

A full-stack AI-powered Trip Planner that converts natural language travel requests into structured, interactive day-by-day itineraries. The application is built using React, Vite, Tailwind CSS, Express.js, and the Groq API, providing a responsive and intuitive user experience while securely handling AI-generated content.

---

## Project Overview

VoyageAI enables users to generate personalised travel itineraries using natural language.

Example input:

> "I want a 5-day trip to Japan during cherry blossom season under ₹90,000."

The application sends the prompt to a secure Express backend, which communicates with the Groq API. The AI returns structured JSON data that is validated and rendered into interactive React components rather than displaying raw AI responses.

The application focuses on usability, reliability, responsive design, and robust handling of AI-generated data.

---

## Features

- AI-powered itinerary generation using the Groq API
- Interactive day-by-day itinerary view
- Expandable and editable itinerary sections
- Drag-and-drop itinerary reordering
- Interactive checklist for places to visit
- Trip summary dashboard with budget and travel tips
- Local storage support for saved itineraries
- Export itinerary as JSON or printable format
- Responsive design for desktop, tablet, and mobile
- Light and Dark theme support
- Glassmorphism-inspired user interface
- Loading skeletons, error states, and retry functionality
- Safe JSON parsing and response validation

---

## Technology Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Context API
- @dnd-kit

### Backend

- Node.js
- Express.js

### AI Integration

- Groq API

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## Folder Structure

```text
trip-planner/
│
├── README.md
│
>>>>>>> c7f5342cf0784cbfca592d998d9a9458ff38406c
├── server/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
<<<<<<< HEAD
│   ├── .env
│   ├── routes/
│   │   └── tripRoutes.js
│   ├── controllers/
│   │   └── tripController.js
│   ├── services/
│   │   └── groqService.js
│   └── utils/
│       └── promptBuilder.js
=======
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── utils/
│
>>>>>>> c7f5342cf0784cbfca592d998d9a9458ff38406c
└── client/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
<<<<<<< HEAD
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
=======
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
>>>>>>> c7f5342cf0784cbfca592d998d9a9458ff38406c
```

---

<<<<<<< HEAD
## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Server Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder 
=======
## Installation

### Prerequisites

- Node.js (v18 or later)
- npm

### Clone the Repository

```bash
git clone https://github.com/your-username/trip-planner.git

cd trip-planner
```

---

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the `server` directory.

>>>>>>> c7f5342cf0784cbfca592d998d9a9458ff38406c
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

<<<<<<< HEAD
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
=======
Start the backend server.

```bash
npm run dev
```

The backend runs on:

```
http://localhost:5000
```

---

### Frontend Setup

Open a new terminal.

```bash
cd client

npm install

npm run dev
```

The frontend runs on:

```
http://localhost:5173
>>>>>>> c7f5342cf0784cbfca592d998d9a9458ff38406c
```

---

<<<<<<< HEAD
## 🧠 AI Prompt Strategy

The backend enforces strict JSON returning rules via system prompts in `server/utils/promptBuilder.js`:

1. **System Directives**: `responseMimeType: "application/json"` is configured on the Groq model.
2. **Schema Enforcement**: The prompt contains an explicit JSON schema structure detailing `tripTitle`, `summary`, `budget`, `currency`, `bestSeason`, `travelTips`, and a `days` array containing `stops` objects.
3. **No Markdown Rule**: Groq is explicitly instructed to omit markdown backtick fences and intro/outro text.

---

## 🛡️ Error Handling & Resilience

- **`safeJsonParse(input)`**: Strips ```json wrappers, cleans trailing commas, and extracts valid JSON objects safely.
- **`validateAndNormalizeTrip(data)`**: Asserts schema rules, injects default values for missing keys, and normalizes stop category types.
- **Network AbortController**: Cancels any previous in-flight requests when a user submits a new prompt.
- **Error Boundaries & Retry Cards**: Custom UI cards for 429 Rate Limits, Missing API Keys, Offline states, and Timeouts with direct Retry buttons.


=======
## Environment Variables

Create a `.env` file inside the `server` directory.

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

An `.env.example` file is included for reference.

---

## AI Usage Note

AI tools were used to assist with UI design ideas, project planning, documentation, and generating initial boilerplate code. All generated code was reviewed, modified, tested, and integrated manually. The final implementation, debugging, and validation were completed with a full understanding of the codebase.

---

## Error Handling

The application includes multiple safeguards to ensure reliable AI integration.

- Safe JSON parsing
- Response validation and normalization
- Retry mechanism for failed requests
- Timeout handling
- Offline detection
- HTTP error handling
- Protection against malformed AI responses
- Prevention of stale API responses
- Loading and empty states

---

## Known Limitations

- AI-generated itineraries may occasionally contain inaccurate or incomplete recommendations.
- Internet connectivity is required for itinerary generation.
- Saved itineraries are stored locally using LocalStorage.
- User authentication is not implemented.
- Cloud synchronization is not available.
- Live maps and real-time travel information are not integrated.

---

## Future Improvements

- Google Maps integration
- Weather forecasts
- Hotel and restaurant recommendations
- Flight suggestions
- Budget optimisation
- Multi-language support
- User authentication
- Cloud storage and synchronization
- Collaborative trip planning
- Voice-based trip planning
- AI-powered itinerary editing

---

## Time Spent

Approximately 6 hours.

| Task | Time |
|------|------|
| Planning and UI Design | 1 hour|
| Frontend Development | 2 hours |
| Backend Development | 1 hour |
| AI Integration and Error Handling | 1 hour |
| Testing and Responsive Design | 0.5 hour |
| Documentation | 0.5 hour |

---

## License

This project was developed as part of a Frontend Internship assessment and is intended for educational and evaluation purposes.
>>>>>>> c7f5342cf0784cbfca592d998d9a9458ff38406c
