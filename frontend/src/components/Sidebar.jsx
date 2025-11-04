// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaPlus, FaClock, FaFlag, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed flex flex-col justify-between w-64 h-screen p-5 text-white bg-gray-800 shadow-lg">
      {/* Top Section */}
      <div>
        <h2 className="mb-8 text-2xl font-bold tracking-wide text-center">
          Smart Planner
        </h2>
        <ul className="space-y-5">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-2 transition rounded-lg hover:bg-gray-700"
            >
              <FaHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/calendar"
              className="flex items-center gap-3 p-2 transition rounded-lg hover:bg-gray-700"
            >
              <FaCalendarAlt /> Calendar
            </Link>
          </li>
          <li>
            <Link
              to="/Planner"
              className="flex items-center gap-3 p-2 transition rounded-lg hover:bg-gray-700"
            >
              <FaPlus /> Create Planner
            </Link>
          </li>
          <li>
            <Link
              to="/Tasks"
              className="flex items-center gap-3 p-2 transition rounded-lg hover:bg-gray-700"
            >
              <FaFlag /> Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/timer"
              className="flex items-center gap-3 p-2 transition rounded-lg hover:bg-gray-700"
            >
              <FaClock /> Timer
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 p-2 font-semibold transition bg-red-500 rounded-lg hover:bg-red-600"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
