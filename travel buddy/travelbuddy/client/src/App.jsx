import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";
import CreateActivity from "./pages/CreateActivity";
import Matches from "./pages/Matches";
import MapView from "./pages/MapView";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <PrivateRoute>
                <Activities />
              </PrivateRoute>
            }
          />
          <Route
            path="/activity/:id"
            element={
              <PrivateRoute>
                <ActivityDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateActivity />
              </PrivateRoute>
            }
          />
          <Route
            path="/matches"
            element={
              <PrivateRoute>
                <Matches />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute>
                <MapView />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
