import { useState } from "react";
import api from "../api/axios";
import { getCurrentLocation } from "../utils/getLocation";
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  HomeIcon, 
  BuildingOfficeIcon,
  MapPinIcon 
} from "@heroicons/react/24/outline";

const OFFICE_LOCATION = {
  lat: 18.5204,
  lng: 73.8567,
};

const AttendanceWidget = () => {
  const [workType, setWorkType] = useState("WFO");
  const [loading, setLoading] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  const getLocation = async () => {
    if (workType === "WFO") return OFFICE_LOCATION;
    return await getCurrentLocation();
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      await api.post("/api/attendance/checkin", { workType, location });
      setAttendanceStatus({ type: "checkin", time: new Date().toLocaleTimeString() });
      alert("Checked in successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to check in");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      await api.post("/api/attendance/checkout", { location });
      setAttendanceStatus({ type: "checkout", time: new Date().toLocaleTimeString() });
      alert("Checked out successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to check out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-xl border border-blue-100 p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <ClockIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Attendance
            </h2>
            <p className="text-gray-600 text-sm">Mark your attendance</p>
          </div>
        </div>
        
        <span
          className={`text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-2 ${
            workType === "WFO"
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-purple-100 text-purple-700 border border-purple-200"
          }`}
        >
          {workType === "WFO" ? (
            <BuildingOfficeIcon className="w-4 h-4" />
          ) : (
            <HomeIcon className="w-4 h-4" />
          )}
          {workType}
        </span>
      </div>

      {/* Work Mode Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Work Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "WFO", label: "Work From Office", icon: BuildingOfficeIcon, color: "blue" },
            { value: "WFH", label: "Work From Home", icon: HomeIcon, color: "purple" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setWorkType(option.value)}
              className={`p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                workType === option.value
                  ? `bg-${option.color}-50 text-${option.color}-700 border-${option.color}-200 shadow-sm`
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className={`p-2 rounded-lg ${
                workType === option.value ? `bg-${option.color}-100` : "bg-gray-100"
              }`}>
                <option.icon className={`w-5 h-5 ${
                  workType === option.value ? `text-${option.color}-600` : "text-gray-500"
                }`} />
              </div>
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location Info */}
      <div className="mb-6 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <MapPinIcon className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">
              {workType === "WFO" ? "Office Location" : "Remote Location"}
            </p>
            <p className="text-gray-600 text-xs">
              {workType === "WFO" 
                ? "Using office coordinates for attendance" 
                : "Your current location will be used"}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-5 h-5" />
              Check In
            </>
          )}
        </button>

        <button
          onClick={handleCheckOut}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <XCircleIcon className="w-5 h-5" />
              Check Out
            </>
          )}
        </button>
      </div>

      {/* Status Display */}
      {attendanceStatus && (
        <div className={`mt-4 p-3 rounded-lg flex items-center gap-3 ${
          attendanceStatus.type === "checkin" 
            ? "bg-emerald-50 border border-emerald-100" 
            : "bg-rose-50 border border-rose-100"
        }`}>
          <div className={`p-2 rounded-full ${
            attendanceStatus.type === "checkin" ? "bg-emerald-100" : "bg-rose-100"
          }`}>
            {attendanceStatus.type === "checkin" ? (
              <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-rose-600" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              Successfully {attendanceStatus.type === "checkin" ? "checked in" : "checked out"}
            </p>
            <p className="text-xs text-gray-600">
              {attendanceStatus.time}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceWidget;