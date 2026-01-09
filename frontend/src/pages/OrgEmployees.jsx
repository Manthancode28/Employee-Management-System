import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const OrgEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/api/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔁 Change role (ADMIN ONLY)
  const handleRoleChange = async (employeeId, newRole) => {
    try {
      await api.put("/api/employees/change-role", {
        employeeId,
        newRole
      });

      fetchEmployees();
    } catch (err) {
      alert("Failed to change role");
    }
  };

  if (loading) return <p className="p-6">Loading employees...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>

        {/* ADD EMPLOYEE (ADMIN ONLY) */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/admin/add-employee")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            + Add Employee
          </button>
        )}
      </div>

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Current Role</th>
            {role === "admin" && (
              <th className="p-2 border">Change Role</th>
            )}
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="text-center">
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.email}</td>
              <td className="p-2 border">{emp.department}</td>
              <td className="p-2 border capitalize">{emp.role}</td>

              {role === "admin" && (
                <td className="p-2 border">
                  <select
                    value={emp.role}
                    onChange={(e) =>
                      handleRoleChange(emp._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgEmployees;
