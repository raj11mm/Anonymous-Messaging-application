import axios from "axios";

const LOCAL_API_BASE_URL = "http://127.0.0.1:5000/api";
const PRODUCTION_API_BASE_URL = "https://whisperbox-backend-dz8e.onrender.com/api";
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const fallbackApiBaseUrl = import.meta.env.DEV ? LOCAL_API_BASE_URL : PRODUCTION_API_BASE_URL;

export const apiBaseUrl = configuredApiBaseUrl || fallbackApiBaseUrl;
export const isApiBaseUrlConfigured = Boolean(configuredApiBaseUrl || import.meta.env.PROD);

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
