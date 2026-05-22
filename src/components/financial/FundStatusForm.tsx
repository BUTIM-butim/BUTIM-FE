import type { FundStatusData } from '../../types/financial';
import InformationLongRightInput from '../common/input/InformationLongRightInput';
import InformationOptionField from '../common/option/InformationOptionField';
import { MEDIAN_INCOME_OPTIONS, EMPLOYMENT_STATUS_OPTIONS } from '../../constants/financialOptions';

type FundStatusFormProps = {
  data: FundStatusData;
  onChange: (data: FundStatusData) => void;
};

export default function FundStatusForm({ data, onChange }: FundStatusFormProps) {
  const set =
    <K extends keyof FundStatusData>(key: K) =>
    (value: FundStatusData[K]) =>
      onChange({ ...data, [key]: value });

  return (
    <div>
      <h2 className="typo-inform-sub-section text-text-black">자금 상황</h2>
      <div className="mb-[36px] mt-[20px] h-[1px] bg-line-gray" />

      <div className="flex flex-col gap-[36px]">
        <InformationLongRightInput
          id="currentAssets"
          label="현재 자산"
          caption="예금·적금 등을 제외한 현재 보유 중인 현금 자산을 입력해주세요."
          measure="원"
          placeholder="1,000,000"
          value={data.currentAssets}
          onChange={(e) => set('currentAssets')(e.target.value)}
        />

        <InformationLongRightInput
          id="monthlyFixedExpense"
          label="월 고정비"
          caption="한 달에 대략적으로 지출되는 금액을 입력해주세요. (월세, 공과금, 생활비 등)"
          measure="원"
          placeholder="300,000"
          value={data.monthlyFixedExpense}
          onChange={(e) => set('monthlyFixedExpense')(e.target.value)}
        />

        <InformationOptionField
          label="기준 중위소득"
          options={MEDIAN_INCOME_OPTIONS}
          value={data.incomeLevel}
          onChange={(v) => set('incomeLevel')(v as FundStatusData['incomeLevel'])}
        />

        <InformationOptionField
          label="현재 고용 상태"
          options={EMPLOYMENT_STATUS_OPTIONS}
          value={data.currentEmploymentStatus}
          onChange={(v) =>
            set('currentEmploymentStatus')(v as FundStatusData['currentEmploymentStatus'])
          }
        />
      </div>
    </div>
  );
}
