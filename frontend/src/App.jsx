import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import OrgEmployees from "./pages/OrgEmployees";
import AddEmployee from "./components/AddEmployee";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />

        {/* ORGANIZATION */}
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

        {/* EMPLOYEE */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="EMPLOYEE">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
