import { useEffect, useState } from "react";
import api from "../api/axios";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import OrgEmployees from "../pages/OrgEmployees";
import AdminAttendanceTable from "../components/AdminAttendanceTable";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/api/employees").then(res => setEmployees(res.data));
  }, []);

  const total = employees.length;
  const managers = employees.filter(e => e.role === "manager").length;
  const staff = employees.filter(e => e.role === "employee").length;

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Organization overview and controls
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Employees" value={total} icon="👥" />
        <StatCard title="Managers" value={managers} icon="👨‍💼" />
        <StatCard title="Employees" value={staff} icon="👨‍💻" />
      </div>

      {/* ATTENDANCE */}
      <section className="mb-14">
        <AdminAttendanceTable />
      </section>

      {/* EMPLOYEES */}
      <section>
        <OrgEmployees />
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
