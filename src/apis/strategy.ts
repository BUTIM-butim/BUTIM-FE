import { axiosInstance } from './axiosInstance';
import type {
  StrategyRunRequest,
  StrategyRunResponse,
  StrategyConfirmRequest,
  StrategyMeResponse,
  CashflowResponse,
  CashflowRecalculateRequest,
  StrategyContext,
} from '../types/strategy';

type BaseResponse<T> = {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
};

const STRATEGY_CONTEXT_KEY = 'butim-strategy-context';

export const getStrategyContext = (): StrategyContext | null => {
  const raw = localStorage.getItem(STRATEGY_CONTEXT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StrategyContext;
  } catch {
    return null;
  }
};

export const strategyApi = {
  async run(request: StrategyRunRequest): Promise<StrategyRunResponse> {
    const res = await axiosInstance.post<BaseResponse<StrategyRunResponse>>(
      '/api/strategies',
      request,
    );
    return res.data.result;
  },

  async getMe(userId: number): Promise<StrategyMeResponse> {
    const res = await axiosInstance.get<BaseResponse<StrategyMeResponse>>(
      '/api/strategies/me',
      { params: { userId } },
    );
    return res.data.result;
  },

  async confirm(request: StrategyConfirmRequest): Promise<StrategyMeResponse> {
    const res = await axiosInstance.patch<BaseResponse<StrategyMeResponse>>(
      '/api/strategies/me/confirm',
      request,
    );
    return res.data.result;
  },

  async getCashflow(userId: number): Promise<CashflowResponse> {
    const res = await axiosInstance.get<BaseResponse<CashflowResponse>>(
      '/api/strategies/me/cashflow',
      { params: { userId } },
    );
    return res.data.result;
  },

  async recalculateCashflow(
    request: CashflowRecalculateRequest,
  ): Promise<CashflowResponse> {
    const res = await axiosInstance.post<BaseResponse<CashflowResponse>>(
      '/api/strategies/me/cashflow/recalculate',
      request,
    );
    return res.data.result;
  },
};
