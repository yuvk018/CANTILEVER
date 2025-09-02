import React, { createContext, useContext, useEffect, useState } from "react";
import { listActivities as apiList } from "../api/backendAPI";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const list = await apiList();
        if (mounted) setActivities(list);
      } catch (e) {
        console.error("fetch activities failed", e?.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const refresh = async () => {
    setLoading(true);
    const list = await apiList();
    setActivities(list);
    setLoading(false);
  };

  return (
    <ActivityContext.Provider value={{ activities, loading, refresh }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  return useContext(ActivityContext);
}
