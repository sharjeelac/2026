import React from "react";
import { useState } from "react";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const UndoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "complete Day 34", isComplete: true },
    { id: 2, task: "Master React Hooks", isComplete: false },
    { id: 3, task: "Design UI Mockup", isComplete: false },
  ]);
  const [task, setTask] = useState("");

  //calculate progess
  const completedCount = todos.filter((t) => t.isComplete).length;
  const totalCount = todos.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos((todos) => [
      ...todos,
      { id: Date.now(), task: task, isComplete: false },
    ]);
    setTask("");
  };

  const updateTask = (id) => {
    const updatedTodo = todos.map((todo) => {
      return todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo;
    });

    setTodos(updatedTodo);
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100  via-purple-100 to-pink-100 flex justify-center items-center py-10 scroll-px-4">
        {/* main Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 text-white p-8">
            <h1 className="text-3xl tracking-tight font-bold mb-2">My Tasks</h1>
            <p className="text-indigo-200 text-sm mb-6">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Progress Bar */}
            <div className="flex justify-between text-xs font-semibold mb-1 text-indigo-100">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-indigo-900/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-b border-gray-100">
            <form onSubmit={addTask} className="relative">
              <input
                type="text"
                placeholder="Add a New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full pl-4 pr-14 py-4 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-700 placholder-gray-400 font-medium  "
              />
              <button
                type="submit"
                disabled={!task.trim()}
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200 flex item-center justify-center aspect-square"
              >
                <PlusIcon className={"w-6 h-6"}></PlusIcon>
              </button>
            </form>
          </div>

          {/* Task List */}
          <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
            {todos.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>No Tasks Yet . Add One Above!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={` flex justify-between items-center p-4 rounded-xl transition-al duration-200 hover:shadow-md ${
                      todo.isComplete
                        ? "bg-gray-50 border-gray-100"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Custum CheckBox */}
                      <button
                        onClick={() => updateTask(todo.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                          todo.isComplete
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {todo.isComplete && <CheckIcon className="w-6 h-6" />}
                      </button>
                      {/* Task Text */}
                      <span
                        onClick={() => updateTask(todo.id)}
                        className={`text-lg font-medium cursor-pointer transition-all duration-200 select-none ${
                          todo.isComplete
                            ? "text-gray-400 line-through decoration-2 decoration-gray-300"
                            : "text-gray-700"
                        }`}
                      >
                        {todo.task}
                      </span>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTask(todo.id)}
                      className="text-gray-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all opacity-100 md:opacity-0 md:hover:opacity-100 foucus:opacity-100"
                      aria-label="Delete Task"
                    >
                      <TrashIcon className="w-5 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footet */}
        <div className="fixed bottom-4 text-center text-indigo-900/40 text-sm">
          <p>Stay Productive</p>
        </div>
      </div>
    </>
  );
};

export default App;
