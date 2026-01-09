import { FaUsers, FaUserTie, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">EMS</h2>

      {role === "admin" && (
        <Link to="/admin" className="flex items-center gap-2 p-2 hover:bg-gray-100">
          <FaUsers /> Admin Dashboard
        </Link>
      )}

      {role === "manager" && (
        <Link to="/manager" className="flex items-center gap-2 p-2 hover:bg-gray-100">
          <FaUserTie /> Manager Dashboard
        </Link>
      )}

      {role === "employee" && (
        <Link to="/employee" className="flex items-center gap-2 p-2 hover:bg-gray-100">
          <FaUser /> Employee Dashboard
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
