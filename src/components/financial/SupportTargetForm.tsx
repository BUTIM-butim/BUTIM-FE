import { useState } from 'react';
import type { SupportTargetData } from '../../types/financial';
import RegionSelectModal from './RegionSelectModal';

type SupportTargetStep = 'basic' | 'dependent';

type SupportTargetFormProps = {
  data: SupportTargetData;
  step: SupportTargetStep;
  onChange: (data: SupportTargetData) => void;
  errors?: Partial<Record<keyof SupportTargetData, boolean>>;
};

type Option = {
  label: string;
  value: string;
};

const HOUSEHOLD_TYPE_OPTIONS: Option[] = [
  { label: '기초생활수급자', value: 'BASIC_LIVELIHOOD_RECIPIENT' },
  { label: '차상위계층', value: 'NEAR_POVERTY' },
  { label: '해당 없음', value: 'NONE' },
];

const BOOLEAN_OPTIONS = [
  { label: '예', value: true },
  { label: '아니요', value: false },
];

const HAS_DEPENDENT_OPTIONS = [
  { label: '있음', value: true },
  { label: '없음', value: false },
];

const optionBaseClass =
  'flex h-[47px] w-[320px] items-center gap-[8px] rounded-[10px] border-[1.4px] bg-white px-[16px] typo-navbar-button';

const inputBaseClass =
  'h-[47px] w-[671px] rounded-[10px] border-[1.3px] bg-white px-[16px] typo-navbar-button text-text-black outline-none placeholder:text-placeholder-gray';

const RadioIcon = ({ selected }: { selected: boolean }) => {
  return (
    <span
      className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-[1.2px] ${
        selected
          ? 'border-button-blue bg-button-blue'
          : 'border-placeholder-gray'
      }`}
    >
      {selected && (
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 3.5L3.35 5.45L7.25 1.55"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
};

const DownIcon = () => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.75 7.125L9.5 11.875L14.25 7.125"
        stroke="#4E5A6C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

function RegionField({
  regionName,
  error,
  onOpen,
}: {
  regionName: string;
  error?: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="flex w-[671px] flex-col gap-[14px]">
      <p className="typo-popup-button text-text-black">지역</p>

      <button
        type="button"
        onClick={onOpen}
        className={`flex h-[47px] w-[671px] items-center justify-between rounded-[10px] border-[1.3px] bg-white px-[16px] typo-navbar-button ${
          error ? 'border-warning-red' : 'border-line-gray'
        }`}
      >
        <span
          className={regionName ? 'text-text-black' : 'text-placeholder-gray'}
        >
          {regionName || '지역을 선택해주세요.'}
        </span>
        <DownIcon />
      </button>
    </div>
  );
}

function OptionField({
  label,
  options,
  value,
  error,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string;
  error?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex w-[671px] flex-col gap-[14px]">
      <p className="typo-popup-button text-text-black">{label}</p>

      <div className="flex w-[671px] flex-wrap justify-between gap-y-[14px]">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`${optionBaseClass} ${
                error
                  ? 'border-warning-red'
                  : selected
                    ? 'border-button-blue bg-card-background-blue'
                    : 'border-line-gray'
              }`}
            >
              <RadioIcon selected={selected} />
              <span
                className={selected ? 'text-navbar-blue' : 'text-text-gray'}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BooleanOptionField({
  label,
  value,
  error,
  options = BOOLEAN_OPTIONS,
  onChange,
}: {
  label: string;
  value: boolean | null;
  error?: boolean;
  options?: { label: string; value: boolean }[];
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex w-[671px] flex-col gap-[14px]">
      <p className="typo-popup-button text-text-black">{label}</p>

      <div className="flex w-[671px] flex-wrap justify-between gap-y-[14px]">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange(option.value)}
              className={`${optionBaseClass} ${
                error
                  ? 'border-warning-red'
                  : selected
                    ? 'border-button-blue bg-card-background-blue'
                    : 'border-line-gray'
              }`}
            >
              <RadioIcon selected={selected} />
              <span
                className={selected ? 'text-navbar-blue' : 'text-text-gray'}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FullInputField({
  label,
  placeholder,
  value,
  error,
  unit,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  error?: boolean;
  unit?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex w-[671px] flex-col gap-[14px]">
      <p className="typo-popup-button text-text-black">{label}</p>

      <div className="relative w-[671px]">
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBaseClass} ${
            error ? 'border-warning-red' : 'border-line-gray'
          } ${unit ? 'pr-[48px]' : ''}`}
        />

        {unit && (
          <span className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2 typo-navbar-button text-text-gray">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SupportTargetForm({
  data,
  step,
  onChange,
  errors = {},
}: SupportTargetFormProps) {
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);

  const set =
    <K extends keyof SupportTargetData>(key: K) =>
    (value: SupportTargetData[K]) =>
      onChange({ ...data, [key]: value });

  return (
    <>
      <div className="flex w-[736px] flex-col items-center gap-[40px]">
        <div className="flex w-[736px] flex-col gap-[24px]">
          <h2 className="typo-inform-sub-section text-text-black">
            지원 대상 정보
          </h2>
          <div className="h-[1px] w-[736px] bg-line-gray opacity-70" />
        </div>

        <div className="flex w-[671px] flex-col gap-[38px]">
          {step === 'basic' && (
            <>
              <RegionField
                regionName={data.regionName}
                error={errors.regionId}
                onOpen={() => setIsRegionModalOpen(true)}
              />

              <OptionField
                label="복지 대상 유형"
                options={HOUSEHOLD_TYPE_OPTIONS}
                value={data.householdType}
                error={errors.householdType}
                onChange={(value) =>
                  set('householdType')(
                    value as SupportTargetData['householdType'],
                  )
                }
              />

              <BooleanOptionField
                label="임신 여부"
                value={data.isPregnant}
                error={errors.isPregnant}
                onChange={(value) => set('isPregnant')(value)}
              />

              <BooleanOptionField
                label="장애 여부"
                value={data.hasDisability}
                error={errors.hasDisability}
                onChange={(value) => set('hasDisability')(value)}
              />
            </>
          )}

          {step === 'dependent' && (
            <>
              <BooleanOptionField
                label="부양 가족 여부"
                value={data.hasDependent}
                error={errors.hasDependent}
                options={HAS_DEPENDENT_OPTIONS}
                onChange={(value) => set('hasDependent')(value)}
              />

              <BooleanOptionField
                label="자녀 여부"
                value={data.hasChild}
                error={errors.hasChild}
                onChange={(value) =>
                  onChange({
                    ...data,
                    hasChild: value,
                    childCount: value ? data.childCount : '',
                  })
                }
              />

              {data.hasChild && (
                <FullInputField
                  label="자녀 수"
                  placeholder="자녀 수를 입력해주세요."
                  value={data.childCount}
                  error={errors.childCount}
                  unit="명"
                  onChange={(value) => set('childCount')(value)}
                />
              )}
            </>
          )}
        </div>
      </div>

      <RegionSelectModal
        open={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        onConfirm={(region) => {
          onChange({
            ...data,
            regionId: region.regionId,
            regionName: region.regionName,
          });
        }}
      />
    </>
  );
}