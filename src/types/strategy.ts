export type StrategyType = 'STRATEGY_1' | 'STRATEGY_2';

export type StrategyItemType =
  | 'CENTRAL_WELFARE'
  | 'LOCAL_WELFARE'
  | 'MICRO_FINANCE_LOAN';

export type CashflowEventType =
  | 'CURRENT_ASSET'
  | 'CASH_GAP'
  | 'WELFARE_APPLIED'
  | 'WELFARE_RECEIVED'
  | 'LOAN_APPLIED'
  | 'LOAN_RECEIVED'
  | 'HOSPITAL_COST'
  | 'INSURANCE_RECEIVED'
  | 'WORKERS_COMPENSATION_RECEIVED';

export type StrategyItem = {
  itemId: number;
  itemType: StrategyItemType;
  itemName: string;
  itemDescription: string;
  expectedAmount: number;
  repaymentRequired: boolean;
  overlapsWithWorkersCompensation: boolean;
  applyUrl: string | null;
  expectedApplyDate: string | null;
  expectedReceiveDate: string | null;
  aiReason: string | null;
};

export type StrategyCard = {
  strategyType: StrategyType;
  title: string;
  summary: string;
  totalExpectedAmount: number;
  supportItems: StrategyItem[];
  loanItems: StrategyItem[];
};

export type CashflowPoint = {
  snapshotId: number;
  strategyType: StrategyType | null;
  snapshotDate: string;
  dayOffset: number;
  income: number;
  expense: number;
  balance: number;
  eventType: CashflowEventType;
  eventMemo: string | null;
};

export type TimelineItem = {
  date: string;
  dayOffset: number;
  eventType: CashflowEventType;
  eventName: string;
  amount: number;
  balance: number;
};

export type StrategyRunRequest = {
  userId: number;
  accidentInfoId: number;
  financialInfoId: number;
};

export type StrategyRunResponse = {
  strategyResultId: number;
  currentAsset: number;
  cashGapDay: number;
  approvalExpectedDays: number;
  paymentExpectedDays: number;
  strategies: StrategyCard[];
  cashflow: CashflowPoint[];
};

export type StrategyConfirmRequest = {
  userId: number;
  selectedStrategyType: StrategyType;
};

export type StrategyMeResponse = {
  strategyResultId: number;
  confirmed: boolean;
  selectedStrategyType: StrategyType | null;
  currentAsset: number;
  cashGapDay: number;
  approvalExpectedDays: number;
  paymentExpectedDays: number;
  strategies: StrategyCard[];
  selectedStrategy: StrategyCard | null;
  cashflow: CashflowPoint[];
  timeline: TimelineItem[];
};

export type CashflowResponse = {
  strategyResultId: number;
  currentAsset: number;
  cashGapDay: number;
  cashflow: CashflowPoint[];
  timeline: TimelineItem[];
};

export type CashflowRecalculateRequest = {
  userId: number;
  appliedItemIds?: number[];
  receivedItemIds?: number[];
  hospitalCost?: number;
  insuranceAmount?: number;
  currentAsset?: number;
};

export type StrategyContext = {
  userId: number;
  accidentInfoId: number;
  financialInfoId: number;
};
