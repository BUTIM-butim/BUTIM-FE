import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

type CustomInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type BaseResponse<T> = {
  code?: number;
  message?: string;
  data?: T;
  result?: T;
  success?: boolean;
  isSuccess?: boolean;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

let refreshPromise: Promise<TokenResponse> | null = null;

const unwrapBaseResponse = <T>(response: BaseResponse<T> | T): T => {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    response.data !== undefined
  ) {
    return response.data as T;
  }

  if (
    response &&
    typeof response === "object" &&
    "result" in response &&
    response.result !== undefined
  ) {
    return response.result as T;
  }

  return response as T;
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const saveTokens = ({ accessToken, refreshToken }: TokenResponse) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

const refreshTokens = async (): Promise<TokenResponse> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없습니다.");
  }

  const response = await axios.post<BaseResponse<TokenResponse>>(
    `${BASE_URL}/api/auth/refresh`,
    {
      refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const nextTokens = unwrapBaseResponse<TokenResponse>(response.data);

  if (!nextTokens.accessToken || !nextTokens.refreshToken) {
    throw new Error("재발급된 토큰이 올바르지 않습니다.");
  }

  saveTokens(nextTokens);

  return nextTokens;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | CustomInternalAxiosRequestConfig
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (!getRefreshToken()) {
      clearTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokens().finally(() => {
          refreshPromise = null;
        });
      }

      const nextTokens = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${nextTokens.accessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      clearTokens();

      return Promise.reject(refreshError);
    }
  },
);
