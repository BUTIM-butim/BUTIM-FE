import { axiosInstance } from "./axiosInstance";
import type { LoginRequest, LoginResponse, SignupRequest } from "../types/auth";

type BaseResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const postLogin = async (data: LoginRequest) => {
  const response = await axiosInstance.post<BaseResponse<LoginResponse>>(
    "/api/auth/login",
    data,
  );

  return response.data.data;
};

export const postSignup = async (data: SignupRequest) => {
  const response = await axiosInstance.post<BaseResponse<string>>(
    "/api/auth/signup",
    data,
  );

  return response.data;
};
