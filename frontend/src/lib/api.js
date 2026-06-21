import axios from "axios";

// Empty string on Vercel → relative /api paths; set in frontend/.env for local dev.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitVolunteer = (data) => api.post("/volunteers", data).then((r) => r.data);
export const submitContact = (data) => api.post("/contacts", data).then((r) => r.data);
export const getStats = () => api.get("/stats").then((r) => r.data);
