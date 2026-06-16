import { axiosInstance } from './axiosInstance';

type BaseResponse<T> = {
  isSuccess: boolean;
  success: boolean;
  code: number;
  message: string;
  result: T;
};

export interface PredictionResult {
  id: number;
  analysisReasons: string[];
  createdAt: string;
  paymentDays: number;
  predictionMaxDays: number;
  predictionMedianDays: number;
  predictionMinDays: number;
  reliability: string;
  reliabilityScore: number;
  similarCaseCount: number;
  updatedAt: string;
}

export const periodApi = {
  // 기존 예측 결과 조회 (없으면 null 반환)
  async getExisting(): Promise<PredictionResult | null> {
    try {
      const res = await axiosInstance.get<BaseResponse<PredictionResult>>(
        '/api/predictions/me',
      );
      return res.data.result;
    } catch (e: unknown) {
      const status = (e as { response?: { status?: number } })?.response?.status;
      if (status === 404) return null;
      throw e;
    }
  },

  // 새 예측 실행
  async predict(): Promise<PredictionResult> {
    const res = await axiosInstance.post<BaseResponse<PredictionResult>>(
      '/api/predictions',
    );
    return res.data.result;
  },
};
