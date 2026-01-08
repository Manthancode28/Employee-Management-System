import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-red-200 to-red-300">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-center">

        <h1 className="text-4xl font-bold mb-2">
          Employee Management System
        </h1>
        <p className="text-gray-500 mb-10">
          Choose how you want to continue
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ADMIN */}
          <div
            onClick={() => navigate("/login?role=admin")}
            className="cursor-pointer bg-red-500 text-white p-8 rounded-2xl hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">🏢</div>
            <h2 className="text-2xl font-semibold mb-2">
              Organization
            </h2>
            <p className="text-red-100 text-sm">
              Admin access & full control
            </p>
          </div>

          {/* MANAGER */}
          <div
            onClick={() => navigate("/login?role=manager")}
            className="cursor-pointer bg-blue-600 text-white p-8 rounded-2xl hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">👨‍💼</div>
            <h2 className="text-2xl font-semibold mb-2">
              Manager
            </h2>
            <p className="text-blue-100 text-sm">
              Manage employee activities
            </p>
          </div>

          {/* EMPLOYEE */}
          <div
            onClick={() => navigate("/login?role=employee")}
            className="cursor-pointer bg-gray-800 text-white p-8 rounded-2xl hover:scale-105 transition"
          >
            <div className="text-5xl mb-3">👨‍💻</div>
            <h2 className="text-2xl font-semibold mb-2">
              Employee
            </h2>
            <p className="text-gray-300 text-sm">
              View personal dashboard
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SelectRole;
