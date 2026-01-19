import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    dateOfJoining: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];
  const roles = [
    { label: "Manager", value: "manager" },
    { label: "Employee", value: "employee" }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/employees/add", formData);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !formData.name ||
    !formData.email ||
    !formData.department ||
    !formData.role ||
    !formData.dateOfJoining;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-white to-gray-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl p-8">

        <h2 className="text-3xl font-extrabold text-center text-red-500 mb-4">
          Add Employee
        </h2>

        {error && (
          <div className="mb-4 rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />

          {/* DATE OF JOINING */}
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />

          {/* DEPARTMENT */}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none bg-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* ROLE */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none bg-white"
          >
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          {/* INFO */}
          <p className="text-xs text-gray-500 text-center">
            ℹ️ Probation period will start automatically from Date of Joining
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || isDisabled}
            className={`w-full rounded-xl py-3 font-semibold text-white
              ${
                loading || isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 hover:shadow-lg"
              }
              transition-all duration-300`}
          >
            {loading ? "Adding Employee..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
