import express from "express";
import { getMessages, postMessage } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/:room", protect, getMessages);
router.post("/:room", protect, postMessage);
export default router;
