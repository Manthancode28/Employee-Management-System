import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [type, setType] = useState("org");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url =
        type === "org"
          ? "/api/org/login"
          : "/api/auth/employee/login";

      const res = await api.post(url, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "role",
        type === "org" ? "ORG_ADMIN" : "EMPLOYEE"
      );

        navigate(type === "org" ? "/org/employees" : "/employee/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="org">Organization</option>
          <option value="employee">Employee</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-red-500 text-white py-2 rounded">
          Login
        </button>

        <p className="text-center text-sm mt-3">
            New organization?{" "}
            <span
                className="text-red-500 cursor-pointer"
                onClick={() => navigate("/register")}
            >
                Register here
            </span>
        </p>

      </form>
    </div>
  );
};

export default Login;
