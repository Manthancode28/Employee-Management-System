import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import SelectRole from "./pages/SelectRole";

// Dashboards
import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

// Components
import AddEmployee from "./components/AddEmployee";
import ProtectedRoute from "./components/ProtectedRoute";

import ApplyRegularisation from "./components/ApplyRegularisation";
import ManagerRegularisationRequests from "./components/ManagerRegularisationRequests";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<SelectRole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-employee"
          element={
            <ProtectedRoute role="admin">
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />



        {/* EMPLOYEE */}
        <Route
          path="/employee/regularisation"
          element={
            <ProtectedRoute role="employee">
              <ApplyRegularisation />
            </ProtectedRoute>
          }
        />

        {/* MANAGER */}
        <Route
          path="/manager/regularisation"
          element={
            <ProtectedRoute role="manager">
              <ManagerRegularisationRequests />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
