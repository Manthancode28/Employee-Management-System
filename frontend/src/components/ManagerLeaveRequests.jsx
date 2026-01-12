import { useEffect, useState } from "react";
import {
  getManagerLeaves,
  updateLeaveStatus
} from "../api/leave";

const ManagerLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = () => {
    getManagerLeaves().then(res => setLeaves(res.data));
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleAction = async (id, status) => {
    await updateLeaveStatus(id, status);
    loadLeaves();
  };

  if (leaves.length === 0) {
    return (
      <p className="mt-6 text-gray-500">
        No leave requests
      </p>
    );
  }

  return (
    <div className="bg-white mt-8 rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          Leave Requests
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Employee</th>
            <th className="p-3 border">From</th>
            <th className="p-3 border">To</th>
            <th className="p-3 border">Reason</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l._id} className="text-center">
              <td className="p-2 border">
                {l.employee.name}
              </td>
              <td className="p-2 border">{l.fromDate}</td>
              <td className="p-2 border">{l.toDate}</td>
              <td className="p-2 border">{l.reason}</td>
              <td className="p-2 border">{l.status}</td>
              <td className="p-2 border space-x-2">
                {l.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleAction(l._id, "Approved")
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleAction(l._id, "Rejected")
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded"
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
  );
};

export default ManagerLeaveRequests;
