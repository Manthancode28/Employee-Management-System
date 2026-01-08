import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import SelectRole from "./pages/SelectRole";
import OrgEmployees from "./pages/OrgEmployees";

// Components
import AddEmployee from "./components/AddEmployee";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboards 
import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<SelectRole />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/org/employees"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/org/add-employee"
          element={
            <ProtectedRoute role="admin">
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        {/* MANAGER DASHBOARD */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE DASHBOARD */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
