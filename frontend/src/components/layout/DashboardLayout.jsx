import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="sticky top-0 z-50">
        <Topbar />
      </div>

      {/* BODY */}
      <div className="flex">

        {/* SIDEBAR (Admin only for now) */}
        {role === "admin" && (
          <Sidebar />
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
