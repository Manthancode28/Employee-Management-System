import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const role = localStorage.getItem("role");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* TOPBAR */}
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">

        {/* SIDEBAR */}
        {role === "admin" && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            px-4 sm:px-6 lg:px-8
            py-6
            transition-all
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
