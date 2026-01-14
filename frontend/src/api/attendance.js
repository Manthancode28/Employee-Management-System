import api from "./axios";

export const getMyAttendance = () =>
  api.get("/api/attendance/me");

export const getAllAttendance = () =>
  api.get("/api/attendance/all");

export const getManagerAttendance = () =>
  api.get("/api/attendance/manager");
