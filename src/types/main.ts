export type PreviewCardTone = "blue" | "green";

export type PreviewCardStatus = "locked" | "completed";

export type MainResult = {
  predictionMinDays: number;
  predictionMaxDays: number;
  predictionMedianDays: number;
  actualExpectedDays: number;
  paymentExpectedDays: number;
  hasSupportItems: boolean;
  hasLoanItems: boolean;
};

export type MainResultResponse = {
  code: number;
  message: string;
  result: MainResult | null;
  success: boolean;
  isSuccess: boolean;
};
