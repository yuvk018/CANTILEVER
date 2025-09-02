import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ActivityDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (id)
      API.get(`/activities/${id}`)
        .then((r) => setActivity(r.data))
        .catch(() => {});
  }, [id]);

  const join = async () => {
    if (!user) return alert("Login required");
    await API.post(`/activities/${id}/join`);
    const refreshed = await API.get(`/activities/${id}`);
    setActivity(refreshed.data);
  };

  if (!activity) return <div className="card">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto card space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{activity.title}</h1>
          <div className="text-sm text-slate-500">
            {activity.location} • {new Date(activity.date).toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-500">Host</div>
          <div className="font-medium">{activity.createdBy}</div>
        </div>
      </div>

      <p className="text-slate-700">{activity.description}</p>

      <div className="flex gap-3">
        <button
          onClick={join}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Join
        </button>
        <button onClick={() => nav(-1)} className="px-4 py-2 rounded border">
          Back
        </button>
      </div>
    </div>
  );
}
