import { useState } from "react";
import { Calendar, MapPin, Users, Clock, ChevronDown, ChevronUp } from "lucide-react";

function EventsList({ events }) {
  const [expandedEvent, setExpandedEvent] = useState(null);

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-red-100 to-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <Calendar className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No events available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Create your first event to share with your team or community
        </p>
      </div>
    );
  }

  const getStatusColor = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "bg-gray-100 text-gray-700";
    if (diffDays === 0) return "bg-red-100 text-red-700";
    if (diffDays <= 7) return "bg-amber-100 text-amber-700";
    return "bg-green-100 text-green-700";
  };

  const getStatusText = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const diffDays = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return "This Week";
    return "Upcoming";
  };

  return (
    <div className="space-y-5">
      {events.map(event => {
        const isExpanded = expandedEvent === event._id;
        const statusColor = getStatusColor(event.eventDate);
        const statusText = getStatusText(event.eventDate);
        
        return (
          <div
            key={event._id}
            className="bg-gradient-to-br from-white to-red-50 border-2 border-red-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`${statusColor} text-sm font-bold px-4 py-1.5 rounded-full shadow-sm`}>
                    {statusText}
                  </span>
                  {event.category && (
                    <span className="bg-red-100 text-red-700 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
                      {event.category}
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-2xl text-gray-900 mb-2">
                  {event.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <span className="font-medium">
                      {new Date(event.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  
                  {event.attendees && (
                    <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-lg">
                      <Users className="w-4 h-4 text-red-600" />
                      <span>{event.attendees} attending</span>
                    </div>
                  )}
                </div>

                {event.description && (
                  <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'line-clamp-2'}`}>
                    <p className="text-gray-700 mt-2 pl-4 border-l-2 border-red-200">
                      {event.description}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-red-100">
                  <div className="flex items-center gap-2">
                    {event.createdBy?.avatar ? (
                      <img 
                        src={event.createdBy.avatar} 
                        alt={event.createdBy.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
                        {event.createdBy?.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {event.createdBy?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.createdBy?.role}
                      </p>
                    </div>
                  </div>

                  {event.description && event.description.length > 100 && (
                    <button
                      onClick={() => setExpandedEvent(isExpanded ? null : event._id)}
                      className="text-red-600 hover:text-red-700 font-bold text-sm flex items-center gap-1 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>Read More <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EventsList;