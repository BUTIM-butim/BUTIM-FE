import { useState } from 'react';
import Button from '../common/button/Button';

export type ApplyOption = {
  itemId: number;
  label: string;
};

type SelectionKey = 'appliedItemIds' | 'receivedItemIds';

type FormData = {
  appliedItemIds: number[];
  receivedItemIds: number[];
  hospitalCost: string;
  insuranceAmount: string;
  currentAssets: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const removeComma = (value: string) => value.replaceAll(',', '').trim();

const isNumberText = (value: string) => {
  const raw = removeComma(value);
  return raw !== '' && !Number.isNaN(Number(raw));
};

function RadioOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[37px] w-[260px] items-center gap-[8px] rounded-[6px] border-[1.2px] bg-white px-[16px] ${
        selected ? 'border-button-blue' : 'border-line-gray'
      }`}
    >
      <span
        className={`h-[12px] w-[12px] rounded-full border-[1.2px] ${
          selected ? 'border-button-blue bg-button-blue' : 'border-placeholder-gray'
        }`}
      />
      <span className="typo-warning-text text-text-gray">{label}</span>
    </button>
  );
}

function MoneyInput({
  label,
  caption,
  value,
  error,
  onChange,
}: {
  label: string;
  caption: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <p className="typo-popup-button text-text-black">{label}</p>
      <p className="mt-[4px] text-[12px] font-normal leading-[15px] tracking-[-0.02em] text-placeholder-gray">
        {caption}
      </p>

      <div className="relative mt-[12px]">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="1,000,000"
          className={`h-[37px] w-[547px] rounded-[6px] border-[1.2px] bg-white px-[14px] pr-[38px] typo-warning-text text-text-black outline-none placeholder:text-placeholder-gray ${
            error ? 'border-warning-red' : 'border-line-gray'
          }`}
        />

        <span className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2 typo-warning-text text-text-gray">
          원
        </span>
      </div>

      {error && (
        <p className="mt-[8px] typo-warning-text text-warning-red">
          ⓘ {error}
        </p>
      )}
    </div>
  );
}

export type RecalculatePayload = {
  appliedItemIds: number[];
  receivedItemIds: number[];
  hospitalCost?: number;
  insuranceAmount?: number;
  currentAsset?: number;
};

type StrategyApplyCardProps = {
  options: ApplyOption[];
  strategyTitle: string;
  submitting?: boolean;
  submitError?: string | null;
  onSubmit: (payload: RecalculatePayload) => void;
};

export default function StrategyApplyCard({
  options,
  strategyTitle,
  submitting = false,
  submitError = null,
  onSubmit,
}: StrategyApplyCardProps) {
  const [form, setForm] = useState<FormData>({
    appliedItemIds: [],
    receivedItemIds: [],
    hospitalCost: '',
    insuranceAmount: '',
    currentAssets: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const toggleOption = (key: SelectionKey, itemId: number) => {
    setErrors({});

    setForm((prev) => {
      const current = prev[key];
      const next = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];

      return {
        ...prev,
        [key]: next,
      };
    });
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (form.hospitalCost && !isNumberText(form.hospitalCost)) {
      nextErrors.hospitalCost = '병원비는 숫자로 입력해주세요.';
    }

    if (form.insuranceAmount && !isNumberText(form.insuranceAmount)) {
      nextErrors.insuranceAmount = '보험금은 숫자로 입력해주세요.';
    }

    if (form.currentAssets && !isNumberText(form.currentAssets)) {
      nextErrors.currentAssets = '현재 자산은 숫자로 입력해주세요.';
    }

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = () => {
    const isValid = validate();

    if (!isValid) return;

    onSubmit({
      appliedItemIds: form.appliedItemIds,
      receivedItemIds: form.receivedItemIds,
      hospitalCost: form.hospitalCost
        ? Number(removeComma(form.hospitalCost))
        : undefined,
      insuranceAmount: form.insuranceAmount
        ? Number(removeComma(form.insuranceAmount))
        : undefined,
      currentAsset: form.currentAssets
        ? Number(removeComma(form.currentAssets))
        : undefined,
    });
  };

  return (
    <div className="w-[801px] rounded-[12px] bg-white px-[32px] pb-[36px] pt-[28px] shadow-card-blue">
      <h2 className="typo-inform-sub-section text-text-black">
        상황이 바뀌었나요?
      </h2>

      <div className="mt-[24px] h-[1px] w-full bg-line-gray opacity-70" />

      <div className="mt-[28px] flex flex-col gap-[32px] pl-[28px]">
        <div>
          <p className="typo-popup-button text-text-black">
            신청한 지원금·저금리 대출
          </p>
          <p className="mt-[4px] text-[12px] leading-[15px] tracking-[-0.02em] text-placeholder-gray">
            {strategyTitle}의 지원금·저금리 대출 중 신청한 항목을 선택해주세요. (복수 선택 가능)
          </p>

          <div className="mt-[12px] grid w-[547px] grid-cols-2 gap-x-[24px] gap-y-[12px]">
            {options.length === 0 && (
              <p className="typo-warning-text text-placeholder-gray">
                선택 가능한 항목이 없습니다.
              </p>
            )}
            {options.map((option) => (
              <RadioOption
                key={option.itemId}
                label={option.label}
                selected={form.appliedItemIds.includes(option.itemId)}
                onClick={() => toggleOption('appliedItemIds', option.itemId)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="typo-popup-button text-text-black">
            지급 받은 지원금·저금리 대출
          </p>
          <p className="mt-[4px] text-[12px] leading-[15px] tracking-[-0.02em] text-placeholder-gray">
            {strategyTitle}의 지원금·저금리 대출 중 지급받은 항목을 선택해주세요. (복수 선택 가능)
          </p>

          <div className="mt-[12px] grid w-[547px] grid-cols-2 gap-x-[24px] gap-y-[12px]">
            {options.length === 0 && (
              <p className="typo-warning-text text-placeholder-gray">
                선택 가능한 항목이 없습니다.
              </p>
            )}
            {options.map((option) => (
              <RadioOption
                key={option.itemId}
                label={option.label}
                selected={form.receivedItemIds.includes(option.itemId)}
                onClick={() => toggleOption('receivedItemIds', option.itemId)}
              />
            ))}
          </div>
        </div>

        <MoneyInput
          label="병원비"
          caption="최근 지출한 병원비가 있다면 입력해주세요."
          value={form.hospitalCost}
          error={errors.hospitalCost}
          onChange={(value) => {
            setForm((prev) => ({ ...prev, hospitalCost: value }));
            setErrors((prev) => ({ ...prev, hospitalCost: undefined }));
          }}
        />

        <MoneyInput
          label="보험금"
          caption="수령한 개인 보험금이 있다면 입력해주세요."
          value={form.insuranceAmount}
          error={errors.insuranceAmount}
          onChange={(value) => {
            setForm((prev) => ({ ...prev, insuranceAmount: value }));
            setErrors((prev) => ({ ...prev, insuranceAmount: undefined }));
          }}
        />

        <MoneyInput
          label="현재 자산"
          caption="현재 자산에 변동이 있다면 입력해주세요."
          value={form.currentAssets}
          error={errors.currentAssets}
          onChange={(value) => {
            setForm((prev) => ({ ...prev, currentAssets: value }));
            setErrors((prev) => ({ ...prev, currentAssets: undefined }));
          }}
        />

        {Object.values(errors).some(Boolean) && (
          <p className="typo-warning-text text-warning-red">
            ⓘ 입력한 값을 다시 확인해주세요.
          </p>
        )}

        {submitError && (
          <p className="typo-warning-text text-warning-red">
            ⓘ {submitError}
          </p>
        )}

        <div className="flex w-[547px] justify-end">
          <Button
            variant="blue"
            size="card"
            className="!h-[37px] !rounded-[6px] !px-[16px] !text-[14px] !font-medium !leading-[17px]"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? '계산 중...' : '전략 다시 계산하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
