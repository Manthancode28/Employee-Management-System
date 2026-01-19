import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { setLeavePolicy, applyLeavePolicy } from "../api/org";

const AdminLeavePolicy = () => {
  const [casual, setCasual] = useState("");
  const [sick, setSick] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const handleApplyLeavePolicy = async () => {
    if (!casual || !sick) {
      alert("Please enter all values");
      return;
    }

    try {
      setLoading(true);

      await setLeavePolicy({
        period,
        casual: Number(casual),
        sick: Number(sick)
      });

      await applyLeavePolicy();

      alert("Leave policy applied successfully");

      setCasual("");
      setSick("");
    } catch (err) {
      alert("Failed to apply leave policy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Leave Policy
        </h1>
        <p className="text-gray-500 mt-1">
          Configure organization-wide leave rules
        </p>
      </div>

      {/* LEAVE POLICY CARD */}
      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">
        <h2 className="text-xl font-semibold mb-6">
          Organization Leave Policy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Allocation Type
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded-xl px-4 py-2 w-full"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Casual Leave
            </label>
            <input
              type="number"
              value={casual}
              onChange={(e) => setCasual(e.target.value)}
              className="border rounded-xl px-4 py-2 w-full"
              placeholder="e.g. 2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Sick Leave
            </label>
            <input
              type="number"
              value={sick}
              onChange={(e) => setSick(e.target.value)}
              className="border rounded-xl px-4 py-2 w-full"
              placeholder="e.g. 1"
            />
          </div>

        </div>

        <button
          onClick={handleApplyLeavePolicy}
          disabled={loading}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Applying..." : "Apply Leave Policy"}
        </button>
      </div>

    </DashboardLayout>
  );
};

export default AdminLeavePolicy;
