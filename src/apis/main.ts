import { axiosInstance } from "./axiosInstance";

import type { MainResult, MainResultResponse } from "../types/main";

export const getMainResult = async (): Promise<MainResult | null> => {
  const response =
    await axiosInstance.get<MainResultResponse>("/api/user/main");

  return response.data.result;
};
