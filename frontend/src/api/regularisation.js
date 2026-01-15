import api from "./axios";

export const applyRegularisation = (data) =>
  api.post("/api/regularisation", data);

export const getMyRegularisations = () =>
  api.get("/api/regularisation/my");

export const getAllRegularisations = () =>
  api.get("/api/regularisation/all");

export const updateRegularisationStatus = (id, status) =>
  api.put(`/api/regularisation/${id}`, { status });
