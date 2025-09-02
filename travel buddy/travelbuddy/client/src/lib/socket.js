import { io } from "socket.io-client";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

// single exported factory to create a socket connection when needed
export function createSocket() {
  // caller decides when to connect/disconnect
  return io(API_URL, { autoConnect: true, transports: ["websocket"] });
}
