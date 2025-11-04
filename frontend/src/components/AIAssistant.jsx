import React, { useState } from "react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I can help plan your study, summarize tasks, and suggest schedules." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const newMsgs = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      const reply = data?.reply || "I couldn't generate a reply right now.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "Error contacting AI service. Please ensure you're logged in and the backend AI key is set." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
      <h3 className="mb-3 font-semibold">AI Study Assistant</h3>
      <div className="h-64 overflow-y-auto border rounded p-3 space-y-2 bg-gray-50 dark:bg-gray-900">
        {messages.map((m, idx) => (
          <div key={idx} className={`p-2 rounded ${m.role === "assistant" ? "bg-indigo-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"}`}>
            <div className="text-xs mb-1 text-gray-500">{m.role === "assistant" ? "Assistant" : "You"}</div>
            <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Thinking…</div>}
      </div>
      <form onSubmit={send} className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a study plan, tips, summaries…"
          className="flex-1 p-2 border rounded"
        />
        <button className="px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
}


