import { useState } from "react";
import { updateEvent } from "../../api/events";

function EditEventForm({ event, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: event.title,
    description: event.description || "",
    eventDate: event.eventDate.split("T")[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEvent(event._id, form);
    onUpdated();
    onClose();
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">✏️ Edit Event</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border rounded-xl px-4 py-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border rounded-xl px-4 py-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          className="border rounded-xl px-4 py-2 w-full"
          value={form.eventDate}
          onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
        />

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Update
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEventForm;
