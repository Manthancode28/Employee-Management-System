import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/ui/StatCard";

const ManagerDashboard = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api.get("/api/employees").then(res => setTeam(res.data));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard title="Team Members" value={team.length} />
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {team.map(emp => (
            <tr key={emp._id} className="hover:bg-gray-50">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
