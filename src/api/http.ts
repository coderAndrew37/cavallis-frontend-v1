import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { handleTokenRefresh, logoutUser } from "./authService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ Ensures cookies are sent
});

// ✅ Extend Axios request config type to include `_retry`
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 🔹 If Unauthorized (401) and it's NOT a refresh-token request, attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await handleTokenRefresh();
      if (!newToken) {
        await logoutUser(); // 🔥 Ensure logout on repeated failures
        return Promise.reject(error);
      }

      return api.request(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
