import { useEffect, useState } from "react";
import { getManagerLeaves, updateLeaveStatus } from "../api/leave";
import StatusBadge from "./ui/StatusBadge";

const ManagerLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [processing, setProcessing] = useState(null);

  const loadLeaves = async () => {
    const res = await getManagerLeaves();
    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleAction = async (id, status) => {
    setProcessing(id);
    await updateLeaveStatus(id, status);
    setProcessing(null);
    loadLeaves();
  };

  if (leaves.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        No leave requests
      </div>
    );
  }

  return (
    <div className="bg-white mt-10 rounded-2xl shadow">
      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Leave Requests
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Days</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="px-6 py-4 font-medium">
                  {l.employee.name}
                </td>
                <td className="px-6 py-4 text-center">{l.fromDate}</td>
                <td className="px-6 py-4 text-center">{l.toDate}</td>
                <td className="px-6 py-4 text-center">
                  {l.leaveType}
                </td>
                <td className="px-6 py-4 text-center">
                  {l.totalDays}
                  {l.isSandwich && (
                    <span className="ml-2 text-xs text-red-600">
                      (Sandwich)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={l.status} />
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  {l.status === "Pending" && (
                    <>
                      <button
                        disabled={processing === l._id}
                        onClick={() =>
                          handleAction(l._id, "Approved")
                        }
                        className="px-3 py-1 text-xs rounded-lg bg-green-500 text-white"
                      >
                        Approve
                      </button>
                      <button
                        disabled={processing === l._id}
                        onClick={() =>
                          handleAction(l._id, "Rejected")
                        }
                        className="px-3 py-1 text-xs rounded-lg bg-red-500 text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerLeaveRequests;
