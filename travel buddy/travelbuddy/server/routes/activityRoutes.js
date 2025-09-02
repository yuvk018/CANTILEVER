import express from "express";
import {
  createActivity,
  getActivities,
  getActivityById,
  joinActivity,
} from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, createActivity);
router.get("/", getActivities);
router.get("/:id", protect, getActivityById); // protect detail if needed
router.post("/:id/join", protect, joinActivity);
export default router;
