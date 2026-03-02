import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { CONFIG } from "./config";

interface TokenResponse {
    access: string;
    refresh: string;
}

export const api = axios.create({
    baseURL: CONFIG.API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

async function requestTokenRefresh(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("RefreshToken 없음");

    const res = await api.post<TokenResponse>(
      "/auth/refresh",
      null,
      { headers: { Authorization: `Bearer ${refreshToken}` }, withCredentials: true }
    );

    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);

    return res.data.access;
}

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
      const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              const newToken = await requestTokenRefresh();
              originalRequest.headers = originalRequest.headers ?? {};
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
          } catch {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
              return Promise.reject(err);
          }
      }
      return Promise.reject(err);
  }
);