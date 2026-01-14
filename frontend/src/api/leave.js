import api from "./axios";

export const applyLeave = (data) =>
  api.post("/api/leaves", data);

export const getManagerLeaves = () =>
  api.get("/api/leaves/manager");

export const updateLeaveStatus = (leaveId, status) =>
  api.patch(`/api/leaves/${leaveId}`, { status });

export const getMyLeaves = () =>
  api.get("/api/leaves/me");
