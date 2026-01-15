import { useEffect, useState } from "react";
import { getMyLeaves } from "../../api/leave";
import { getMyLeaveBalance } from "../../api/employee";
import StatusBadge from "../ui/StatusBadge";
import StatCard from "../ui/StatCard";

const EmployeeLeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMyLeaves(),
      getMyLeaveBalance()
    ])
      .then(([leaveRes, balanceRes]) => {
        setLeaves(leaveRes.data);
        setBalance(balanceRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="mt-6 text-gray-500">Loading leave details...</div>;
  }

  return (
    <div className="mt-14">
      {/* ================= LEAVE BALANCE ================= */}
      {balance && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Casual Leave"
            value={`${balance.casual.remaining} remaining`}
            icon="🌴"
          />
          <StatCard
            title="Sick Leave"
            value={`${balance.sick.remaining} remaining`}
            icon="🤒"
          />
          <StatCard
            title="Total Used"
            value={balance.casual.used + balance.sick.used}
            icon="📊"
          />
        </div>
      )}

      {/* ================= LEAVE TABLE ================= */}
      <div className="bg-white rounded-2xl shadow">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            My Leave Requests
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Approval status of all your leave applications
          </p>
        </div>

        {leaves.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No leave requests found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Dates</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Days</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(l => (
                  <tr key={l._id} className="border-t">
                    <td className="px-6 py-3 text-center">
                      {l.dates.join(", ")}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {l.leaveType}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold">
                      {l.totalDays}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <StatusBadge status={l.status} />
                    </td>
                    <td className="px-6 py-3 text-center text-xs text-gray-500">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeLeaveStatus;
