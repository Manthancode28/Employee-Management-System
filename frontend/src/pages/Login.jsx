import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /**
   * role from URL is ONLY for UI context
   * Actual authorization role always comes from backend
   */
  const selectedRole = searchParams.get("role"); // admin | manager | employee

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to landing page if role is missing
  useEffect(() => {
    if (!selectedRole) {
      navigate("/", { replace: true });
    }
  }, [selectedRole, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
    
      const url =
        selectedRole === "admin"
          ? "/api/org/login"
          : "/api/auth/login";

      const res = await api.post(url, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      switch (res.data.role) {
        case "admin":
          navigate("/org/employees", { replace: true });
          break;
        case "manager":
          navigate("/manager/dashboard", { replace: true });
          break;
        case "employee":
          navigate("/employee/dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 to-red-300">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedRole === "admin"
              ? "Organization Login"
              : selectedRole === "manager"
              ? "Manager Login"
              : "Employee Login"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, please sign in
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-4 text-sm cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition
              ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }
            `}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* REGISTER (ADMIN ONLY) */}
        {selectedRole === "admin" && (
          <p className="text-center text-sm text-gray-600 mt-6">
            New organization?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
