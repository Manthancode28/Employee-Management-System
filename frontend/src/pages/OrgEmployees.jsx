import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const OrgEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const res = await api.get("/api/employees");
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await api.put("/api/employees/change-role", {
      employeeId: id,
      newRole
    });
    fetchEmployees();
  };

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="bg-white mt-12 rounded-2xl shadow">
      <div className="p-5 border-b bg-red-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-red-600">
          Employees
        </h2>

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin/add-employee")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium"
          >
            + Add Employee
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              {role === "admin" && (
                <th className="px-6 py-3">Change Role</th>
              )}
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr
                key={emp._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {emp.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {emp.email}
                </td>
                <td className="px-6 py-4 text-center">
                  {emp.department}
                </td>
                <td className="px-6 py-4 text-center capitalize">
                  {emp.role}
                </td>

                {role === "admin" && (
                  <td className="px-6 py-4 text-center">
                    <select
                      value={emp.role}
                      onChange={(e) =>
                        handleRoleChange(emp._id, e.target.value)
                      }
                      className="border rounded-xl px-3 py-1 focus:ring-2 focus:ring-red-300"
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
    </div>
  );
};

export default OrgEmployees;
