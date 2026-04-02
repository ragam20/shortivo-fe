import axios, { type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { paths } from "@/config/paths";
import { authSession } from "./auth-session-manager";
import { ApiError, type ApiResponse, type AuthResponse } from "@/types/api";

const axiosBaseConfig = {
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const publicApi = axios.create(axiosBaseConfig);
export const privateApi = axios.create(axiosBaseConfig);

privateApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authSession.getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

publicApi.interceptors.response.use(
  function onFullfilled(response) {
    return response.data;
  },

  function onRejected(error) {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    return Promise.reject(new ApiError(message, status));
  },
);

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

privateApi.interceptors.response.use(
  function onFullfilled(response) {
    return response.data;
  },
  async function onRejected(error) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = publicApi
            .post<ApiResponse<AuthResponse>, ApiResponse<AuthResponse>>(
              "/auth/refresh-token",
            )
            .then((res) => {
              const newToken = res.data.accessToken;
              authSession.setAccessToken(newToken);
              return newToken;
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        const newToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return privateApi(originalRequest);
      } catch {
        authSession.clearAccessToken();

        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo =
          searchParams.get("redirectTo") || window.location.pathname;

        if (!window.location.pathname.startsWith(paths.auth.login.path)) {
          window.location.href = paths.auth.login.getHref(redirectTo);
        }

        return Promise.reject(new ApiError(message, status));
      }
    }

    return Promise.reject(new ApiError(message, status));
  },
);
