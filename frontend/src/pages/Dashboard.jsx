// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import QuoteWidget from "../components/QuoteWidget";

export default function Dashboard() {
  const deadlines = [
    { task: "Math Assignment", due: "2025-11-05" },
    { task: "AI Project", due: "2025-11-08" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full min-h-screen p-8 ml-64 bg-gray-50">
        <h1 className="mb-4 text-3xl font-bold">Welcome back 👋</h1>
        <QuoteWidget />
        <div className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">📅 Upcoming Deadlines</h2>
          <div className="grid grid-cols-2 gap-4">
            {deadlines.map((d, i) => (
              <div key={i} className="p-4 bg-white shadow rounded-xl">
                <h3 className="font-bold">{d.task}</h3>
                <p className="text-gray-600">Due: {d.due}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
