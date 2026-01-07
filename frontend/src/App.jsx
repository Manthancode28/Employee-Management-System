import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import OrgEmployees from "./pages/OrgEmployees";
import AddEmployee from "./components/AddEmployee";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectRole from "./pages/SelectRole"; // 👈 NEW LANDING PAGE

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING PAGE */}
        <Route path="/" element={<SelectRole />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />

        {/* ORGANIZATION ROUTES */}
        <Route
          path="/org/employees"
          element={
            <ProtectedRoute role="ORG_ADMIN">
              <OrgEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/org/add-employee"
          element={
            <ProtectedRoute role="ORG_ADMIN">
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE ROUTES */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="EMPLOYEE">
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
