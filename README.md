```markdown
# 📚 Bookstore Management Dashboard

A **modern full-stack bookstore system** built using  
💻 **React (Vite)** for the frontend and ☕ **Java + MySQL** for the backend.  
Includes **login/register**, **CRUD for books/customers**, **glass UI**, and **animated modals**.

---

## 🌟 Features

- ⚙️ Pure Java Backend (No Spring)
- 🗄️ MySQL + JDBC
- ⚛️ React (Vite) + TailwindCSS
- 🎬 Framer Motion animations
- 🔐 Login & Register (SHA-256 hashed passwords)
- 🔔 react-hot-toast notifications
- 🔍 Searchable & sortable tables
- 🌐 Environment-based API (`VITE_API_URL`)
- 📱 Fully responsive glass dashboard

---

## 🧩 Tech Stack

### Frontend
- React 18 + Vite  
- TailwindCSS  
- Framer Motion  
- react-hot-toast  
- Lucide Icons  

### Backend
- Java (HTTPServer)  
- MySQL  
- JDBC  
- Gson  

---

## 🗂️ Folder Structure

```

bookstore-app/
│
├── backend/
│   ├── src/main/java/
│   │   ├── dao/
│   │   ├── model/
│   │   ├── util/
│   │   └── AppServer.java
│   ├── lib/           # mysql-connector + gson jars
│   └── out/           # compiled classes
│
└── frontend/
├── src/
│   ├── Components/
│   ├── Pages/
│   └── App.jsx
├── .env
├── package.json
└── tailwind.config.js

```

---

# ⚙️ Backend Setup (Windows)

## 1️⃣ Install MySQL
Download & install:  
https://dev.mysql.com/downloads/installer/

Ensure service is running:
```

services.msc → MySQL80 → Running

````

---

## 2️⃣ Create Database & Tables

Open CMD or PowerShell:
```bash
mysql -u root -p
````

Run:

```sql
CREATE DATABASE bookstore_db;
USE bookstore_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255)
);

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

---

## 3️⃣ Add Dependencies

Place inside `backend/lib/`:

* `mysql-connector-j.jar`
* `gson-2.10.1.jar`

---

## 4️⃣ Compile & Run Backend

```bash
cd backend
javac -cp "lib/*" -d out src/main/java/**/*.java
java -cp "lib/*;out" AppServer
```

Backend runs at:

```
http://localhost:9090
```

---

# 💻 Frontend Setup

## 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

---

## 2️⃣ Create `.env`

Inside `frontend/.env`:

```
VITE_API_URL=http://localhost:9090
```

---

## 3️⃣ Run Dev Server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🪄 Usage

* ➕ Add Books/Customers
* ✏️ Edit entries
* 🗑️ Delete entries
* 🔍 Search & sort
* 🔐 Login/Register with hashed passwords
* 🚪 Logout clears session

---

# 🧠 Environment Variables

| Variable       | Description          |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

---

# 🚀 Deployment

## Frontend

```bash
npm run build
```

Deploy `/dist` to Vercel / Netlify.

## Backend

Run on any Java host:

```bash
java -cp "lib/*;out" AppServer
```

Update `.env.production` with production API URL.

---

# 💡 API Routes

## Auth

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | `/api/register` | Register user |
| POST   | `/api/login`    | Login user    |

## Books

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| GET    | `/api/books`      | Get all books |
| POST   | `/api/books`      | Add book      |
| PUT    | `/api/books/{id}` | Update book   |
| DELETE | `/api/books/{id}` | Delete book   |

## Customers

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/api/customers`      | Get all customers |
| POST   | `/api/customers`      | Add customer      |
| PUT    | `/api/customers/{id}` | Update customer   |
| DELETE | `/api/customers/{id}` | Delete customer   |

---

# 💎 Design Highlights

* Neon glass dark UI
* Smooth motion transitions
* Toast feedback on all actions
* Clean modular structure
* Simple Java-powered backend
