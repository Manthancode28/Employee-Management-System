import { useState } from "react";
import api from "../../api/axios";
import { getCurrentLocation } from "../../utils/getLocation";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  HomeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const OFFICE_LOCATION = {
  lat: 18.5204,
  lng: 73.8567,
};

const WORK_MODES = {
  WFO: {
    label: "Work From Office",
    icon: BuildingOfficeIcon,
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    card: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  WFH: {
    label: "Work From Home",
    icon: HomeIcon,
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    card: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
};

const AttendanceWidget = () => {
  const [workType, setWorkType] = useState("WFO");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); // { type, text, time }
  const [checkedIn, setCheckedIn] = useState(false);

  const getLocation = async () => {
    if (workType === "WFO") return OFFICE_LOCATION;
    return await getCurrentLocation();
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      await api.post("/api/attendance/checkin", { workType, location });

      setCheckedIn(true);
      setStatusMsg({
        type: "success",
        text: "Checked in successfully",
        time: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err.response?.data?.message || "Check-in failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      await api.post("/api/attendance/checkout", { location });

      setCheckedIn(false);
      setStatusMsg({
        type: "success",
        text: "Checked out successfully",
        time: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err.response?.data?.message || "Check-out failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const mode = WORK_MODES[workType];

  return (
    <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl border border-red-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500 rounded-lg">
            <ClockIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Attendance
            </h2>
            <p className="text-gray-600 text-sm">
              Mark your daily attendance
            </p>
          </div>
        </div>

        <span
          className={`text-xs px-3 py-1.5 rounded-full font-medium border flex items-center gap-2 ${mode.badge}`}
        >
          <mode.icon className="w-4 h-4" />
          {workType}
        </span>
      </div>

      {/* WORK MODE */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Work Mode
        </label>

        <div className="grid grid-cols-2 gap-3">
          {Object.keys(WORK_MODES).map((key) => {
            const opt = WORK_MODES[key];
            const Icon = opt.icon;

            return (
              <button
                key={key}
                onClick={() => setWorkType(key)}
                className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                  workType === key
                    ? `${opt.card} border-red-300 shadow-sm`
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className={`p-2 rounded-lg ${opt.iconBg}`}>
                  <Icon className={`w-5 h-5 ${opt.iconColor}`} />
                </div>
                <span className="text-sm font-medium">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LOCATION INFO */}
      <div className="mb-6 bg-red-50 rounded-xl p-4 border border-red-100">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <MapPinIcon className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium">
              {workType === "WFO" ? "Office Location" : "Remote Location"}
            </p>
            <p className="text-xs text-gray-600">
              {workType === "WFO"
                ? "Office coordinates will be used"
                : "Your current location will be used"}
            </p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={handleCheckIn}
          disabled={loading || checkedIn}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium disabled:opacity-50"
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={loading || !checkedIn}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium disabled:opacity-50"
        >
          Check Out
        </button>
      </div>

      {/* STATUS MESSAGE */}
      {statusMsg && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            statusMsg.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <p className="font-medium">{statusMsg.text}</p>
          {statusMsg.time && (
            <p className="text-xs mt-1">{statusMsg.time}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceWidget;
