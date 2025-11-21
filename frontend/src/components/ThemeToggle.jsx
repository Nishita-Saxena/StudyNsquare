import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-2 text-sm font-medium transition rounded-lg bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300"
      title="Toggle theme"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}






