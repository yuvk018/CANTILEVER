import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  React.useEffect(() => {
    if (user) nav("/");
  }, [user]);
  return (
    <div className="max-w-md mx-auto mt-12 card text-center">
      <h2 className="text-2xl font-semibold mb-4">Welcome to TravelBuddy</h2>
      <p className="text-sm text-slate-500 mb-6">
        Login to access activities, matches and chat
      </p>
      <button
        onClick={login}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
