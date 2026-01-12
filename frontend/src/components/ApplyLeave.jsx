import { useState } from "react";
import { applyLeave } from "../api/leave";

const ApplyLeave = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await applyLeave({ fromDate, toDate, reason });
      setFromDate("");
      setToDate("");
      setReason("");
      alert("Leave applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mt-10 overflow-hidden">
      
      {/* HEADER */}
      <div className="px-6 py-4 border-b bg-red-50">
        <h2 className="text-lg font-semibold text-red-600">
          Apply Leave
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Submit a leave request for approval
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* FROM DATE */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
            className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />
        </div>

        {/* TO DATE */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
            className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none"
          />
        </div>

        {/* REASON */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={4}
            placeholder="Mention reason for leave"
            className="mt-1 w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-300 outline-none resize-none"
          />
        </div>

        {/* BUTTON */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 hover:shadow-lg"
              }
            `}
          >
            {loading ? "Submitting..." : "Apply Leave"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeave;
