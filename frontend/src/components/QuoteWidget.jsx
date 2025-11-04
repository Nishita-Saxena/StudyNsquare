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
    <div className="p-4 text-gray-800 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
      <p className="italic">“{quote}”</p>
    </div>
  );
}
