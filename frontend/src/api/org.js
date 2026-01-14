import api from "./axios";


export const setLeavePolicy = (data) =>
  api.post("/api/org/leave-policy", data);


export const applyLeavePolicy = () =>
  api.post("/api/org/apply-leave-policy");
