import React from "react";
import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  return (
    <div className="card flex gap-4">
      <div className="w-48 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-indigo-50 to-white p-4 flex flex-col justify-between">
        <div className="text-xs text-slate-500">{activity.location}</div>
        <div className="mt-2 font-semibold text-lg">{activity.title}</div>
        <div className="text-xs text-slate-400 mt-2">
          {new Date(activity.date).toLocaleString()}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-slate-700">{activity.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Host: {activity.createdBy}
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/activity/${activity._id}`}
              className="px-3 py-2 text-sm rounded-md border"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
