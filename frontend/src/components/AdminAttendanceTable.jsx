import { useEffect, useState } from "react";
import { getAllAttendance } from "../api/attendance";

const formatLateTime = (minutes) => {
  if (!minutes || minutes === 0) return "0";

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hour ${remainingMinutes} min`;
};

const AdminAttendanceTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAttendance()
      .then(res => setRecords(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading attendance...</p>;

  return (
    <div className="bg-white mt-8 rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          All Employee Attendance
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Employee</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Work Type</th>
              <th className="p-3 border">Late</th>
              <th className="p-3 border">City</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r._id} className="text-center">
                <td className="p-3 border">
                  {r.employee?.name}
                </td>
                <td className="p-3 border">{r.date}</td>
                <td className="p-3 border">{r.status}</td>
                <td className="p-3 border">{r.workType}</td>
                <td className="p-2 border">
                {formatLateTime(r.lateMinutes)}
              </td>
                <td className="p-3 border">
                  {r.checkIn?.city || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendanceTable;
