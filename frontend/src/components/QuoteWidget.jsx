// src/components/QuoteWidget.jsx
import React, { useEffect, useState } from "react";

export default function QuoteWidget() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const quotes = [
      "Push yourself, because no one else is going to do it for you.",
      "Don’t watch the clock; do what it does. Keep going.",
      "The secret of getting ahead is getting started.",
      "It always seems impossible until it’s done."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="relative overflow-hidden p-5 text-gray-800 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-indigo-100 dark:border-gray-700 rounded-2xl">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl" />
      <p className="relative italic">“{quote}”</p>
    </div>
  );
}
