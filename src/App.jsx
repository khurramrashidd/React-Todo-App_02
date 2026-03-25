import { useState } from "react";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const clearAll = () => {
    setTodos([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <>
      <div className="container">
        <h1>🚀 Todo App</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="stats">
          <p>Total: {total}</p>
          <p>Completed: {completed}</p>
        </div>

        <ul>
          {todos.map((t, index) => (
            <li key={index} className="todo-item">
              <span
                className={t.completed ? "completed" : ""}
                onClick={() => toggleComplete(index)}
              >
                {t.text}
              </span>

              <div>
                <button onClick={() => toggleComplete(index)}>✅</button>
                <button onClick={() => deleteTask(index)}>❌</button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <Footer day={2} />
    </>
  );
}

export default App;