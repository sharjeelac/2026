import React from "react";
import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "complete Day 32", isComplete: false },
    { id: 2, task: "complete Day 33", isComplete: true },
  ]);

  const [task, setTask] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      task: task,
      isComplete: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const toggleComplete = (id) => {
    const updatedtodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo;
    });

    setTodos(updatedtodos);
  };

  const deleteTask = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  return (
    <>
      <form action="">
        <h2>Add Task</h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add Task</button>
      </form>

      <h1>Todo List</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>Task : {todo.task}</h3>
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.isComplete ? "Complete" : "Incomplete"}
          </button>
          <button onClick={() => deleteTask(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default App;
