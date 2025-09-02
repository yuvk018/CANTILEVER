import React, { useState } from "react";

export default function ChatBox({ onSend }) {
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    onSend && onSend(text.trim());
    setText("");
  };
  return (
    <div className="flex gap-2 items-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-3 border rounded-md"
      />
      <button
        onClick={send}
        className="px-4 py-2 rounded-md bg-primary text-white"
      >
        Send
      </button>
    </div>
  );
}
