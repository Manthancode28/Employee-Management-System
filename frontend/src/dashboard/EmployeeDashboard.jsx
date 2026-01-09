import DashboardLayout from "../components/layout/DashboardLayout";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Employee Dashboard</h1>
      <p className="text-gray-600 mt-2">
        Welcome! You can view your profile and activities here.
      </p>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
