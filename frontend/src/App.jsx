import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import SelectRole from "./pages/SelectRole";

// Dashboards
import AdminDashboard from "./dashboard/AdminDashboard";
import ManagerDashboard from "./dashboard/ManagerDashboard";
import EmployeeDashboard from "./dashboard/EmployeeDashboard";

// Pages
import Events from "./pages/Events";
import OrgEmployees from "./pages/OrgEmployees";

// Components
import AddEmployee from "./components/AddEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerRegularisationRequests from "./components/regularisation/ManagerRegularisationRequests";

// Admin pages (NEW)
import AdminLeavePolicy from "./pages/AdminLeavePolicy"; // create this page

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
          path="/admin/employees"
          element={
            <ProtectedRoute role="admin">
              <OrgEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute role="admin">
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/events"
          element={
            <ProtectedRoute role="manager">
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leave-policy"
          element={
            <ProtectedRoute role="admin">
              <AdminLeavePolicy />
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

        <Route
          path="/manager/regularisation"
          element={
            <ProtectedRoute role="manager">
              <ManagerRegularisationRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/events"
          element={
            <ProtectedRoute role="manager">
              <Events />
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

        <Route
          path="/employee/events"
          element={
            <ProtectedRoute role="employee">
              <Events />
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
