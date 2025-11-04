import React, { useState, useEffect, useRef } from "react";

export default function FocusTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [mode, setMode] = useState("normal"); // "normal" or "pomodoro"
  const [inputMinutes, setInputMinutes] = useState("");
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef(null);

  // Convert seconds to mm:ss format
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearTimeout(timerRef.current);
      if (mode === "pomodoro") {
        if (!isBreak) {
          alert("🎉 Focus session complete! Time for a short 5-min break.");
          setTimeLeft(5 * 60);
          setIsBreak(true);
        } else {
          alert("✅ Break over! Back to focus mode.");
          setTimeLeft(25 * 60);
          setIsBreak(false);
        }
      } else {
        alert("⏰ Time's up!");
        setIsRunning(false);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft, isBreak, mode]);

  const startTimer = () => {
    if (mode === "normal") {
      if (!inputMinutes || inputMinutes <= 0) {
        alert("Please enter valid minutes");
        return;
      }
      setTimeLeft(inputMinutes * 60);
    } else {
      // Pomodoro default = 25 minutes
      setTimeLeft(25 * 60);
      setIsBreak(false);
    }
    setIsRunning(true);
  };

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setInputMinutes("");
    setIsBreak(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-3xl font-bold text-indigo-700">⏱ Focus Timer</h1>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setMode("normal");
              resetTimer();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              mode === "normal"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => {
              setMode("pomodoro");
              resetTimer();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              mode === "pomodoro"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Pomodoro
          </button>
        </div>

        {/* Input for normal mode */}
        {mode === "normal" && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Enter Focus Time (minutes)
            </label>
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              placeholder="e.g. 45"
              className="w-full p-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        )}

        {/* Timer Display */}
        <div className="mb-6 text-6xl font-bold text-gray-800">
          {formatTime(timeLeft)}
        </div>

        {/* Mode Status */}
        {mode === "pomodoro" && (
          <p className="mb-4 text-gray-600">
            {isBreak ? "☕ Break Time" : "🎯 Focus Time"}
          </p>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-6 py-2 font-semibold text-white transition-all bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-6 py-2 font-semibold text-white transition-all bg-yellow-400 rounded-lg hover:bg-yellow-500"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-6 py-2 font-semibold text-gray-700 transition-all bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
