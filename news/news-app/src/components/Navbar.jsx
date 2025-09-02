
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-950 text-white shadow-lg border-b border-gray-800">
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide hover:text-blue-400 transition"
      >
        InfoSphere
      </Link>

      <div className="space-x-4 overflow-x-auto hidden md:flex">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="capitalize text-gray-300 hover:text-blue-400 transition"
          >
            {cat}
          </Link>
        ))}
      </div>

      {user ? (
        <button
          onClick={logout}
          className="text-sm border border-gray-600 px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="text-sm border border-gray-600 px-3 py-1 rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
