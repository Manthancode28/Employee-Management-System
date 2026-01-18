import api from "./axios";

export const fetchEvents = () => api.get("/api/events");
export const createEvent = (data) => api.post("/api/events", data);

// ✨ NEW
export const updateEvent = (id, data) =>
  api.put(`/api/events/${id}`, data);

export const deleteEvent = (id) =>
  api.delete(`/api/events/${id}`);
