export type AccidentSubStep = 'basic' | 'accident' | 'work' | 'additional';

export type BusinessSizeEnum =
  | 'UNDER_5'
  | 'FROM_5_TO_9'
  | 'FROM_10_TO_29'
  | 'FROM_30_TO_49'
  | 'FROM_50_TO_99'
  | 'FROM_100_TO_299'
  | 'FROM_300_TO_499'
  | 'FROM_500_TO_999'
  | 'OVER_1000';

export type EmploymentTypeEnum =
  | 'REGULAR'
  | 'CONTRACT'
  | 'DAILY'
  | 'SPECIAL'
  | 'UNKNOWN';

export type GenderEnum = 'MALE' | 'FEMALE';

export interface Industry {
  industryId: number;
  industryName: string;
  industryCode: string;
}

export interface Job {
  jobId: number;
  jobName: string;
  jobCode: string;
}

export interface DiagnosisCode {
  id: number;
  code: string;
  name: string;
}

export interface AccidentFormData {
  age: string;
  gender: GenderEnum | '';
  accidentDate: string;
  symptomInput: string;
  diagnosisCodeSelection: string;
  industryId: number | null;
  industryName: string;
  jobId: number | null;
  jobName: string;
  businessSize: BusinessSizeEnum | '';
  employmentType: EmploymentTypeEnum | '';
  additionalInfo: string;
}

export type AccidentFormErrors = Partial<{
  age: boolean;
  gender: boolean;
  accidentDate: boolean;
  symptomInput: boolean;
  diagnosisCodeSelection: boolean;
  industryId: boolean;
  jobId: boolean;
  businessSize: boolean;
  employmentType: boolean;
}>;
