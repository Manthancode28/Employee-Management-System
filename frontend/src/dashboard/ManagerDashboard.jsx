import { useEffect, useState } from "react";
import api from "../api/axios";

import DashboardLayout from "../components/layout/DashboardLayout";
import AttendanceWidget from "../components/AttendanceWidget";
import StatCard from "../components/ui/StatCard";
import ManagerAttendanceTable from "../components/ManagerAttendanceTable";



const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalDepartments = new Set(
    employees.map((e) => e.department)
  ).size;

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Manager Dashboard
        </h1>
        <p className="text-gray-500">
          Track attendance and manage your team
        </p>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AttendanceWidget />

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Team Members" value={employees.length} />
          <StatCard title="Departments" value={totalDepartments} />
        </div>
      </div>

      {/* TEAM TABLE */}
      <div className="bg-white mt-8 rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            My Team
          </h2>
          <span className="text-sm text-gray-500">
            {employees.length} Employees
          </span>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading team...</p>
        ) : employees.length === 0 ? (
          <p className="p-6 text-gray-500">
            No employees found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {emp.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ManagerAttendanceTable />

    </DashboardLayout>
  );
};

export default ManagerDashboard;
