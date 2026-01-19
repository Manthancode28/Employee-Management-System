import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

/* ================= BADGES ================= */
const roleBadge = (role) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  if (role === "admin") return `${base} bg-red-100 text-red-600`;
  if (role === "manager") return `${base} bg-blue-100 text-blue-600`;
  return `${base} bg-gray-100 text-gray-700`;
};

const probationBadge = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  if (status === "ON_PROBATION")
    return `${base} bg-yellow-100 text-yellow-700`;
  if (status === "CONFIRMED")
    return `${base} bg-green-100 text-green-700`;
  if (status === "EXTENDED")
    return `${base} bg-orange-100 text-orange-700`;
  return `${base} bg-gray-100 text-gray-600`;
};

/* ================= COMPONENT ================= */
const OrgEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

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

  const confirmProbation = async (id) => {
    if (!window.confirm("Confirm probation for this employee?")) return;
    await api.put(`/api/employees/${id}/confirm-probation`);
    fetchEmployees();
  };

  const extendProbation = async (id) => {
    const months = prompt("Extend probation by how many months?");
    if (!months) return;

    await api.put(`/api/employees/${id}/extend-probation`, {
      extraMonths: Number(months)
    });
    fetchEmployees();
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      filterRole === "all" || emp.role === filterRole;

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow">

      {/* HEADER */}
      <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-red-50 rounded-t-2xl">
        <div>
          <h2 className="text-xl font-semibold text-red-600">
            Employees
          </h2>
          <p className="text-sm text-gray-500">
            Manage organization workforce
          </p>
        </div>

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin/add-employee")}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium"
          >
            + Add Employee
          </button>
        )}
      </div>

      {/* CONTROLS */}
      <div className="p-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded-xl px-4 py-2 w-full md:w-48"
        >
          <option value="all">All Roles</option>
          <option value="manager">Managers</option>
          <option value="employee">Employees</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Probation</th>
              {(role === "admin" || role === "manager") && (
                <th className="px-6 py-3">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No employees found
                </td>
              </tr>
            )}

            {filteredEmployees.map((emp) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{emp.name}</td>
                <td className="px-6 py-4 text-center">{emp.email}</td>
                <td className="px-6 py-4 text-center">{emp.department}</td>

                <td className="px-6 py-4 text-center">
                  <span className={roleBadge(emp.role)}>
                    {emp.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {emp.probation ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className={probationBadge(emp.probation.status)}>
                        {emp.probation.status.replace("_", " ")}
                      </span>
                      {emp.probation.endDate && (
                        <span className="text-xs text-gray-500">
                          Ends:{" "}
                          {new Date(emp.probation.endDate)
                            .toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {(role === "admin" || role === "manager") && (
                  <td className="px-6 py-4 text-center space-x-2">
                    {emp.probation?.isOnProbation && (
                      <>
                        <button
                          onClick={() => confirmProbation(emp._id)}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() => extendProbation(emp._id)}
                          className="text-orange-600 hover:underline text-sm"
                        >
                          Extend
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 text-sm text-gray-500">
        Total Employees:{" "}
        <span className="font-semibold">
          {filteredEmployees.length}
        </span>
      </div>
    </div>
  );
};

export default OrgEmployees;
