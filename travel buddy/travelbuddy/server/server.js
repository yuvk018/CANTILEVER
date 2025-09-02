import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

// mount routes
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/chat", chatRoutes);

// error handler middleware
app.use((err, req, res, next) => {
  console.error("Express error:", err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error", err);
    process.exit(1);
  });

// socket server for realtime chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || "*" },
});

io.on("connection", (socket) => {
  console.log("🔗 Socket connected:", socket.id);

  // join a room
  socket.on("joinRoom", (room) => {
    socket.join(room || "global");
    console.log(`➡️  ${socket.id} joined ${room || "global"}`);
  });

  // handle incoming messages
  socket.on("message", async (payload) => {
    try {
      const room = payload.room || "global";
      const text = typeof payload.text === "string" ? payload.text.trim() : "";

      if (!text) return; // skip empty/invalid messages

      await Message.create({
        room,
        sender: payload.fromUid || payload.from || "anonymous",
        text,
      });

      io.to(room).emit("message", { ...payload, room, text });
    } catch (e) {
      console.error("❌ Socket message save error", e);
    }
  });

  socket.on("disconnect", () =>
    console.log("❎ Socket disconnected:", socket.id)
  );
});

// unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

// graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB disconnected");
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
