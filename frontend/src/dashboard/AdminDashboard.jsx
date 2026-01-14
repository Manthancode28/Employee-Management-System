import { useEffect, useState } from "react";
import api from "../api/axios";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import OrgEmployees from "../pages/OrgEmployees";
import AdminAttendanceTable from "../components/AdminAttendanceTable";
import { setLeavePolicy, applyLeavePolicy } from "../api/org";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [casual, setCasual] = useState("");
  const [sick, setSick] = useState("");
  const [period, setPeriod] = useState("monthly");

  useEffect(() => {
    api.get("/api/employees").then(res => setEmployees(res.data));
  }, []);

  const total = employees.length;
  const managers = employees.filter(e => e.role === "manager").length;
  const staff = employees.filter(e => e.role === "employee").length;

  /* 🔥 SET LEAVE POLICY */
  const handleApplyLeavePolicy = async () => {
    await setLeavePolicy({
      period,
      casual: Number(casual),
      sick: Number(sick)
    });

    await applyLeavePolicy();

    alert("Leave policy applied to all employees");
    setCasual("");
    setSick("");
  };

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
        <StatCard title="Total Employees" value={total} />
        <StatCard title="Managers" value={managers} />
        <StatCard title="Employees" value={staff} />
      </div>

      {/* 🔥 LEAVE POLICY */}
      <div className="bg-white rounded-2xl shadow p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4">
          Leave Policy (Organization Level)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded-xl px-4 py-2"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>

          <input
            type="number"
            placeholder="Casual Leave"
            value={casual}
            onChange={(e) => setCasual(e.target.value)}
            className="border rounded-xl px-4 py-2"
          />

          <input
            type="number"
            placeholder="Sick Leave"
            value={sick}
            onChange={(e) => setSick(e.target.value)}
            className="border rounded-xl px-4 py-2"
          />

          <button
            onClick={handleApplyLeavePolicy}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
          >
            Apply Policy
          </button>
        </div>
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
