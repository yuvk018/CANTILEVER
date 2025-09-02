import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center text-white font-bold">
            TB
          </div>
          <div>
            <Link to="/" className="text-lg font-semibold text-slate-800">
              TravelBuddy
            </Link>
            <div className="text-xs text-slate-400">
              Meet travelers. Share plans.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/activities"
            className="text-sm px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Activities
          </Link>
          <Link
            to="/map"
            className="text-sm px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Map
          </Link>
          <Link
            to="/matches"
            className="text-sm px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Matches
          </Link>
          <Link
            to="/chat"
            className="text-sm px-3 py-2 rounded-md hover:bg-slate-50"
          >
            Chat
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-sm">
                Hi, <span className="font-semibold">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-sm px-3 py-2 rounded-md border"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="text-sm px-3 py-2 rounded-md border"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
