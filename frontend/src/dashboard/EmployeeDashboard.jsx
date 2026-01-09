import DashboardLayout from "../components/layout/DashboardLayout";
import AttendanceWidget from "../components/AttendanceWidget";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      <AttendanceWidget />

    </DashboardLayout>
  );
};

export default EmployeeDashboard;
