import { useState } from "react";
import { createEvent } from "../../api/events";

function AddEventForm({ onEventAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(form);
    onEventAdded();
    setForm({ title: "", description: "", eventDate: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">➕ Add Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border rounded-xl px-4 py-2 w-full"
          placeholder="Event Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="border rounded-xl px-4 py-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          className="border rounded-xl px-4 py-2 w-full"
          value={form.eventDate}
          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
          required
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEventForm;
