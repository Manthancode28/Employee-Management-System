import { useEffect, useState } from "react";
import { getManagerAttendance } from "../api/attendance";
import StatusBadge from "./ui/StatusBadge";

const formatLateTime = (min) => {
  if (!min || min === 0) return "-";
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)}h ${min % 60}m`;
};

const ManagerAttendanceTable = ({ onSummaryChange }) => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    getManagerAttendance().then((res) => {
      setRecords(res.data);
      onSummaryChange?.(res.data);
    });
  }, []);

  const filtered = records.filter((r) => {
    const matchName = r.employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      status === "All" || r.status === status;

    const matchDate =
      (!fromDate || r.date >= fromDate) &&
      (!toDate || r.date <= toDate);

    return matchName && matchStatus && matchDate;
  });

  if (records.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        No attendance records found
      </div>
    );
  }

  return (
    <div className="bg-white mt-10 rounded-2xl shadow">
      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Team Attendance
        </h2>
      </div>

      {/* FILTERS */}
      <div className="p-5 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-60"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Status</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Leave">Leave</option>
          <option value="Absent">Absent</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Late</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r._id}
                className={`border-t transition ${
                  r.status === "Late"
                    ? "bg-yellow-50"
                    : r.status === "Leave"
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">
                  {r.employee.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {r.date}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  {formatLateTime(r.lateMinutes)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerAttendanceTable;
