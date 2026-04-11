import axios, { type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { paths } from "@/config/paths";
import { ApiError } from "@/types/api";

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

          publicApi.post("/auth/refresh-token").finally(() => {
            isRefreshing = false;
          });
        }

        return privateApi(originalRequest);
      } catch {
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
