import { useEffect, useState } from "react";
import api from "../api/axios";

import DashboardLayout from "../components/layout/DashboardLayout";
import AttendanceWidget from "../components/attendance/AttendanceWidget";
import StatCard from "../components/ui/StatCard";
import ManagerAttendanceTable from "../components/ManagerAttendanceTable";
import ManagerLeaveRequests from "../components/ManagerLeaveRequests";
import ManagerRegularisationRequests from "../components/ManagerRegularisationRequests";


const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    api.get("/api/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

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

      {/* TOP SECTION */}
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
