import { useState } from "react";
import api from "../api/axios";
import { getCurrentLocation } from "../utils/getLocation";

const OFFICE_LOCATION = {
  lat: 18.5204, 
  lng: 73.8567
};

const AttendanceWidget = () => {
  const [workType, setWorkType] = useState("WFO");
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    if (workType === "WFO") {
      return OFFICE_LOCATION;
    }
    return await getCurrentLocation();
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const location = await getLocation();

      await api.post("/api/attendance/checkin", {
        workType,
        location
      });

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
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">Attendance</h2>

      <select
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="WFO">Work From Office</option>
        <option value="WFH">Work From Home</option>
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default AttendanceWidget;
