import { useEffect, useState } from "react";
import api from "../api/axios";

const OrgAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/attendance/org")
      .then((res) => setRecords(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatTime = (time) => {
    if (!time) return "-";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white mt-6 rounded shadow">
      <h2 className="text-lg font-semibold p-4 border-b">
        Organization Attendance
      </h2>

      {loading ? (
        <p className="p-4">Loading attendance...</p>
      ) : records.length === 0 ? (
        <p className="p-4 text-gray-500">No attendance records found</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Check In</th>
              <th className="border p-2">Check Out</th>
              <th className="border p-2">Work Type</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50 text-center">
                <td className="border p-2 font-medium">
                  {r.employee?.name}
                </td>
                <td className="border p-2">{r.date}</td>
                <td className="border p-2">
                  {formatTime(r.checkIn?.time)}
                </td>
                <td className="border p-2">
                  {formatTime(r.checkOut?.time)}
                </td>
                <td className="border p-2 font-semibold">
                  {r.workType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrgAttendance;
