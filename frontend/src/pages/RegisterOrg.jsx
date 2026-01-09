import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const RegisterOrg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/api/org/register", formData);

      setSuccess("Organization registered successfully 🎉");

      setTimeout(() => {
        navigate("/login?role=admin");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-red-200 to-red-300 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Register Organization
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create your organization account
          </p>
        </div>

        {/* ALERTS */}
        {success && (
          <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm animate-pulse">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm animate-shake">
            ❌ {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* ORG NAME */}
          <div>
            <label className="text-sm text-gray-600">Organization Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter organization name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Admin Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
              <span
                className="absolute right-3 top-4 text-sm cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition
              ${loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:scale-[1.02]"}
            `}
          >
            {loading ? "Registering..." : "Register Organization"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already registered?{" "}
          <span
            className="text-red-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login?role=admin")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterOrg;
