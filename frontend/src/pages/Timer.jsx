import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Button from "../components/ui/Button";

export default function FocusTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [mode, setMode] = useState("normal"); // "normal" or "pomodoro"
  const [inputMinutes, setInputMinutes] = useState("");
  const [isBreak, setIsBreak] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
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
          toast.success("Focus session complete! Break 5 min.");
          setTimeLeft(5 * 60);
          setTotalSeconds(5 * 60);
          setIsBreak(true);
        } else {
          toast("Break over! Back to focus.");
          setTimeLeft(25 * 60);
          setTotalSeconds(25 * 60);
          setIsBreak(false);
        }
      } else {
        toast("Time's up!");
        setIsRunning(false);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft, isBreak, mode]);

  const startTimer = () => {
    if (mode === "normal") {
      if (!inputMinutes || inputMinutes <= 0) {
        toast.error("Please enter valid minutes");
        return;
      }
      const secs = inputMinutes * 60;
      setTimeLeft(secs);
      setTotalSeconds(secs);
    } else {
      // Pomodoro default = 25 minutes
      setTimeLeft(25 * 60);
      setTotalSeconds(25 * 60);
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
    setTotalSeconds(0);
  };

  const progress = totalSeconds > 0 ? Math.max(0, Math.min(100, Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100))) : 0;
  const ringStyle = {
    background: `conic-gradient(${isBreak ? "#10B981" : "#4F46E5"} ${progress * 3.6}deg, rgba(0,0,0,0.08) 0deg)`,
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative w-full max-w-2xl p-8 text-center bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-3xl overflow-hidden">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-purple-200/30 blur-3xl" />
        <h1 className="relative mb-6 text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">⏱ Focus Timer</h1>

        {/* Mode Selector */}
        <div className="relative z-10 flex justify-center gap-3 mb-6">
          <button
            onClick={() => {
              setMode("normal");
              resetTimer();
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-all shadow-sm ${
              mode === "normal"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => {
              setMode("pomodoro");
              resetTimer();
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-all shadow-sm ${
              mode === "pomodoro"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Pomodoro
          </button>
        </div>

        {/* Input for normal mode */}
        {mode === "normal" && (
          <div className="relative z-10 mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Enter Focus Time (minutes)
            </label>
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              placeholder="e.g. 45"
              className="w-full p-3 text-center border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/70 dark:bg-gray-800/70 backdrop-blur"
            />
          </div>
        )}

        {/* Timer Display */}
        <div className="relative z-10 mb-8 flex items-center justify-center">
          <div className="relative h-56 w-56 rounded-full p-1" style={ringStyle}>
            <div className="absolute inset-0 rounded-full blur-xl opacity-30" style={{ background: isBreak ? "#10B981" : "#4F46E5" }} />
            <div className="h-full w-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-inner">
              <div className="text-6xl font-extrabold text-gray-800 dark:text-gray-100">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        {/* Mode Status */}
        {mode === "pomodoro" && (
          <p className="relative z-10 mb-4 text-sm font-medium text-gray-600 dark:text-gray-300">
            {isBreak ? "Break time (5:00)" : "Focus session (25:00)"}
          </p>
        )}

        {/* Control Buttons */}
        <div className="relative z-10 flex justify-center gap-3">
          {!isRunning ? (
            <Button onClick={startTimer} variant="success">Start</Button>
          ) : (
            <Button onClick={() => setIsRunning(false)} variant="secondary">Pause</Button>
          )}
          <Button onClick={resetTimer} variant="danger">Reset</Button>
        </div>
      </div>
    </div>
  );
}
