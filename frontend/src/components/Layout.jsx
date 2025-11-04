import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full min-h-screen p-6 md:p-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 ml-64">
        <div className="max-w-7xl mx-auto animate-[fadeIn_0.3s_ease]">
          {children}
        </div>
      </main>
    </div>
  );
}



