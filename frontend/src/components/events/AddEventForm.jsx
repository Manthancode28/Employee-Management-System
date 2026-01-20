import { useState } from "react";
import { createEvent } from "../../api/events";
import { useNavigate } from "react-router-dom";

function AddEventForm({ onEventAdded, pageMode = false }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(form);
    setForm({ title: "", description: "", eventDate: "" });

    if (onEventAdded) onEventAdded();
    if (pageMode) navigate(-1);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow ${
        pageMode ? "p-8 max-w-2xl mx-auto" : "p-6"
      }`}
    >
      {/* PAGE HEADER */}
      {pageMode && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Event
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new office event
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border rounded-xl px-4 py-2 w-full"
          placeholder="Event Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          className="border rounded-xl px-4 py-2 w-full"
          placeholder="Description (optional)"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          className="border rounded-xl px-4 py-2 w-full"
          value={form.eventDate}
          onChange={(e) =>
            setForm({ ...form, eventDate: e.target.value })
          }
          required
        />

        <div className="flex gap-3 pt-4">
          {pageMode && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded-xl"
            >
              Cancel
            </button>
          )}

          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventForm;
