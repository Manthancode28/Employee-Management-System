import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import AttendanceWidget from "../components/attendance/AttendanceWidget";
import StatCard from "../components/ui/StatCard";
import ManagerAttendanceTable from "../components/attendance/ManagerAttendanceTable";
import ManagerLeaveRequests from "../components/Leave/ManagerLeaveRequests";
import ManagerRegularisationRequests from "../components/regularisation/ManagerRegularisationRequests";
import EventsWidget from "../components/events/EventsWidget";

const ManagerDashboard = () => {
  const [summary, setSummary] = useState([]);

  const present = summary.filter(r => r.status === "Present").length;
  const late = summary.filter(r => r.status === "Late").length;
  const leave = summary.filter(r => r.status === "Leave").length;

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Manager Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor attendance and manage leave requests
        </p>
      </div>

      {/* EVENTS */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Office Events</h2>

          <div className="flex gap-3">
            {/* View Events */}
            <Link
              to="/events"
              className="text-blue-600 hover:underline font-medium"
            >
              View Events
            </Link>

            {/* Add Event */}
            <Link
              to="/events"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-sm font-medium"
            >
              Add Event
            </Link>
          </div>
        </div>

        <EventsWidget />
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <AttendanceWidget />

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Present Today" value={present} />
          <StatCard title="Late Employees" value={late} />
          <StatCard title="On Leave" value={leave} />
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <section className="mb-14">
        <ManagerAttendanceTable onSummaryChange={setSummary} />
      </section>

      {/* LEAVE REQUESTS */}
      <section className="mb-10">
        <ManagerLeaveRequests />
      </section>

      {/* REGULARISATION REQUESTS */}
      <section className="mb-10">
        <ManagerRegularisationRequests />
      </section>

    </DashboardLayout>
  );
};

export default ManagerDashboard;
