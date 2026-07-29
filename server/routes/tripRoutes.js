import express from "express";
import { createTripItinerary } from "../controllers/tripController.js";

const router = express.Router();

// POST /api/trip/generate
router.post("/generate", createTripItinerary);

export default router;
