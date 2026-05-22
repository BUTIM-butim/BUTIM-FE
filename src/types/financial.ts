export type FinancialStep = 'fund-status' | 'support-target';

export type IncomeLevelEnum =
  | 'BELOW_32'
  | 'OVER_32_TO_40'
  | 'OVER_40_TO_48'
  | 'OVER_48_TO_50'
  | 'OVER_50_TO_100'
  | 'OVER_100_TO_120'
  | 'OVER_120_TO_150'
  | 'OVER_150'
  | 'UNKNOWN';

export type EmploymentStatusEnum =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'FREELANCER'
  | 'SELF_EMPLOYED'
  | 'UNEMPLOYED'
  | 'ETC';

export type HouseholdTypeEnum = 'BASIC_LIVELIHOOD_RECIPIENT' | 'NEAR_POVERTY' | 'NONE';

// Step 1 폼 상태 (입력값은 string으로 관리)
export type FundStatusData = {
  currentAssets: string;
  monthlyFixedExpense: string;
  incomeLevel: IncomeLevelEnum | '';
  currentEmploymentStatus: EmploymentStatusEnum | '';
};

// Step 2 폼 상태
export type SupportTargetData = {
  regionId: string;
  householdType: HouseholdTypeEnum | '';
  hasDependent: boolean | null;
  hasChild: boolean | null;
  childCount: string;
  isPregnant: boolean | null;
  hasDisability: boolean | null;
  disabilityGrade: string;
};

// 백엔드 API 요청 바디
export type FinancialInfoPayload = {
  accidentInfoId: number;
  regionId: number;
  currentAssets: number;
  monthlyFixedExpense: number;
  incomeLevel: IncomeLevelEnum;
  householdType: HouseholdTypeEnum;
  hasDependent: boolean;
  hasChild: boolean;
  childCount?: number;
  isPregnant: boolean;
  hasDisability: boolean;
  disabilityGrade?: number;
  currentEmploymentStatus: EmploymentStatusEnum;
};

// 백엔드 API 응답 바디
export type FinancialInfoResponse = {
  id: number;
  userId: number;
  accidentInfoId: number;
  regionId: number;
  regionName: string;
  currentAssets: number;
  monthlyFixedExpense: number;
  incomeLevel: IncomeLevelEnum;
  householdType: HouseholdTypeEnum;
  hasDependent: boolean;
  hasChild: boolean;
  childCount?: number;
  isPregnant: boolean;
  hasDisability: boolean;
  disabilityGrade?: number;
  currentEmploymentStatus: EmploymentStatusEnum;
};
