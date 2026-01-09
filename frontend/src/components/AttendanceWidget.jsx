import { useState } from "react";
import api from "../api/axios";
import { getCurrentLocation } from "../utils/getLocation";

const OFFICE_LOCATION = {
  lat: 18.5204,
  lng: 73.8567,
};

const AttendanceWidget = () => {
  const [workType, setWorkType] = useState("WFO");
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    if (workType === "WFO") return OFFICE_LOCATION;
    return await getCurrentLocation();
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      await api.post("/api/attendance/checkin", { workType, location });
      alert("Checked in successfully");
    } catch (err) {
      alert(err.response?.data?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      await api.post("/api/attendance/checkout", { location });
      alert("Checked out successfully");
    } catch (err) {
      alert(err.response?.data?.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Attendance
        </h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            workType === "WFO"
              ? "bg-blue-100 text-blue-600"
              : "bg-purple-100 text-purple-600"
          }`}
        >
          {workType}
        </span>
      </div>

      <label className="block text-sm text-gray-600 mb-1">
        Work Mode
      </label>
      <select
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="WFO">Work From Office</option>
        <option value="WFH">Work From Home</option>
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Check In"}
        </button>

        <button
          onClick={handleCheckOut}
          disabled={loading}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Check Out"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceWidget;
