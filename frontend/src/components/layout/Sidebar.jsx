import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const navItem = (path, label, icon) => (
    <Link
      to={path}
      onClick={onClose}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
        ${
          pathname === path
            ? "bg-red-500 text-white"
            : "text-gray-600 hover:bg-red-100"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );

  return (
    <>
      {/* OVERLAY (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-full
          w-64
          bg-white
          shadow-xl
          p-6
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-8">
          EMS Admin
        </h2>

        <nav className="space-y-2">
          {navItem("/admin/dashboard", "Dashboard", "📊")}
          {navItem("/admin/employees", "Employees", "👥")}
          {navItem("/admin/events", "Events", "🎉")}
          {navItem("/admin/leave-policy", "Leave Policy", "📝")}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
