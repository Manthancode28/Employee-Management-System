import { useEffect, useState } from "react";
import { getManagerAttendance } from "../api/attendance";

const formatLateTime = (minutes) => {
  if (!minutes || minutes === 0) return "0";

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hour ${remainingMinutes} min`;
};

const ManagerAttendanceTable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getManagerAttendance().then(res => setRecords(res.data));
  }, []);

  if (records.length === 0)
    return <p className="mt-6 text-gray-500">No attendance found</p>;

  return (
    <div className="bg-white mt-8 rounded-xl shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Team Attendance</h2>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Late</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r._id} className="text-center">
              <td className="p-2 border">{r.employee.name}</td>
              <td className="p-2 border">{r.date}</td>
              <td className="p-2 border">{r.status}</td>
              <td className="p-2 border">
                {formatLateTime(r.lateMinutes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerAttendanceTable;
