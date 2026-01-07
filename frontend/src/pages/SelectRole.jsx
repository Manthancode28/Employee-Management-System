import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-red-200 to-red-300">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center animate-fadeIn">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Employee Management System
        </h1>
        <p className="text-gray-500 mb-10">
          Choose how you want to continue
        </p>

        {/* ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ORGANIZATION */}
          <div
            onClick={() => navigate("/login?role=ORG_ADMIN")}
            className="group cursor-pointer bg-linear-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-6xl mb-4 group-hover:animate-bounce">
              🏢
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Organization
            </h2>
            <p className="text-red-100">
              Manage employees, roles and operations
            </p>
          </div>

          {/* EMPLOYEE */}
          <div
            onClick={() => navigate("/login?role=EMPLOYEE")}
            className="group cursor-pointer bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-6xl mb-4 group-hover:animate-bounce">
              👨‍💼
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Employee
            </h2>
            <p className="text-gray-300">
              Access your dashboard and tasks
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SelectRole;
