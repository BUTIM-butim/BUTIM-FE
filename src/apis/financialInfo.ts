import { axiosInstance } from './axiosInstance';
import type { FinancialInfoPayload, FinancialInfoResponse } from '../types/financial';

type BaseResponse<T> = {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
};

export const financialInfoApi = {
  async get(): Promise<FinancialInfoResponse | null> {
    try {
      const res = await axiosInstance.get<BaseResponse<FinancialInfoResponse>>(
        '/api/financial-info/me',
      );
      return res.data.result;
    } catch (e) {
      if (
        e &&
        typeof e === 'object' &&
        'response' in e &&
        (e as { response?: { status?: number } }).response?.status === 404
      ) {
        return null;
      }
      throw e;
    }
  },

  async save(payload: FinancialInfoPayload): Promise<FinancialInfoResponse> {
    const res = await axiosInstance.post<BaseResponse<FinancialInfoResponse>>(
      '/api/financial-info',
      payload,
    );
    return res.data.result;
  },

  async update(payload: FinancialInfoPayload): Promise<FinancialInfoResponse> {
    const res = await axiosInstance.put<BaseResponse<FinancialInfoResponse>>(
      '/api/financial-info/me',
      payload,
    );
    return res.data.result;
  },
};
