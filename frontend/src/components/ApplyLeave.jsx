import { useState } from "react";
import { applyLeave } from "../api/leave";

const ApplyLeave = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* ADD DATE */
  const addDate = () => {
    if (!currentDate) return;
    if (!selectedDates.includes(currentDate)) {
      setSelectedDates([...selectedDates, currentDate].sort());
    }
    setCurrentDate("");
  };

  /* REMOVE DATE */
  const removeDate = (date) => {
    setSelectedDates(selectedDates.filter(d => d !== date));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || selectedDates.length === 0) {
      alert("Please select leave type and dates");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await applyLeave({
        dates: selectedDates,
        leaveType,
        reason
      });

      setResult(res.data.leave);
      setSelectedDates([]);
      setLeaveType("");
      setReason("");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md mt-10">
      {/* HEADER */}
      <div className="px-6 py-4 border-b bg-red-50">
        <h2 className="text-lg font-semibold text-red-600">
          Apply Leave
        </h2>
        <p className="text-sm text-gray-500">
          Leave will be deducted after manager approval
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* DATE PICKER */}
        <div className="flex gap-3">
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full"
          />
          <button
            type="button"
            onClick={addDate}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Add
          </button>
        </div>

        {/* SELECTED DATES */}
        {selectedDates.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedDates.map(d => (
              <span
                key={d}
                onClick={() => removeDate(d)}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer"
              >
                {d} ×
              </span>
            ))}
          </div>
        )}

        {/* LEAVE TYPE */}
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="w-full border rounded-xl px-4 py-2"
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Casual">Casual Leave</option>
          <option value="Sick">Sick Leave</option>
        </select>

        {/* REASON */}
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          placeholder="Reason for leave"
          className="w-full border rounded-xl px-4 py-2"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-red-500 text-white rounded-xl"
        >
          {loading ? "Submitting..." : "Apply Leave"}
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="px-6 pb-6 text-sm text-gray-700">
          <p><b>Total Days:</b> {result.totalDays}</p>
          <p><b>Status:</b> Pending Manager Approval</p>
        </div>
      )}
    </div>
  );
};

export default ApplyLeave;
