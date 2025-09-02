export default function UserCard({ user }) {
  return (
    <div className="p-4 rounded-lg border flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-medium text-indigo-700">
        {user?.name?.[0] || "U"}
      </div>
      <div>
        <div className="font-medium">{user?.name}</div>
        <div className="text-sm text-slate-500">Traveler</div>
      </div>
    </div>
  );
}
