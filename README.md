
````markdown
🌐 **Live Preview:**  
👉 <https://todo-list-fullstack-1-2yoi.onrender.com/>



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
- Both frontend and backend are deployed using **Render Web Service**

---

## 🔗 Frontend–Backend Connection

### Example backend setup (`index.js`)
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
    express.static(path.join(__dirname, "../frontend/vite-project/dist"))
  );

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/vite-project/dist/index.html")
    );
  });
}
````

---

## 🚀 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. **Start the backend**

   ```bash
   cd backend
   npm start
   ```

4. **Start the frontend**

   ```bash
   cd frontend
   npm run dev
   ```

---

## 🧠 Key Takeaways

* Learned how to **connect frontend and backend** in a single project.
* Gained experience deploying a **FullStack app** on **Render**.
* Understood how to manage **CORS**, **environment variables**, and **API routes**.

---

