import { useEffect, useState } from "react";
import api from "../api/axios";

// layout
import DashboardLayout from "../components/layout/DashboardLayout";

// attendance
import AttendanceWidget from "../components/AttendanceWidget";

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

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

      {/* ✅ Manager self attendance */}
      <AttendanceWidget />


      {/* ✅ TEAM LIST */}
      <div className="bg-white mt-6 rounded shadow">
        <h2 className="text-lg font-semibold p-4 border-b">
          My Team
        </h2>

        {loading ? (
          <p className="p-4">Loading team...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
