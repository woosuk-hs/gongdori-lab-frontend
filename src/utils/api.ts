import axios, {
    type InternalAxiosRequestConfig,
    type AxiosError,
} from "axios";
import { Auth, type TokenDTO } from "./auth";
import { CONFIG } from "./config";

export const api = axios.create({
    baseURL: CONFIG.API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = Auth.getAccessToken();
    if (token) {
        config.headers ??= {} as typeof config.headers;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function requestTokenRefresh(): Promise<string> {
    const refreshToken = Auth.getRefreshToken();

    if (!refreshToken) {
        throw new Error("No refresh token");
    }

    const res = await api.post<TokenDTO>("/auth/refresh", JSON.stringify(refreshToken), {
        headers: { "Content-Type": "application/json" },
    });

    Auth.saveTokens(res.data);
    return res.data.access;
}

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
      const originalRequest = err.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
      };

      if (!originalRequest) return Promise.reject(err);

      if (originalRequest.url?.includes("/auth/refresh")) {
          Auth.clear();
          window.location.href = "/login";
          return Promise.reject(err);
      }

      if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!Auth.getRefreshToken()) {
            return Promise.reject(err);
          }

          try {
              const newToken = await requestTokenRefresh();
              originalRequest.headers ??= {} as typeof originalRequest.headers;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
          } catch {
              Auth.clear();
              window.location.href = "/login";
          }
      }

      return Promise.reject(err);
  }
);