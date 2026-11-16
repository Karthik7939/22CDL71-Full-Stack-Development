# Full Stack Development Lab & Course Repository

🌐 **Live Preview for the first 4 experiments:** [https://22cdl71-full-stack-development.vercel.app/](https://22cdl71-full-stack-development.vercel.app/)

This repository contains all experiments and lab assignments developed for the Full Stack Development curriculum, covering **Frontend (HTML/CSS/JS, Angular, React)** and **Backend (Node.js, Express, MongoDB)**.

---

## 📚 Experiments Index & Study Guides

| Experiment | Title & Description | Tech Stack | Study Guide |
| :--- | :--- | :--- | :--- |
| **EXP-1** | Basic DOM Manipulation & Calculator/Scripts | HTML5, CSS3, JavaScript | [`exp-1/`](./exp-1) |
| **EXP-2** | Asynchronous JavaScript & Weather Data Fetching | JavaScript (Fetch/Async/Await), JSON | [`exp-2/`](./exp-2) |
| **EXP-3** | Interactive Web Form with Client-Side Validation | HTML5, CSS3, JavaScript | [`exp-3/`](./exp-3) |
| **EXP-4** | Basic HTTP Server in Node.js | Node.js | [`exp-4/`](./exp-4) |
| **EXP-5** | Express.js REST API with MongoDB & Mongoose | Node.js, Express, MongoDB | [`exp-5/`](./exp-5) |
| **EXP-7** | Student Registration Form with Two-Way Binding & Directives | Angular (CLI v16), TypeScript | [**EXP-7 Study Guide**](./exp-7/student-registration/README.md) |
| **EXP-8** | Movie Review System (Routing, Services, `@Input()` Communication) | Angular (CLI v16), TypeScript | [**EXP-8 Study Guide**](./exp-8/movie-app/README.md) |
| **EXP-9** | Dynamic To-Do List Application (`useState`, Immutability) | React 19, Vite, JavaScript | [**EXP-9 Study Guide**](./exp-9/todo-app/README.md) |
| **EXP-10** | Login & Signup Component Interface (Props Callbacks & Switching) | React 19, Vite, JavaScript | [**EXP-10 Study Guide**](./exp-10/login-form/README.md) |
| **EXP-12** | Full Stack Book Store MERN CRUD Application | MongoDB, Express.js, React, Node.js | [**EXP-12 Study Guide**](./exp-12/README.md) |

---

## 🛠️ Quick Setup & Command Cheat-Sheet

### 🅰️ Angular Projects (`exp-7`, `exp-8`)
```bash
# 1. Create a new Angular project
ng new project-name --routing=true --style=css

# 2. Generate components and services
ng generate component component-name    # Shorthand: ng g c component-name
ng generate service service-name        # Shorthand: ng g s service-name

# 3. Run the development server
ng serve
# Default port: http://localhost:4200/
```

### ⚛️ React (Vite) Projects (`exp-9`, `exp-10`, `exp-12/client`)
```bash
# 1. Create a new React project with Vite
npm create vite@latest project-name -- --template react

# 2. Navigate and install dependencies
cd project-name
npm install

# 3. Run the development server
npm run dev
# Default port: http://localhost:5173/
```

### 🟢 Node.js / Express Backend (`exp-5`, `exp-12/server`)
```bash
# 1. Navigate to server folder and initialize
cd server
npm init -y

# 2. Install backend packages
npm install express mongoose dotenv cors

# 3. Run backend server
node app.js
```
