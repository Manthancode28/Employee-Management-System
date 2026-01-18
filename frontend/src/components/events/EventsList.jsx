function EventsList({ events }) {
  if (events.length === 0) {
    return <p className="text-gray-500">No events available</p>;
  }

  return (
    <div className="space-y-4">
      {events.map(event => (
        <div
          key={event._id}
          className="border rounded-xl p-4 bg-gray-50"
        >
          <h3 className="font-semibold text-lg">{event.title}</h3>

          {event.description && (
            <p className="text-gray-600 mt-1">{event.description}</p>
          )}

          <p className="text-sm text-gray-500 mt-2">
            📅 {new Date(event.eventDate).toDateString()}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Created by {event.createdBy?.name} ({event.createdBy?.role})
          </p>
        </div>
      ))}
    </div>
  );
}

export default EventsList;
