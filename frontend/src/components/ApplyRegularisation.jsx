import { useState } from "react";
import { applyRegularisation } from "../api/regularisation";

const ApplyRegularisation = () => {
  const [form, setForm] = useState({
    date: "",
    workType: "WFO",
    checkInTime: "",
    checkOutTime: "",
    reason: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

    await applyRegularisation(form);
    alert("Regularisation applied");

    setForm({
      date: "",
      workType: "WFO",
      checkInTime: "",
      checkOutTime: "",
      reason: ""
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">
        Apply Regularisation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="checkInTime" onChange={handleChange} />
        <input type="time" name="checkOutTime" onChange={handleChange} />
        <textarea
          name="reason"
          placeholder="Reason"
          onChange={handleChange}
          required
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplyRegularisation;
