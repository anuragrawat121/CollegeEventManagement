import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const API = axios.create({ baseURL: API_BASE });

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// Events
export const fetchEvents = () => API.get("/events");

// Registration
export const registerEvent = (data) => API.post("/register", data);
export const fetchTickets = (email) =>
  API.get("/register", { params: { email } });

// Participants (for admin dashboard)
export const fetchAllParticipants = () => API.get("/register/participants");
