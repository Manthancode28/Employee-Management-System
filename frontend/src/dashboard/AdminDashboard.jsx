import { useEffect, useState } from "react";
import api from "../api/axios";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import OrgEmployees from "../pages/OrgEmployees";
import AdminAttendanceTable from "../components/AdminAttendanceTable";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/api/employees").then((res) => setEmployees(res.data));
  }, []);

  const total = employees.length;
  const managers = employees.filter(e => e.role === "manager").length;
  const staff = employees.filter(e => e.role === "employee").length;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Employees" value={total} />
        <StatCard title="Managers" value={managers} />
        <StatCard title="Employees" value={staff} />
      </div>

      {/* ATTENDANCE TABLE */}
      <AdminAttendanceTable />

      {/* EMPLOYEE LIST */}
      <OrgEmployees />
    </DashboardLayout>
  );
};

export default AdminDashboard;
