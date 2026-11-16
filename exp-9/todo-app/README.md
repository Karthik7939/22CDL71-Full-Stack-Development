# Experiment 9: To-Do List Application in React

> **Objective:** Build a dynamic To-Do List application using **React (with Vite)**. Demonstrates React hooks (`useState`), form event handling, conditional rendering, and immutable state updates (adding, toggling completion, and deleting tasks).

---

## 🚀 Setup & Execution Commands

### 1. Create the React Application using Vite
Run this command from your terminal:
```bash
npm create vite@latest todo-app -- --template react
```

### 2. Navigate into the Project Folder
```bash
cd todo-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL displayed in the terminal (usually `http://localhost:5173/`).

---

## 📝 Files Edited in this Project

| File Path | Role & Description |
| :--- | :--- |
| `src/App.jsx` | Main React component handling to-do state (`useState`), task addition, completion toggle, and deletion. |
| `src/App.css` | Complete stylesheet for centered card layout, inputs, buttons, checklist rows, and completed text strikethrough. |

---

## 💻 Codes to Study for Exam

### 1. `src/App.jsx`
```jsx
import React, { useState } from 'react';
import './App.css'; // <-- Import the CSS file here

export default function App() {
  
  // Initial tasks state array
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React basics', completed: true },
    { id: 2, text: 'Build a simple To-Do app', completed: false },
    { id: 3, text: 'Practice CSS styling', completed: false }
  ]);

  // State to hold the current input value
  const [inputValue, setInputValue] = useState('');

  // Add a new task to the list
  const handleAddTask = (event) => {
    event.preventDefault();

    const trimmedText = inputValue.trim();
    if (trimmedText === '') {
      return;
    }

    const newTask = {
      id: Date.now(), // Uses current timestamp as a unique ID
      text: trimmedText,
      completed: false
    };

    // Immutable state update: spread previous tasks and append new task
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Toggle completed status of a task by ID
  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Remove a task from the list by ID
  const handleDeleteTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(remainingTasks);
  };

  return (
    <div className="page-wrapper">
      <div className="todo-card">
        <h1 className="app-title">My To-Do List</h1>

        {/* Input Form */}
        <form className="input-form" onSubmit={handleAddTask}>
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        {/* Conditional Rendering: Empty message vs. Task list */}
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet! Add one above to get started.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div
                  className="task-content"
                  onClick={() => handleToggleTask(task.id)}
                >
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => { }} // Handled by parent div onClick
                  />
                  <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                  </span>
                </div>

                {/* Button to remove this specific task */}
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

---

### 2. `src/App.css`
```css
/* Reset default browser spacing and set a clean font */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* Center the card on a soft light-gray background */
.page-wrapper {
  min-height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
}

/* Main white card container */
.todo-card {
  background-color: #ffffff;
  width: 100%;
  max-width: 450px;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Heading style */
.app-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: center;
}

/* Input and Add button row */
.input-form {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.task-input {
  flex: 1;
  padding: 12px 14px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.task-input:focus {
  border-color: #3b82f6;
}

.add-button {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background-color: #3b82f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #2563eb;
}

/* List container */
.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Individual task row */
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.task-item:hover {
  background-color: #f3f4f6;
}

/* Clickable area containing checkbox and text */
.task-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  cursor: pointer;
  user-select: none;
}

.task-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.task-text {
  font-size: 16px;
  color: #374151;
  word-break: break-word;
}

/* Applied when a task is marked as completed */
.task-text.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

/* Delete button */
.delete-button {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: #ef4444;
  background-color: #fee2e2;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.2s, color 0.2s;
}

.delete-button:hover {
  background-color: #ef4444;
  color: #ffffff;
}

/* Message shown when there are no tasks */
.empty-message {
  text-align: center;
  color: #6b7280;
  font-size: 15px;
  padding: 20px 0;
}
```

---

## 🎯 Quick Exam / Viva Review Points

1. **Why do we use `event.preventDefault()`?**
   - In HTML forms, submitting triggers a full page refresh by default. `event.preventDefault()` prevents this browser refresh so React can handle the state in-memory.
2. **Why is state immutable in React?**
   - React detects changes by comparing object/array references. Direct mutations like `tasks.push()` do not change the array reference, causing React to skip re-rendering. We always use pure operations like `[...tasks, newTask]`, `tasks.map(...)`, and `tasks.filter(...)`.
3. **Why do elements rendered with `.map()` require a `key` prop?**
   - The `key` (e.g. `key={task.id}`) gives elements a stable identity across renders, enabling React's reconciliation engine to efficiently identify which items changed, were added, or were removed.
