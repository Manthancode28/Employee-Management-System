import api from "./axios";

/* ================= EMPLOYEES ================= */
export const getAllEmployees = () =>
  api.get("/api/employees");

export const getProbationEmployees = () =>
  api.get("/api/employees/probation");

/* ================= PROBATION ACTIONS ================= */
export const confirmProbation = (employeeId) =>
  api.put(`/api/employees/${employeeId}/confirm-probation`);

export const extendProbation = (employeeId, extraMonths) =>
  api.put(`/api/employees/${employeeId}/extend-probation`, {
    extraMonths
  });

/* ================= LEAVE ================= */
export const getMyLeaveBalance = () =>
  api.get("/api/employees/me/leave-balance");
