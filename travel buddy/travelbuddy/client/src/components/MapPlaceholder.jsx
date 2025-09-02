export default function MapPlaceholder({ markers = [] }) {
  return (
    <div className="card">
      <div className="text-sm text-slate-500">Map</div>
      <div className="mt-3 h-60 rounded-lg border border-dashed border-slate-200 bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-center">
          Interactive map placeholder (Add Google Maps)
        </div>
      </div>
      {markers.length > 0 && (
        <div className="mt-3 text-sm text-slate-500">
          Markers: {markers.length}
        </div>
      )}
    </div>
  );
}
