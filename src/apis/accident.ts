import { axiosInstance } from './axiosInstance';
import type { Industry, Job, DiagnosisCode } from '../types/accident';

type BaseResponse<T> = {
  isSuccess: boolean;
  success: boolean;
  code: number;
  message: string;
  result: T;
};

export const accidentApi = {
  async getMe(): Promise<{ id: number } | null> {
    try {
      const res = await axiosInstance.get<BaseResponse<{ id: number }>>(
        '/api/accident-info/me',
      );
      return res.data.result;
    } catch {
      return null;
    }
  },

  async getIndustries(): Promise<Industry[]> {
    const res = await axiosInstance.get<BaseResponse<Industry[]>>(
      '/api/industries',
    );
    return res.data.result;
  },

  async getJobs(): Promise<Job[]> {
    const res = await axiosInstance.get<BaseResponse<Job[]>>(
      '/api/jobs',
    );
    return res.data.result;
  },

  async suggestDiagnosisCodes(keyword: string): Promise<DiagnosisCode[]> {
    const res = await axiosInstance.post<BaseResponse<DiagnosisCode[]>>(
      '/api/diagnosis-codes/suggest', { keyword });
    return res.data.result;
  },

  async submit(payload: {
    age: number;
    gender: string;
    accidentDate: string;
    diagnosisCodeId: number | null;
    industryId: number;
    jobId: number;
    businessSize: string;
    employmentType: string;
    additionalInfo: string;
  }): Promise<{ accidentInfoId: number }> {
    const res = await axiosInstance.post<BaseResponse<{ accidentInfoId: number }>>(
      '/api/accident-info', payload);
    return res.data.result;
  },
};
