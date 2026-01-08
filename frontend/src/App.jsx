import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import OrgEmployees from "./pages/OrgEmployees";
import AddEmployee from "./components/AddEmployee";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectRole from "./pages/SelectRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<SelectRole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />

        <Route
          path="/org/employees"
          element={
            <ProtectedRoute role="admin">
              <OrgEmployees />
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

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
