// import React, { useMemo, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   useLoadScript,
// } from "@react-google-maps/api";
// import { useActivities } from "../context/ActivityContext";
// import { useNavigate } from "react-router-dom";

// const containerStyle = { width: "100%", height: "72vh" };
// const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India center

// export default function MapView() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   });
//   const { activities } = useActivities();
//   const [selected, setSelected] = useState(null);
//   const nav = useNavigate();

//   if (!isLoaded) return <div className="text-center mt-6">Loading map...</div>;

//   const markers = activities.map((a) => ({
//     id: a._id,
//     pos: a.location?.lat
//       ? { lat: a.location.lat, lng: a.location.lng }
//       : defaultCenter,
//     title: a.title,
//     activityId: a._id,
//   }));

//   return (
//     <div className="max-w-6xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Map</h2>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={defaultCenter}
//         zoom={3}
//       >
//         {markers.map((m) => (
//           <Marker key={m.id} position={m.pos} onClick={() => setSelected(m)} />
//         ))}
//         {selected && (
//           <InfoWindow
//             position={selected.pos}
//             onCloseClick={() => setSelected(null)}
//           >
//             <div className="p-2">
//               <div className="font-semibold">{selected.title}</div>
//               <div className="mt-2 flex gap-2">
//                 <button
//                   onClick={() => nav(`/activity/${selected.activityId}`)}
//                   className="px-2 py-1 rounded border"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => nav(`/chat?activity=${selected.activityId}`)}
//                   className="px-2 py-1 rounded bg-primary text-white"
//                 >
//                   Chat
//                 </button>
//               </div>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   );
// }
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useActivities } from "../context/ActivityContext";
import { useNavigate } from "react-router-dom";

// Fix default marker icon (Leaflet issue in React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const defaultCenter = [20.5937, 78.9629]; // India center

export default function MapView() {
  const { activities } = useActivities();
  const [selected, setSelected] = useState(null);
  const nav = useNavigate();

  const markers = activities.map((a) => ({
    id: a._id,
    pos: a.location?.lat ? [a.location.lat, a.location.lng] : defaultCenter,
    title: a.title,
    activityId: a._id,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Map</h2>
      <MapContainer
        center={defaultCenter}
        zoom={3}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "72vh" }}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Activity markers */}
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={m.pos}
            eventHandlers={{
              click: () => setSelected(m),
            }}
          />
        ))}

        {/* Popup instead of InfoWindow */}
        {selected && (
          <Popup
            position={selected.pos}
            onClose={() => setSelected(null)}
            autoClose={false}
            closeOnClick={false}
          >
            <div className="p-2">
              <div className="font-semibold">{selected.title}</div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => nav(`/activity/${selected.activityId}`)}
                  className="px-2 py-1 rounded border"
                >
                  View
                </button>
                <button
                  onClick={() => nav(`/chat?activity=${selected.activityId}`)}
                  className="px-2 py-1 rounded bg-primary text-white"
                >
                  Chat
                </button>
              </div>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}
