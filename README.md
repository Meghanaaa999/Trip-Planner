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
├── server/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── utils/
│
└── client/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
```

---

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm

### Clone the Repository

```bash
git clone https://github.com/your-username/voyage-ai-trip-planner.git

cd voyage-ai-trip-planner
```

---

### Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the `server` directory.

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

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
```

---

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

Approximately 8 hours.

| Task | Time |
|------|------|
| Planning and UI Design | 1.5 hours |
| Frontend Development | 3 hours |
| Backend Development | 1 hour |
| AI Integration and Error Handling | 1 hour |
| Testing and Responsive Design | 1 hour |
| Documentation | 0.5 hour |

---

## License

This project was developed as part of a Frontend Internship assessment and is intended for educational and evaluation purposes.
