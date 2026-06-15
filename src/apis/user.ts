import { axiosInstance } from "./axiosInstance";

type BaseResponse<T> = {
  code?: number;
  message?: string;
  result?: T;
  data?: T;
  success?: boolean;
  isSuccess?: boolean;
};

export type UserMeResponse = {
  name: string;
  email: string;
  phoneNumber: string;
  termsAgreed?: boolean;
  pushAlarmAgreed?: boolean;
};

export type UpdateUserRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  termsAgreed: boolean;
  pushAlarmAgreed: boolean;
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

export const getUserMe = async (): Promise<UserMeResponse> => {
  const response =
    await axiosInstance.get<BaseResponse<UserMeResponse>>("/api/user/me");

  return unwrapBaseResponse<UserMeResponse>(response.data);
};

export const patchUserMe = async (data: UpdateUserRequest): Promise<string> => {
  const response = await axiosInstance.patch<BaseResponse<string>>(
    "/api/user/me",
    data,
  );

  return unwrapBaseResponse<string>(response.data);
};
