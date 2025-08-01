// import React from "react";
// import { Link } from "react-router-dom";

// const categories = [
//   "general",
//   "business",
//   "entertainment",
//   "health",
//   "science",
//   "sports",
//   "technology",
// ];

// const Navbar = () => {
//   return (
//     <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow">
//       <Link to="/" className="text-xl font-bold">
//         NewsPro
//       </Link>
//       <div className="space-x-4 overflow-x-auto">
//         {categories.map((cat) => (
//           <Link
//             key={cat}
//             to={`/category/${cat}`}
//             className="hover:underline capitalize"
//           >
//             {cat}
//           </Link>
//         ))}
//       </div>
//       <Link
//         to="/login"
//         className="text-sm border px-2 py-1 rounded hover:bg-white hover:text-black"
//       >
//         Login
//       </Link>
//     </nav>
//   );
// };

// export default Navbar;
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
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow">
      <Link to="/" className="text-xl font-bold">
        NewsPro
      </Link>
      <div className="space-x-4 overflow-x-auto">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="hover:underline capitalize"
          >
            {cat}
          </Link>
        ))}
      </div>
      {user ? (
        <button
          onClick={logout}
          className="text-sm border px-2 py-1 rounded hover:bg-white hover:text-black"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="text-sm border px-2 py-1 rounded hover:bg-white hover:text-black"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
