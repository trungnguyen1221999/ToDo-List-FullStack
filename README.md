
````markdown
# 📝 ToDo List FullStack

**🌐 Live Preview:** [https://todo-list-fullstack-1-2yoi.onrender.com/](https://todo-list-fullstack-1-2yoi.onrender.com/)


---

## 💡 Introduction

I’ve built several ToDo List projects before — but they were all **frontend-only**, storing data in **localStorage**.  
This time, I decided to go **FullStack**, connecting a real backend and database.  

It’s not a complex project, but setting up the connection between **frontend and backend** took me quite some time.  
I’ve deployed many static websites before, but this was my **first time using a web server** for a fullstack app — and yes, I got stuck for a while 😅.

---

## ⚙️ Technologies Used

### 🖥️ Frontend
- **React**
- **Styled Components**
- **JavaScript**
- Build tool: **Vite**

### ⚙️ Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JavaScript**

### ☁️ Deployment
- Both frontend and backend deployed using **Render Web Service**

---

## 🔗 Frontend–Backend Connection

### Backend setup (`index.js`)
```js
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../frotnend/vite-project/dist"))
  );

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frotnend/vite-project/dist/index.html")
    );
  });
}
````

### Frontend API configuration

```js
const BASE_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000';

const http = axios.create({
  baseURL: `${BASE_URL}/task`,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

✅ This setup automatically connects frontend and backend depending on the environment:

* In **development** → uses `http://localhost:5000`
* In **production** → connects directly to the deployed backend

---

## 🧩 Project Structure

```
📦 ToDo-List-FullStack
├── backend
│   ├── DB/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── index.js
│   └── package.json
│
├── frotnend/
│   └── vite-project/
│       ├── src/
│       ├── dist/
│       └── package.json
│
├── package.json  ← (root)
└── README.md
```

---

## ⚙️ Root `package.json`

The root `package.json` allows you to install and run both the backend and frontend easily.

```json
{
  "name": "todo-list-fullstack",
  "version": "1.0.0",
  "scripts": {
    "build": "npm install --prefix backend && npm install --prefix frotnend/vite-project && npm --prefix frotnend/vite-project run build",
    "start": "npm --prefix backend run start"
  }
}
```

---

## 🧠 What I Learned

### 🧩 MVC Architecture

**Model - View - Controller** is a software pattern that separates concerns:

* **Model**: handles data and database logic (MongoDB + Mongoose)
* **View**: represents the user interface (React frontend)
* **Controller**: manages communication between Model and View (Express routes & controllers)

This structure makes code **cleaner, easier to maintain, and scalable**.

### CRUD Operations

I implemented all four — **Create, Read, Update, Delete** — in both backend and frontend, learning how APIs actually work under the hood.

### Filtering and State Management

Learned to handle task filtering (completed, active, all) and keep UI state synced with backend data.

### Fullstack Deployment

Finally understood how to:

* Serve the React build using Express
* Configure routes properly for SPA (Single Page Application)
* Use `process.env.NODE_ENV` to handle production vs. development behavior

---

## 🎯 Main Features

* ➕ Add new tasks
* 🗑️ Delete existing tasks
* ✏️ Edit tasks
* ✅ Mark tasks as completed
* 🔍 Filter tasks by status (All / Completed / Active)
* 🧭 Responsive UI built with styled-components

---

## 🧾 Conclusion

This project might look simple, but it taught me a lot:

* How frontend and backend actually connect
* How to store and retrieve real data with MongoDB
* How to deploy a complete fullstack app on Render

It’s mainly a **backend learning project**, so the frontend is intentionally minimal 😄

---

