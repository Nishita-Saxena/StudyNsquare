import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    relatedSubject: "",
    deadline: "",
    estimatedTime: "",
    importance: "Medium",
    status: "Pending",
  });

  // ✅ Extract userId correctly from stored user object
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser._id : null;

  const subjects = ["Mathematics", "Physics", "Chemistry", "English"];

  // Fetch tasks
  useEffect(() => {
    if (!userId) return;
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [userId]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { ...formData, userId };
      console.log("📩 Sending new task:", newTask);
      const res = await axios.post("http://localhost:5000/api/tasks", newTask);
      setTasks([...tasks, res.data]);
      setFormData({
        taskName: "",
        relatedSubject: "",
        deadline: "",
        estimatedTime: "",
        importance: "Medium",
        status: "Pending",
      });
      alert("✅ Task added successfully!");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("❌ Error adding task. Check console for details.");
    }
  };

  // Mark task completed
  const markCompleted = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        status: "Completed",
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">📝 Tasks</h1>

      {/* Add Task Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 mb-10 space-y-6 bg-white shadow-lg rounded-2xl"
      >
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Task Name</label>
          <input
            type="text"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            placeholder="e.g., Complete Chapter 3 Notes"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Related Subject</label>
          <select
            name="relatedSubject"
            value={formData.relatedSubject}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Subject</option>
            {subjects.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Estimated Time (hrs)</label>
          <input
            type="number"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            placeholder="e.g., 2"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 font-semibold text-white transition-all duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="w-full max-w-3xl">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks yet. Add one above 👆</p>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`p-4 rounded-xl shadow-md ${
                  task.status === "Completed" ? "bg-green-100" : "bg-white"
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{task.taskName}</h3>
                    <p className="text-sm text-gray-500">{task.relatedSubject}</p>
                    <p className="text-sm text-gray-700">
                      ⏰ Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      Importance: {task.importance}
                    </p>
                  </div>
                  {task.status === "Pending" && (
                    <button
                      onClick={() => markCompleted(task._id)}
                      className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
