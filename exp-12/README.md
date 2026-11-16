# Experiment 12: Full Stack Book Store MERN CRUD Application

> **Objective:** Build a complete full-stack web application with a **Node.js/Express & MongoDB** backend and a **React (Vite)** frontend to perform full CRUD (Create, Read, Update, Delete) operations on a Book Store catalog.

---

## 🚀 Setup & Execution Commands

### 1. Backend Server Setup (`exp-12/server`)
1. Open terminal and navigate to server directory:
   ```bash
   cd exp-12/server
   ```
2. Initialize and install dependencies:
   ```bash
   npm install express mongoose dotenv cors
   ```
3. Configure `.env` file (create if missing):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/BOOKSTORE-2026-27
   ```
4. Start MongoDB service locally (via MongoDB Compass or Windows Services).
5. Start the backend server:
   ```bash
   node app.js
   ```
   *Server will run at: `http://localhost:5000`*

---

### 2. Frontend Client Setup (`exp-12/client`)
1. Open a second terminal and navigate to client directory:
   ```bash
   cd exp-12/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React client:
   ```bash
   npm run dev
   ```
   *Frontend will run at: `http://localhost:5173`*

---

## 📝 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Fetch all books sorted alphabetically |
| `GET` | `/api/books/:id` | Fetch a single book by ID |
| `POST` | `/api/books` | Create a new book record |
| `PUT` | `/api/books/:id` | Update an existing book by ID |
| `DELETE` | `/api/books/:id` | Delete a book by ID |
