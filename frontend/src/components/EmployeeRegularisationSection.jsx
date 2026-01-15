import { useEffect, useState } from "react";
import {
  applyRegularisation,
  getMyRegularisations
} from "../api/regularisation";
import StatusBadge from "./ui/StatusBadge";

const EmployeeRegularisationSection = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    date: "",
    checkInTime: "",
    checkOutTime: "",
    reason: ""
  });

  const loadData = async () => {
    const res = await getMyRegularisations();
    setList(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    if (form.date >= today) {
      alert("Only past date allowed");
      return;
    }

    if (!form.checkInTime && !form.checkOutTime) {
      alert("Provide check-in or check-out time");
      return;
    }

    try {
      await applyRegularisation({
        date: form.date,
        workType: "WFO",
        checkInTime: form.checkInTime,
        checkOutTime: form.checkOutTime,
        reason: form.reason
      });

      alert("Regularisation applied successfully");

      setForm({
        date: "",
        checkInTime: "",
        checkOutTime: "",
        reason: ""
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow mt-12">
      <div
        onClick={() => setOpen(!open)}
        className="p-5 border-b flex justify-between cursor-pointer"
      >
        <h2 className="text-lg font-semibold">
          Attendance Regularisation
        </h2>
        <span className="text-red-500 text-sm">
          {open ? "Hide" : "Apply / View"}
        </span>
      </div>

      {open && (
        <div className="p-6 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              required
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="time"
              value={form.checkInTime}
              onChange={(e) =>
                setForm({ ...form, checkInTime: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="time"
              value={form.checkOutTime}
              onChange={(e) =>
                setForm({ ...form, checkOutTime: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              placeholder="Reason"
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
              required
              className="border rounded-lg px-3 py-2"
            />

            <button
              type="submit"
              className="md:col-span-4 bg-red-500 text-white py-2 rounded-lg"
            >
              Submit Regularisation
            </button>
          </form>

          {list.length > 0 && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r._id} className="border-t text-center">
                    <td>{r.date}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td>{r.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeRegularisationSection;
