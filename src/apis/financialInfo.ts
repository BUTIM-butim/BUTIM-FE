import type { FinancialInfoPayload, FinancialInfoResponse } from '../types/financial';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

type BaseResponse<T> = {
  data: T;
};

const authHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
});

export const financialInfoApi = {
  async get(): Promise<FinancialInfoResponse | null> {
    const res = await fetch(`${BASE_URL}/api/financial-info/me`, {
      headers: authHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('재정정보 조회 실패');
    const body = (await res.json()) as BaseResponse<FinancialInfoResponse>;
    return body.data;
  },

  async save(payload: FinancialInfoPayload): Promise<FinancialInfoResponse> {
    const res = await fetch(`${BASE_URL}/api/financial-info`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('재정정보 저장 실패');
    const body = (await res.json()) as BaseResponse<FinancialInfoResponse>;
    return body.data;
  },

  async update(payload: FinancialInfoPayload): Promise<FinancialInfoResponse> {
    const res = await fetch(`${BASE_URL}/api/financial-info/me`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('재정정보 수정 실패');
    const body = (await res.json()) as BaseResponse<FinancialInfoResponse>;
    return body.data;
  },
};
