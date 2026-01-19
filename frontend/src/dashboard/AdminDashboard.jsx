import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";
import EventsWidget from "../components/events/EventsWidget";

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
          Organization Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Quick snapshot of your organization
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Employees" value={total} />
        <StatCard title="Managers" value={managers} />
        <StatCard title="Staff Members" value={staff} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Link
          to="/admin/employees"
          className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">👥 Manage Employees</h3>
          <p className="text-gray-500 text-sm">
            Add, update and manage employees
          </p>
        </Link>

        <Link
          to="/events"
          className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">🎉 Events</h3>
          <p className="text-gray-500 text-sm">
            Create and manage organization events
          </p>
        </Link>

        <Link
          to="/admin/leave-policy"
          className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">📝 Leave Policy</h3>
          <p className="text-gray-500 text-sm">
            Configure organization leave rules
          </p>
        </Link>
      </div>

      {/* EVENTS PREVIEW */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            🎉 Upcoming Events
          </h2>

          <Link
            to="/admin/events"
            className="text-red-500 hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        <EventsWidget />
      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;
