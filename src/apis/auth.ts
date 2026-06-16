import { axiosInstance } from "./axiosInstance";

import type {
  LoginRequest,
  LoginResponse,
  PhoneSendRequest,
  PhoneSendResponse,
  PhoneVerifyRequest,
  SignupRequest,
} from "../types/auth";

type BaseResponse<T> = {
  code?: number;
  message?: string;
  result?: T;
  data?: T;
  success?: boolean;
  isSuccess?: boolean;
};

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

export const postLogin = async (data: LoginRequest) => {
  const response = await axiosInstance.post<BaseResponse<LoginResponse>>(
    "/api/auth/login",
    data,
  );

  return unwrapBaseResponse<LoginResponse>(response.data);
};

export const postSignup = async (data: SignupRequest) => {
  const response = await axiosInstance.post<BaseResponse<string>>(
    "/api/auth/signup",
    data,
  );

  return unwrapBaseResponse<string>(response.data);
};

export const postPhoneSend = async (data: PhoneSendRequest) => {
  const response = await axiosInstance.post<BaseResponse<PhoneSendResponse>>(
    "/api/auth/phone/send",
    data,
  );

  return unwrapBaseResponse<PhoneSendResponse>(response.data);
};

export const postPhoneVerify = async (data: PhoneVerifyRequest) => {
  const response = await axiosInstance.post<BaseResponse<string>>(
    "/api/auth/phone/verify",
    data,
  );

  return unwrapBaseResponse<string>(response.data);
};

export const postLogout = async (): Promise<void> => {
  await axiosInstance.post("/api/auth/logout");
};

export const deleteWithdraw = async (): Promise<void> => {
  await axiosInstance.delete("/api/auth/withdraw");
};
