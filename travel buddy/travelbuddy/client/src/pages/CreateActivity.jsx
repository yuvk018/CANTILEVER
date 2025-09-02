import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateActivity() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/activities", form);
    nav("/activities");
  };

  return (
    <div className="max-w-3xl mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Create Activity</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-3 border rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full p-3 border rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            className="p-2 border rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            type="datetime-local"
            className="p-2 border rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
