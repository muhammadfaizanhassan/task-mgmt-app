# 📝 Task Management App

A simple and efficient Task Management App built with **Node.js**, **Express**, and **MongoDB**. It allows users to create, read, update, and delete tasks with support for deadlines and status tracking.

### 🌐 Live Demo

👉 [View Deployed App on Render](https://task-manage-app-qm93.onrender.com/)

---

## 🚀 Features

- Create tasks with title, description, deadline, and status
- View all tasks
- Update a task's details and status
- Delete tasks
- Status options: `To Do`, `In Progress`, `Done`
- Timestamps for task creation and updates

---

## 📦 Tech Stack
- React (Functional Components + Hooks)
- Axios for API calls
- React Router (optional, if you have multiple pages)
- Tailwind CSS-CLI
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Hosting**: Render

---

## 📂 API Endpoints

Base URL: `https://task-manage-app-qm93.onrender.com/api/tasks`

| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| GET    | `/`               | Get all tasks           |
| POST   | `/`               | Create a new task       |
| PUT    | `/:id`            | Update a task by ID     |
| DELETE | `/:id`            | Delete a task by ID     |

---

## 📬 Sample POST Body (JSON)

```json
{
  "title": "Finish AI project",
  "description": "Complete the GPT integration and deploy",
  "deadline": "2025-06-15T00:00:00.000Z",
  "status": "In Progress"
}
