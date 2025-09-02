import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/matches")
      .then((r) => setMatches(r.data))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Matches</h2>
      {matches.length === 0 ? (
        <div className="text-slate-500">No matches found</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {matches.map((m) => (
            <div key={m._id} className="p-3 border rounded">
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-slate-500">
                {(m.futureDestinations || []).join(", ")}
              </div>
              <div className="mt-2">
                <button
                  onClick={() => nav(`/chat?peer=${m.uid}`)}
                  className="px-3 py-1 bg-primary text-white rounded"
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
