import { Link } from "react-router-dom";
import MapPlaceholder from "../components/MapPlaceholder";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="card flex items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">TravelBuddy</h1>
          <p className="mt-2 text-slate-600">
            Connect with nearby travelers, create meetups, and discover local
            experiences.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/activities"
              className="px-4 py-2 rounded-md bg-primary text-white"
            >
              Browse Activities
            </Link>
            <Link to="/create" className="px-4 py-2 rounded-md border">
              Create Activity
            </Link>
          </div>
        </div>
        <div className="w-96">
          <MapPlaceholder />
        </div>
      </section>
    </div>
  );
}
