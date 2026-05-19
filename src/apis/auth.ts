import { axiosInstance } from "./axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth";

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
