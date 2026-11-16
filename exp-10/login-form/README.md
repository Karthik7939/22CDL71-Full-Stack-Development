# Experiment 10: Login & Signup Authentication Form in React

> **Objective:** Build a responsive authentication interface featuring **Login** and **Sign Up** components in React (using Vite). Demonstrates **Component Decomposition**, **Component State (`useState`)**, **Props & Callback Functions (`onSwitch`)**, and **Conditional Component Switching**.

---

## 🚀 Setup & Execution Commands

### 1. Create the React Application using Vite
Run this command from your terminal:
```bash
npm create vite@latest login-form -- --template react
```

### 2. Navigate into the Project Folder
```bash
cd login-form
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create Components Folder & Files
Unlike Angular CLI (which uses `ng generate component`), in React you create component files manually:
1. Create a `components` directory inside `src`:
   ```bash
   # On Windows PowerShell:
   New-Item -ItemType Directory -Path "src/components" -Force
   ```
2. Create two component files inside `src/components`:
   - `src/components/Login.jsx`
   - `src/components/Signup.jsx`

**Resulting folder structure:**
```text
src/
├── components/
│   ├── Login.jsx
│   └── Signup.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

### 5. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL shown (e.g., `http://localhost:5173/`).

---

## 📝 Files Edited in this Project

| File Path | Role & Description |
| :--- | :--- |
| `src/components/Login.jsx` | Child component: Email & password fields, form submission alert, and "Sign Up" switch button. |
| `src/components/Signup.jsx` | Child component: Full Name, email & password fields, submission alert, and "Login" switch button. |
| `src/App.jsx` | Parent component: Holds boolean `isLogin` state and conditionally renders `<Login>` or `<Signup>`. |
| `src/App.css` | Styling: Centered card container, modern form inputs, focus highlights, and switch buttons. |

---

## 💻 Codes to Study for Exam

### 1. `src/components/Login.jsx`
> **Concept:** Receives `onSwitch` callback function as a prop to request the parent (`App.jsx`) to switch views.

```jsx
import { useState } from 'react';

function Login({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in successfully with: ${email}`);
  };

  return (
    <div className="form-card">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="switch-text">
        Don't have an account?{' '}
        <button type="button" className="switch-btn" onClick={onSwitch}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
```

---

### 2. `src/components/Signup.jsx`
> **Concept:** Manages local state for `name`, `email`, and `password`. Calls `onSwitch()` when the user clicks "Login".

```jsx
import { useState } from 'react';

function Signup({ onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created successfully for: ${name}`);
  };

  return (
    <div className="form-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
      <p className="switch-text">
        Already have an account?{' '}
        <button type="button" className="switch-btn" onClick={onSwitch}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
```

---

### 3. `src/App.jsx`
> **Concept:** Demonstrates conditional rendering using ternary operator `isLogin ? <Login ... /> : <Signup ... />`.

```jsx
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="app-container">
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;
```

---

### 4. `src/App.css`
```css
/* Center everything on the screen with a clean background */
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

/* Card container for the form */
.form-card {
  background: #ffffff;
  padding: 35px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
}

/* Form heading */
.form-card h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
  color: #333333;
}

/* Input container */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #555555;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #007bff;
}

/* Submit button */
.submit-btn {
  width: 100%;
  padding: 11px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

/* Switch text and button */
.switch-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666666;
}

.switch-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  text-decoration: underline;
}

.switch-btn:hover {
  color: #0056b3;
}
```

---

## 🎯 Quick Exam / Viva Review Points

1. **How do child components communicate back to the parent in React?**
   - In React, data flows downwards via props, but child components notify parents by executing **callback functions passed down as props** (e.g. `onSwitch={() => setIsLogin(false)}`).
2. **What are Controlled Components?**
   - Form inputs whose value is controlled by React state (`value={email}`) and updated via change handlers (`onChange={(e) => setEmail(e.target.value)}`).
3. **How does conditional rendering work in `App.jsx`?**
   - Using the ternary operator: `{isLogin ? <Login ... /> : <Signup ... />}`. React re-evaluates this condition every time `setIsLogin` is called and dynamically swaps the mounted DOM element.
