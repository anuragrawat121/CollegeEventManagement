import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-blue-600">College Events</div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-gray-700 font-medium">
        <Link
          to="/"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/my-tickets"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          My Tickets
        </Link>
        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/register"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Registration
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
