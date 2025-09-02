export default function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
      <div className="h-6 bg-slate-200 rounded mb-2" />
      <div className="h-3 bg-slate-200 rounded w-3/4" />
    </div>
  );
}
