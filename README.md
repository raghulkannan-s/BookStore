# 📚 Bookstore Management Dashboard

A **modern full-stack bookstore management system** built using  
💻 **React (Vite)** for the frontend and ☕ **Java + MySQL** for the backend.  
It features a **glassmorphic interface**, **animated modals**, and a clean API architecture for managing books and customers efficiently.

---

## 🌟 Features

- ⚙️ **Pure Java Backend (No Frameworks)**  
- 🗄️ **MySQL Integration via JDBC**  
- ⚛️ **React Frontend (Vite + Tailwind + Framer Motion)**  
- 🧾 **Full CRUD for Books & Customers**  
- 🔍 **Live Search + Sorting Filters**  
- 💫 **Glassmorphism UI + Animated Modals**  
- 🔔 **react-hot-toast Notifications**  
- 🌐 **Environment-based API Config (`VITE_API_URL`)**  
- 📱 **Fully Responsive on All Devices**

---

## 🖼️ Screenshots

| Dashboard | Books | Customers |
|------------|--------|-----------|
| ![Dashboard](https://via.placeholder.com/400x250?text=Dashboard) | ![Books](https://via.placeholder.com/400x250?text=Books+Section) | ![Customers](https://via.placeholder.com/400x250?text=Customers+Section) |

---

## 🧩 Tech Stack

**Frontend**
- React 18 + Vite  
- TailwindCSS  
- Framer Motion  
- Lucide Icons  
- react-hot-toast  

**Backend**
- Java (HTTPServer)  
- MySQL  
- Gson (JSON Parser)  
- JDBC  

---

## 🗂️ Folder Structure

```

bookstore-app/
│
├── backend/
│   ├── src/main/java/
│   │   ├── dao/
│   │   │   ├── BookDAO.java
│   │   │   └── CustomerDAO.java
│   │   ├── model/
│   │   │   ├── Book.java
│   │   │   └── Customer.java
│   │   ├── util/
│   │   │   └── DBConnection.java
│   │   └── AppServer.java
│   ├── lib/ (JARs: mysql-connector, gson)
│   └── out/ (compiled files)
│
└── frontend/
├── src/
│   ├── Components/
│   │   ├── BookSection.jsx
│   │   └── CustomerSection.jsx
│   ├── Pages/
│   │   └── Home.jsx
│   └── App.jsx
├── .env
├── package.json
└── tailwind.config.js

````

---

## ⚙️ Setup Instructions

### 🖥️ Backend Setup

1. **Install MySQL**
   ```bash
   sudo apt install mysql-server
````

*(Windows users: use the official MySQL Installer.)*

2. **Create Database**

   ```sql
   CREATE DATABASE bookstore_db;
   USE bookstore_db;

   CREATE TABLE books (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255),
     author VARCHAR(255),
     price DECIMAL(10,2),
     stock INT
   );

   CREATE TABLE customers (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255),
     phone VARCHAR(20)
   );
   ```

3. **Add Dependencies**
   Download and place inside `backend/lib`:

   * [mysql-connector-j.jar](https://dev.mysql.com/downloads/connector/j/)
   * [gson-2.10.1.jar](https://mvnrepository.com/artifact/com.google.code.gson/gson)

4. **Compile & Run**

   ```bash
   cd backend
   javac -cp "lib/*" -d out src/main/java/**/*.java
   java -cp "lib/*;out" AppServer
   ```

   ✅ Server runs at → **[http://localhost:9090](http://localhost:9090)**

---

### 💻 Frontend Setup

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:

   ```bash
   VITE_API_URL=http://localhost:9090
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open → **[http://localhost:5173](http://localhost:5173)**

---

## 🪄 Usage

* ➕ **Add Book/Customer** → “+ Add” → fill form → submit.
* ✏️ **Edit** → Click the edit icon → update → save.
* 🗑️ **Delete** → Click delete → confirm.
* 🔎 **Search/Sort** → Filters apply instantly (client-side).

---

## 🧠 Environment Variables

| Variable       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `VITE_API_URL` | Backend API endpoint (e.g., `http://localhost:9090`) |

---

## 🚀 Deployment

### Frontend

Build for production:

```bash
npm run build
```

Deploy the `/dist` folder on:

* Vercel
* Netlify
* GitHub Pages

### Backend

Deploy on any Java-supported host (VPS, Render, Railway, etc.):

```bash
java -cp "lib/*;out" AppServer
```

Then update `VITE_API_URL` in `.env.production` to point to your backend URL.

---

## 💡 API Routes

| Method   | Endpoint              | Description       |
| -------- | --------------------- | ----------------- |
| `GET`    | `/api/books`          | Get all books     |
| `POST`   | `/api/books`          | Add book          |
| `PUT`    | `/api/books/{id}`     | Update book       |
| `DELETE` | `/api/books/{id}`     | Delete book       |
| `GET`    | `/api/customers`      | Get all customers |
| `POST`   | `/api/customers`      | Add customer      |
| `PUT`    | `/api/customers/{id}` | Update customer   |
| `DELETE` | `/api/customers/{id}` | Delete customer   |

---

## 💎 Design Highlights

* 🎨 **UI Framework**: TailwindCSS + Framer Motion
* 💠 **Theme**: Neon Glass (Dark)
* ⚡ **Animations**: Smooth fade, scale & spring transitions
* 🧭 **Icons**: Lucide for lightweight vector visuals
* 🔔 **Feedback System**: Toast notifications for all actions

---

> Built for precision, speed, and aesthetics — a minimalist full-stack CRUD system that feels like a premium SaaS dashboard.

```

