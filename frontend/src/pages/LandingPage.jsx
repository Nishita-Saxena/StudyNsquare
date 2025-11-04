import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-[#5C6BC0]">
          Smart Study Planner
        </h1>
        <nav className="space-x-4">
          <button className="text-gray-700 hover:text-[#5C6BC0]">Home</button>
          <button className="text-gray-700 hover:text-[#5C6BC0]">Features</button>
          <button className="text-gray-700 hover:text-[#5C6BC0]">About</button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-[#B8C6E2] to-[#C8D9EB] text-gray-800 px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-[#A3C4F3] to-[#D7BCE8] text-white px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-[#EAF1FB] to-[#FAFAFA]">
        <h2 className="mb-4 text-4xl font-semibold text-gray-800">
          Plan Smarter. Study Better.
        </h2>
        <p className="max-w-xl mb-6 text-gray-600">
          Organize your study goals, track your progress, and achieve your
          academic dreams with ease. Your personalized planner is just a click
          away.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-gradient-to-r from-[#B8C6E2] to-[#D7BCE8] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="flex flex-wrap justify-center gap-6 px-4 py-14">
        {[
          {
            title: "📅 Smart Scheduling",
            desc: "Create study sessions that adapt to your productivity patterns.",
          },
          {
            title: "📊 Progress Tracking",
            desc: "Visualize your learning journey and stay motivated every day.",
          },
          {
            title: "🎯 Goal Planner",
            desc: "Set daily, weekly, and long-term goals with smart insights.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 text-center transition bg-white shadow-md rounded-2xl w-72 hover:shadow-lg"
          >
            <h3 className="text-[#5C6BC0] text-lg font-semibold mb-2">
              {f.title}
            </h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[#F3F4F8] text-center py-5 text-gray-600 text-sm">
        <p>© 2025 Smart Study Planner | Designed with 💡 and ☕</p>
        <p className="mt-1 space-x-2">
          <a href="#" className="text-[#5C6BC0] hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="text-[#5C6BC0] hover:underline">
            Terms
          </a>
          <span>|</span>
          <a href="#" className="text-[#5C6BC0] hover:underline">
            Contact
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
