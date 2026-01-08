# 🚀 Employee Management System (EMS)

A full-stack **Employee Management System** built using the **MERN stack**, designed to manage organizations, employees, and managers with **secure role-based access control** and **JWT authentication**.

---

## 📌 Project Overview

The **Employee Management System (EMS)** is a role-based web application that allows organizations to manage their workforce efficiently.

The system supports **three user roles**:
- **Admin (Organization)**
- **Manager**
- **Employee**

Each role has a dedicated dashboard and controlled access to features, following **real-world enterprise application standards**.

---

## 🎯 Key Objectives

- Implement secure **role-based authentication and authorization**
- Allow organizations to manage employees and managers
- Provide separate dashboards based on user roles
- Maintain clean and scalable frontend architecture
- Follow industry-level backend security practices

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Protected routes on frontend and backend

### 🏢 Organization (Admin)
- Register and login organization
- Add employees and managers
- View all employees in the organization
- Change user roles between **Manager** and **Employee**
- Access admin dashboard

### 👨‍💼 Manager
- Login using employee credentials
- Access manager dashboard
- View employee details under the organization

### 👨‍💻 Employee
- Login using assigned credentials
- Access personal dashboard

### 🧩 General
- Centralized login system
- Secure session handling using JWT
- Clean and responsive UI
- Proper frontend folder structuring

---

## 🛠 Technology Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)

---

## 📂 Project Structure

```text
Employee-Management-System
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── dashboard
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
└── README.md

---

## 🔐 Authentication Flow

1. User selects role from the landing page
2. User logs in with valid credentials
3. JWT token and role are stored securely
4. Protected routes verify authentication and authorization
5. User is redirected to the appropriate dashboard

---
```


## ▶️ How to Run the Project
```
cd backend
npm install
npm start

cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

```
MONGO_URI=your_mongodb_atlas_connection_string
VITE_API_URL=BACKEND_URI
```

## 👤 Author

```
Manthan Nimonkar
Software Developer (MERN Stack)

```
