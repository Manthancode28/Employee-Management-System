import { useEffect, useState } from "react";
import {
  getAllRegularisations,
  updateRegularisationStatus
} from "../../api/regularisation";
import StatusBadge from "../ui/StatusBadge";

const formatTime = (date) =>
  date ? new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";

const getRegType = (r) => {
  if (r.checkInTime && r.checkOutTime) return "Check-in & Check-out";
  if (r.checkInTime) return "Check-in";
  if (r.checkOutTime) return "Check-out";
  return "-";
};

const ManagerRegularisationRequests = () => {
  const [list, setList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const loadData = async () => {
    const res = await getAllRegularisations();
    setList(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (id, status) => {
    setLoadingId(id);
    await updateRegularisationStatus(id, status);
    setLoadingId(null);
    loadData();
  };

  if (list.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        No regularisation requests
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow mt-12">
      {/* HEADER */}
      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Regularisation Requests
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Attendance correction requests from employees
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-center">Date</th>
              <th className="px-6 py-3 text-center">Type</th>
              <th className="px-6 py-3 text-center">Time(s)</th>
              <th className="px-6 py-3 text-left">Reason</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((r) => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                {/* EMPLOYEE */}
                <td className="px-6 py-4 font-medium">
                  {r.employee?.name}
                </td>

                {/* DATE */}
                <td className="px-6 py-4 text-center">
                  {r.date}
                </td>

                {/* TYPE */}
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {getRegType(r)}
                  </span>
                </td>

                {/* TIME */}
                <td className="px-6 py-4 text-center text-xs text-gray-700">
                  {r.checkInTime && (
                    <div>In: {formatTime(r.checkInTime)}</div>
                  )}
                  {r.checkOutTime && (
                    <div>Out: {formatTime(r.checkOutTime)}</div>
                  )}
                </td>

                {/* REASON */}
                <td className="px-6 py-4">
                  {r.reason}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={r.status} />
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 text-center space-x-2">
                  {r.status === "pending" && (
                    <>
                      <button
                        disabled={loadingId === r._id}
                        onClick={() =>
                          handleAction(r._id, "approved")
                        }
                        className="px-3 py-1 text-xs rounded-lg bg-green-500 text-white"
                      >
                        Approve
                      </button>

                      <button
                        disabled={loadingId === r._id}
                        onClick={() =>
                          handleAction(r._id, "rejected")
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

export default ManagerRegularisationRequests;
