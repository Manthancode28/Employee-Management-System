import { useEffect, useState } from "react";
import { getManagerLeaves, updateLeaveStatus } from "../../api/leave";
import StatusBadge from "../ui/StatusBadge";

const ManagerLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [processing, setProcessing] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const loadLeaves = async () => {
    const res = await getManagerLeaves();
    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleAction = async (id, status) => {
    setProcessing(id);
    try {
      await updateLeaveStatus(id, status);
      loadLeaves();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }

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
              <th className="px-6 py-3">Dates</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">Total Days</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => {
              const sortedDates = [...l.dates].sort();
              const shortRange =
                sortedDates.length > 1
                  ? `${sortedDates[0]} → ${sortedDates.at(-1)}`
                  : sortedDates[0];

              return (
                <tr key={l._id} className="border-t hover:bg-gray-50">
                  {/* EMPLOYEE */}
                  <td className="px-6 py-4 font-medium">
                    {l.employee.name}
                  </td>

                  {/* DATES */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        setExpanded(expanded === l._id ? null : l._id)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {shortRange}
                    </button>

                    {expanded === l._id && (
                      <div className="mt-2 text-xs text-gray-600">
                        {sortedDates.join(", ")}
                      </div>
                    )}
                  </td>

                  {/* TYPE */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          l.leaveType === "Sandwich"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {l.leaveType}
                    </span>
                  </td>

                  {/* DAYS */}
                  <td className="px-6 py-4 text-center font-semibold">
                    {l.totalDays}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={l.status} />
                  </td>

                  {/* ACTION */}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerLeaveRequests;