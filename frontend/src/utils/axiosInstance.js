import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

instance.interceptors.request.use((config) => {
  const raw = localStorage.getItem("user");
  if (raw) {
    const token = JSON.parse(raw).token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
