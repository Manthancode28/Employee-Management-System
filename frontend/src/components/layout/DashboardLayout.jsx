import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50">
        <Topbar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex justify-center">
        <main className="w-full max-w-7xl px-6 py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
