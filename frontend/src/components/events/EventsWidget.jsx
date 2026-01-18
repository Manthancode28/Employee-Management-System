import { useEffect, useState } from "react";
import { fetchEvents } from "../../api/events";

function EventsWidget() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(res => setEvents(res.data));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">🎉 Upcoming Events</h3>

      {events.slice(0, 3).map(event => (
        <div key={event._id} className="mb-3">
          <p className="font-semibold">{event.title}</p>
          <p className="text-sm text-gray-500">
            {new Date(event.eventDate).toDateString()}
          </p>
        </div>
      ))}

      {events.length === 0 && (
        <p className="text-gray-500">No events scheduled</p>
      )}
    </div>
  );
}

export default EventsWidget;
