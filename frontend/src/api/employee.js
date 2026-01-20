import api from "./axios";

/* ================= EMPLOYEES ================= */
export const getAllEmployees = () =>
  api.get("/api/employees");

export const getProbationEmployees = () =>
  api.get("/api/employees/probation");


/* ================= PROBATION ACTIONS ================= */

// 🔹 NEW: confirm probation + send email
export const completeProbation = (employeeId) =>
  api.post(`/api/probation/complete/${employeeId}`);

// existing
export const extendProbation = (employeeId, extraMonths) =>
  api.put(`/api/employees/${employeeId}/extend-probation`, {
    extraMonths
  });


/* ================= LEAVE ================= */
export const getMyLeaveBalance = () =>
  api.get("/api/employees/me/leave-balance");



