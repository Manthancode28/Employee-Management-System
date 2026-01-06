import { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];
  const roles = ["Developer", "Tester", "Manager", "HR Executive", "Intern"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/employees/add`,
        formData
      );

      setSuccess(res.data.message);
      setFormData({
        name: "",
        email: "",
        department: "",
        role: ""
      });

      setTimeout(() => setSuccess(""), 3000);
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
    !formData.role;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-white to-gray-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl p-8 transition-all hover:scale-[1.01]">

        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-red-500">
          Add Employee
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Register a new employee into the system
        </p>

        {/* Alerts */}
        {success && (
          <div className="mb-4 rounded-xl bg-green-100 text-green-700 px-4 py-3 text-sm">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2
                       focus:ring-2 focus:ring-red-300 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2
                       focus:ring-2 focus:ring-red-300 outline-none"
          />

          {/* Department (Dynamic) */}
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2
                       focus:ring-2 focus:ring-red-300 outline-none bg-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Role (Dynamic) */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2
                       focus:ring-2 focus:ring-red-300 outline-none bg-white"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isDisabled}
            className={`w-full rounded-xl py-3 font-semibold text-white
              ${loading || isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:shadow-lg"}
              transition-all duration-300`}
          >
            {loading ? "Adding Employee..." : "Add Employee"}
          </button>

          <p className="text-center text-xs text-gray-400">
            Employee data is securely stored.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
