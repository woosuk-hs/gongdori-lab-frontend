import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { CONFIG } from "@utils/config.ts";

interface TokenRefreshResponse {
    access: string;
    refresh: string;
}

export const api = axios.create({
    baseURL: CONFIG.API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
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
    if (!refreshToken) throw new Error("RefreshToken이 없습니다.");

    const response = await api.post<TokenRefreshResponse>(
      "/auth/refresh",
      null,
      {
          headers: { Authorization: `Bearer ${refreshToken}` },
          withCredentials: true,
      }
    );

    const { access, refresh } = response.data;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return access;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              const newAccessToken = await requestTokenRefresh();
              originalRequest.headers = originalRequest.headers ?? {};
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
          } catch (refreshError) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              window.location.href = "/login";
              return Promise.reject(refreshError);
          }
      }
      return Promise.reject(error);
  }
);