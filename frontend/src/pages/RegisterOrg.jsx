import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterOrg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await api.post("/api/org/register", formData);

      setSuccess("Organization registered successfully");

      // Optional: auto-login OR redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center text-red-500">
          Register Organization
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create a new organization account
        </p>

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 px-3 py-2 rounded text-sm">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-3 py-2 rounded text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Organization Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold
              ${loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
};

export default RegisterOrg;
