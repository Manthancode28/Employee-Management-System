import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AttendanceWidget from "../components/AttendanceWidget";
import EmployeeAttendanceTable from "../components/EmployeeAttendanceTable";
import ApplyLeave from "../components/ApplyLeave";
import StatCard from "../components/ui/StatCard";

const EmployeeDashboard = () => {
  const [summary, setSummary] = useState([]);

  const present = summary.filter(r => r.status === "Present").length;
  const late = summary.filter(r => r.status === "Late").length;
  const leave = summary.filter(r => r.status === "Leave").length;

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Track your attendance and manage your leaves
        </p>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <AttendanceWidget />

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Present Days" value={present} />
          <StatCard title="Late Days" value={late} />
          <StatCard title="Leaves Taken" value={leave} />
        </div>
      </div>

      {/* APPLY LEAVE */}
      <section className="mb-14">
        <ApplyLeave />
      </section>

      {/* ATTENDANCE TABLE */}
      <section>
        <EmployeeAttendanceTable onSummaryChange={setSummary} />
      </section>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
