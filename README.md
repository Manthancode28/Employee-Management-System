# Employee Management System (EMS)

A simple Employee Management System built using the MERN stack to register employee details and store them securely in a database.

---

## 🚀 Tech Stack

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas (Cloud)
- API Testing: Postman

---

## ✨ Features

- Add new employee details
- Fields included:
  - Name
  - Email
  - Department (dynamic selection)
  - Role (dynamic selection)
- Backend validation and error handling
- Success and error messages on UI
- Data securely stored in MongoDB Atlas
- Responsive and clean user interface

---

## 🔄 Application Flow

1. User fills the employee registration form.
2. Frontend sends data to backend using REST API.
3. Backend validates input and checks for duplicates.
4. Valid data is stored in MongoDB Atlas.
5. Success or error response is sent back to the frontend.
6. User receives feedback on the UI.

---

## 🧪 Testing

- Backend APIs tested using Postman
- Verified scenarios:
  - Successful employee addition
  - Missing required fields
  - Duplicate email entries

---

## 📂 Project Structure

```text
Employee-Management-System/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── main.jsx
│
├── .gitignore
└── README.md
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
