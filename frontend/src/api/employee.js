import api from "./axios";

export const getAllEmployees = () =>
  api.get("/api/employees");


export const getMyLeaveBalance = () =>
  api.get("/api/employees/me/leave-balance");
