// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaPlus, FaClock, FaFlag, FaSignOutAlt } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkBase = "flex items-center gap-3 p-2 transition rounded-lg hover:bg-gray-700/60 dark:hover:bg-gray-200/60 hover:translate-x-1";
  const activeClass = "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md dark:from-indigo-500 dark:to-purple-500";

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed z-40 flex items-center justify-between w-full p-3 bg-gray-800 shadow-md md:hidden dark:bg-gray-900">
        <div className="text-white">Smart Planner</div>
        <button
          className="px-3 py-1 text-sm text-white bg-gray-700 rounded"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>

      <div className={`fixed z-30 flex flex-col justify-between w-64 h-screen p-5 text-white bg-gray-800/95 backdrop-blur shadow-xl transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} md:block dark:bg-gray-950/95`}>
      {/* Top Section */}
      <div>
        <h2 className="hidden mb-8 text-2xl font-extrabold tracking-wide text-center md:block">
          Smart Planner
        </h2>
        {/* Profile card */}
        {user && (
          <div className="mb-6 p-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-bold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <div className="truncate font-semibold">{user.name}</div>
                <div className="truncate text-xs text-gray-300">{user.email}</div>
              </div>
            </div>
            {(user.field || user.goalHours) && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {user.field && (
                  <div className="px-2 py-1 rounded bg-white/5">Field: <span className="font-medium">{user.field}</span></div>
                )}
                {user.goalHours !== undefined && user.goalHours !== null && (
                  <div className="px-2 py-1 rounded bg-white/5">Goal: <span className="font-medium">{user.goalHours}h</span></div>
                )}
              </div>
            )}
          </div>
        )}

        <ul className="space-y-5">
          <li>
            <NavLink to="/dashboard" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              <FaCalendarAlt /> Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="/planner" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              <FaPlus /> Create Planner
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              <FaFlag /> Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to="/timer" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              <FaClock /> Timer
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div className="flex items-center justify-between gap-2">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-2 font-semibold transition bg-red-500 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
    </>
  );
}
