import DashboardLayout from "../components/layout/DashboardLayout";
import AttendanceWidget from "../components/AttendanceWidget";
import EmployeeAttendanceTable from "../components/EmployeeAttendanceTable";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">
        Employee Dashboard
      </h1>

      {/* CHECK IN / OUT */}
      <AttendanceWidget />

      {/* ATTENDANCE HISTORY */}
      <EmployeeAttendanceTable />
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
