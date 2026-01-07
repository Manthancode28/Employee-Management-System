# Employee Management System (EMS)

A simple Employee Management System built using the MERN stack to register employee details and store them securely in a database.

---

## 📌 Project Overview

The Employee Management System allows organization administrators to:

- Register their organization
- Login securely using JWT authentication
- Add and manage employees
- View employee details in a structured manner

Employees can:

- Login using provided credentials
- Access their personalized dashboard

The application follows real-world enterprise standards such as role-based access control and protected routing.

---

## 🛠 Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **API Communication:** Axios

---

## ✨ Key Features

- Role-based authentication and authorization
- Protected routes for secure access
- Landing page for role selection (Organization / Employee)
- Interactive and clean UI
- Organization registration module
- Add Employee functionality
- Employees list view for organization admins
- Secure session handling using JWT

---

## 📂 Project Structure

```text
Employee-Management-System
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js
│
├── frontend
│ ├── src
│ │ ├── pages
│ │ ├── components
│ │ ├── api
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User selects role from the landing page
2. User logs in with valid credentials
3. JWT token and role are stored securely
4. Protected routes verify authentication and authorization
5. User is redirected to the appropriate dashboard

---


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
