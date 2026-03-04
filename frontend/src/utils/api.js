import axios from "axios";

// Vite environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// centralised axios instance
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;