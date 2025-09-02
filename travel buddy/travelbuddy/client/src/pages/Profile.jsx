import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    futureDestinations: [],
  });
  const [newDest, setNewDest] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get("/users/me");
        setProfile(res.data);
      } catch (e) {
        // if not found, create default object
        setProfile({ name: user?.name || "", bio: "", futureDestinations: [] });
      }
    }
    load();
  }, [user]);

  const addDestination = () => {
    if (!newDest.trim()) return;
    if ((profile.futureDestinations || []).includes(newDest)) {
      setNewDest("");
      return;
    }
    setProfile((s) => ({
      ...s,
      futureDestinations: [...(s.futureDestinations || []), newDest],
    }));
    setNewDest("");
  };

  const save = async () => {
    await API.put("/users/me", profile);
    alert("Profile saved");
  };

  return (
    <div className="max-w-2xl mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <label className="block mb-2 text-sm">Name</label>
      <input
        value={profile.name || ""}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      />
      <label className="block mb-2 text-sm">Bio</label>
      <textarea
        value={profile.bio || ""}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        className="w-full p-2 border rounded mb-3"
      />
      <label className="block mb-2 text-sm">Future Destinations</label>
      <div className="flex gap-2 mb-3">
        <input
          value={newDest}
          onChange={(e) => setNewDest(e.target.value)}
          placeholder="Add destination"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addDestination}
          className="px-3 py-2 bg-primary text-white rounded"
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 flex-wrap mb-3">
        {(profile.futureDestinations || []).map((d, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={save}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
