import React, { useEffect, useRef, useState } from "react";
import { createSocket } from "../lib/socket";
import ChatBox from "../components/ChatBox";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const endRef = useRef(null);

  useEffect(() => {
    const s = createSocket();
    setSocket(s);

    s.on("connect", () => console.log("socket connected", s.id));
    s.on("message", (msg) => setMessages((m) => [...m, msg]));
    // fetch initial messages via REST if you want (we have backend endpoints)
    return () => {
      s.off("message");
      s.disconnect();
    };
  }, []);

  const handleSend = (text) => {
    if (!socket) return;
    const payload = {
      from: user?.name || "Guest",
      text,
      createdAt: new Date().toISOString(),
    };
    socket.emit("message", payload);
    setMessages((m) => [...m, payload]);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="card">
        <div className="h-72 overflow-auto p-2 border rounded bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className="mb-2">
              <div className="text-xs text-slate-500">
                {m.from} • {new Date(m.createdAt).toLocaleTimeString()}
              </div>
              <div className="inline-block mt-1 px-3 py-2 rounded-md bg-white shadow-sm">
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="mt-4">
          <ChatBox onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
