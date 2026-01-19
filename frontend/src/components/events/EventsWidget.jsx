import { useEffect, useState } from "react";
import { fetchEvents } from "../../api/events";
import { Calendar, PartyPopper, Clock, MapPin, ChevronRight } from "lucide-react";

function EventsWidget() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(res => setEvents(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getEventIcon = (index) => {
    const icons = [PartyPopper, Calendar, Clock];
    return icons[index] || Calendar;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-200 rounded-xl"></div>
          <div className="h-6 bg-red-200 rounded w-32"></div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="mb-4">
            <div className="h-4 bg-red-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-red-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-xl p-6 border border-red-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-2.5 rounded-xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
            Upcoming Events
          </h3>
        </div>
        <span className="bg-red-100 text-red-700 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
          {events.length} events
        </span>
      </div>

      <div className="space-y-4">
        {events.slice(0, 3).map((event, index) => {
          const Icon = getEventIcon(index);
          const isToday = new Date(event.eventDate).toDateString() === new Date().toDateString();
          const isTomorrow = new Date(event.eventDate).toDateString() === 
            new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();
          
          return (
            <div 
              key={event._id} 
              className="group bg-white p-4 rounded-2xl border-2 border-red-50 hover:border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                      {event.title}
                    </p>
                    <div className="flex gap-2">
                      {isToday && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          TODAY
                        </span>
                      )}
                      {isTomorrow && (
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          TOMORROW
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span className={isToday ? "font-bold text-red-600" : ""}>
                        {new Date(event.eventDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-red-200 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold">No events scheduled</p>
          <p className="text-gray-400 text-sm mt-1">Add your first event to get started</p>
        </div>
      ) : events.length > 3 && (
        <div className="mt-6 pt-4 border-t border-red-100">
          <button className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-bold text-sm group">
            View All Events
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}

export default EventsWidget;