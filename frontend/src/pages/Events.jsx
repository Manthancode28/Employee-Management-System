import { useEffect, useState } from "react";
import {
  fetchEvents,
  deleteEvent
} from "../api/events";

import AddEventForm from "../components/events/AddEventForm";
import EditEventForm from "../components/events/EditEventForm";

function Events() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const role = localStorage.getItem("role"); // admin | manager | employee

  const loadEvents = async () => {
    const res = await fetchEvents();
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    await deleteEvent(id);
    loadEvents();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>🎉 Office Events</h2>

      {/* ADD EVENT (ADMIN / MANAGER) */}
      {(role === "admin" || role === "manager") && (
        <div style={{ marginBottom: 30 }}>
          <AddEventForm onEventAdded={loadEvents} />
        </div>
      )}

      {/* NO EVENTS */}
      {events.length === 0 && <p>No events available</p>}

      {/* EVENTS LIST */}
      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 6
          }}
        >
          <h3>{event.title}</h3>

          {event.description && <p>{event.description}</p>}

          <p>
            📅 {new Date(event.eventDate).toDateString()}
          </p>

          <small>
            Created by:{" "}
            {event.createdByModel === "Organization"
              ? `${event.createdBy?.name} (Admin)`
              : `${event.createdBy?.name} (${event.createdBy?.role})`}
          </small>

          {/* ACTION BUTTONS */}
          {(role === "admin" || role === "manager") && (
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setEditingEvent(event)}
                style={{
                  marginRight: 10,
                  background: "#2563eb",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: 4
                }}
              >
                Edit
              </button>

              {role === "admin" && (
                <button
                  onClick={() => handleDelete(event._id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: 4
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* EDIT EVENT MODAL */}
      {editingEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <EditEventForm
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onUpdated={loadEvents}
          />
        </div>
      )}
    </div>
  );
}

export default Events;
