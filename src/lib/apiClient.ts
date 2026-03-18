import axios, { type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { paths } from "@/config/paths";
import { authSession } from "./authSessionManager";
import type { ApiResponse, AuthResponse } from "@/types/api";

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

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

privateApi.interceptors.response.use(
  function onFullfilled(response) {
    return response;
  },
  async function onRejected(error) {
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
            .post<ApiResponse<AuthResponse>>("/auth/refresh-token")
            .then((res) => {
              const newToken = res.data.data.accessToken;
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
      } catch (err) {
        authSession.clearAccessToken();

        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo =
          searchParams.get("redirectTo") || window.location.pathname;
        window.location.href = paths.auth.login.getHref(redirectTo);

        if (!window.location.pathname.startsWith(paths.auth.login.path)) {
          window.location.href = paths.auth.login.getHref(redirectTo);
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
