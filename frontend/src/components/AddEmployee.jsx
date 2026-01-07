import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];
  const roles = ["Developer", "Tester", "Manager", "HR Executive", "Intern"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/employees/add", formData);

     
      navigate("/org/employees");

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

        <h2 className="text-3xl font-extrabold text-center text-red-500">
          Add Employee
        </h2>

        {error && (
          <div className="mb-4 rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />

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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none bg-white"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

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
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
