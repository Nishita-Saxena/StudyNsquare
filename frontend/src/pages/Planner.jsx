import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Planner = () => {
  const [planner, setPlanner] = useState([]);
  const [filter, setFilter] = useState({ date: "", priority: "" });
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    subject: "",
    targetHours: "",
    priority: "Medium",
    dailyGoal: false,
    startDate: "",
    endDate: "",
    date: "",
    notes: "",
  });

  // 🧠 Get user ID properly from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id || localStorage.getItem("userId");

  // 🧭 Fetch planner entries for the logged-in user
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/planner/${userId}`)
        .then((res) => setPlanner(res.data))
        .catch((err) => console.error("Error fetching planner:", err));
    }
  }, [userId]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // ➕ Add or ✏️ Edit planner
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not found — please log in again.");
      return;
    }

    try {
      const dataToSend = { ...formData, userId };

      if (editingId) {
        // Update existing planner entry
        const res = await axios.put(
          `http://localhost:5000/api/planner/${editingId}`,
          dataToSend
        );
        setPlanner(
          planner.map((p) => (p._id === editingId ? res.data : p))
        );
        setEditingId(null);
        alert("✏️ Planner updated successfully!");
      } else {
        // Add new planner entry
        const res = await axios.post(
          "http://localhost:5000/api/planner",
          dataToSend
        );
        setPlanner([...planner, res.data]);
        alert("📅 Planner entry added!");
      }

      // Reset form
      setFormData({
        subject: "",
        targetHours: "",
        priority: "Medium",
        dailyGoal: false,
        startDate: "",
        endDate: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error saving planner entry:", err);
      alert("Error saving planner entry! Check console for details.");
    }
  };

  // ✏️ Edit planner entry
  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setFormData({
      subject: plan.subject,
      targetHours: plan.targetHours,
      priority: plan.priority,
      dailyGoal: plan.dailyGoal,
      startDate: plan.startDate || "",
      endDate: plan.endDate || "",
      date: plan.date?.split("T")[0] || "",
      notes: plan.notes || "",
    });
  };

  // 🗑️ Delete planner entry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/planner/${id}`);
      setPlanner(planner.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting planner:", err);
      alert("Error deleting planner entry!");
    }
  };

  // 🔍 Filter logic
  const filteredPlanner = planner.filter((plan) => {
    const matchDate = filter.date
      ? plan.date?.split("T")[0] === filter.date
      : true;
    const matchPriority = filter.priority
      ? plan.priority === filter.priority
      : true;
    return matchDate && matchPriority;
  });

  return (
    <div className="max-w-5xl p-6 mx-auto mt-8 rounded-lg shadow-md bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold text-center text-indigo-600">
        🧩 Create Study Planner
      </h1>

      {/* ---- Planner Form ---- */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"
      >
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Physics / DSA"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Target Hours</label>
          <input
            type="number"
            name="targetHours"
            value={formData.targetHours}
            onChange={handleChange}
            placeholder="e.g. 3"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="dailyGoal"
            checked={formData.dailyGoal}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Daily Goal</label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {formData.dailyGoal && (
          <>
            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Write notes or description..."
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          {editingId ? "Update Planner Entry" : "Add Subject to Planner"}
        </button>
      </form>

      {/* ---- Filters ---- */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Filter by Date</label>
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Filter by Priority</label>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <button
          onClick={() => setFilter({ date: "", priority: "" })}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Clear Filters
        </button>
      </div>

      {/* ---- Planner List ---- */}
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">📘 Your Plans</h2>

      {filteredPlanner.length === 0 ? (
        <p className="text-gray-500">No matching entries.</p>
      ) : (
        <div className="space-y-4">
          {filteredPlanner.map((plan) => (
            <div
              key={plan._id}
              className="relative p-4 transition bg-white border rounded shadow-sm hover:shadow-md"
            >
              <div className="absolute flex gap-3 top-2 right-2">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(plan)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(plan._id)}
                />
              </div>
              <h3 className="text-xl font-semibold">{plan.subject}</h3>
              <p>🎯 Target Hours: {plan.targetHours}</p>
              <p>🔥 Priority: {plan.priority}</p>
              <p>📅 Date: {new Date(plan.date).toLocaleDateString()}</p>
              {plan.dailyGoal && (
                <p>
                  🗓️ Daily Goal: {new Date(plan.startDate).toLocaleDateString()} →{" "}
                  {new Date(plan.endDate).toLocaleDateString()}
                </p>
              )}
              {plan.notes && <p>📝 Notes: {plan.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Planner;
