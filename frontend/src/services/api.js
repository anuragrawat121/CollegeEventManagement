import axios from "axios";

const API_BASE = "http://localhost:5000/api";
// Fetch all participants (for organizer dashboard)
export const fetchAllParticipants = () => API.get("/participants");
export const fetchEvents = () => axios.get(`${API_BASE}/events`);
export const registerEvent = (data) => axios.post(`${API_BASE}/register`, data);
export const fetchTickets = (email) =>
  axios.get(`${API_BASE}/register?email=${email}`);
