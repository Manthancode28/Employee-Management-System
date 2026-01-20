const Topbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* HAMBURGER (mobile only) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>

          <h1 className="text-lg font-bold text-red-600">
            Employee Management System
          </h1>
        </div>

        {/* RIGHT */}
        <div className="text-sm text-gray-500">
          Admin
        </div>
      </div>
    </header>
  );
};

export default Topbar;
