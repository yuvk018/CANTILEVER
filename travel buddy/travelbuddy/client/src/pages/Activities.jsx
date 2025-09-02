import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import ActivityCard from "../components/ActivityCard";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    API.get("/activities")
      .then((r) => setActivities(r.data))
      .catch(() => {});
  }, []);

  const create = async () => {
    if (!user) return alert("Login required");
    if (!title.trim()) return;
    const res = await API.post("/activities", {
      title,
      description: "",
      location: "",
      date: new Date().toISOString(),
    });
    setActivities((a) => [res.data, ...a]);
    setTitle("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Activities</h2>
      </div>

      <div className="card">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Activity title"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={create}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Create
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((a) => (
          <ActivityCard key={a._id} activity={a} />
        ))}
      </div>
    </div>
  );
}
