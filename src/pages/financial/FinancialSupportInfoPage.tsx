import { useState } from 'react';

type RadioOptionProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

type FormSectionProps = {
  label: string;
  children: React.ReactNode;
};

const ChevronDownIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.75 7.125L9.5 11.875L14.25 7.125"
      stroke="#4E5A6C"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.2 2.8L7.8 6.4L4.2 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.8 2.8L4.2 6.4L7.8 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RadioCircle = ({ selected = false }: { selected?: boolean }) => (
  <span
    className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-[1.2px] ${
      selected ? 'border-button-blue' : 'border-placeholder-gray'
    }`}
  >
    {selected && <span className="h-[9px] w-[9px] rounded-full bg-button-blue" />}
  </span>
);

const RadioOption = ({ label, selected = false, onClick }: RadioOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-[47px] w-[320px] items-center gap-[8px] rounded-[10px] border-[1.4px] px-[16px] text-left ${
      selected
        ? 'border-button-blue bg-white text-navbar-blue'
        : 'border-line-gray bg-white text-text-gray'
    }`}
  >
    <RadioCircle selected={selected} />
    <span className="typo-navbar-button">{label}</span>
  </button>
);

const FormSection = ({ label, children }: FormSectionProps) => (
  <section className="flex w-[671px] flex-col gap-[14px]">
    <label className="text-[18px] font-semibold leading-[21px] text-text-black">
      {label}
    </label>
    {children}
  </section>
);

export default function FinancialSupportInfoPage() {
  const [welfareType, setWelfareType] = useState<string>('');
  const [pregnant, setPregnant] = useState<string>('');
  const [disabled, setDisabled] = useState<string>('');

  return (
    <main className="relative min-h-screen bg-background-blue pt-[143px]">
      {/* 오른쪽 연한 로고 배경 */}
      <div className="pointer-events-none absolute right-[-78px] top-[230px] h-[637px] w-[704px] rotate-[-11.3deg] opacity-[0.03]">
        <div className="h-full w-full rounded-full logo-gradient" />
      </div>

      {/* Header, Sidebar는 기존 고정 컴포넌트에서 렌더링한다고 가정 */}

      <section className="relative ml-[288px] min-h-[1130px] w-[1224px]">
        <div className="absolute left-[125px] top-[111px] flex w-[801px] flex-col gap-[56px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className="text-[28px] font-bold leading-[33px] tracking-[-0.04em] text-text-black">
              재정 정보 작성
            </h1>
            <p className="text-[16px] font-light leading-[160%] tracking-[-0.02em] text-title-gray">
              입력하신 정보를 바탕으로 맞춤 전략을 안내해드립니다.
            </p>
          </div>

          <div className="flex h-[686px] w-[800.5px] flex-col rounded-[12px] bg-white px-[32px] py-[40px] shadow-[0_4px_24px_rgba(69,143,213,0.08)]">
            <div className="flex w-[736px] flex-col items-center gap-[40px]">
              <div className="flex w-full flex-col gap-[24px]">
                <h2 className="text-[24px] font-semibold leading-[29px] tracking-[-0.02em] text-text-black">
                  지원 대상 정보
                </h2>
                <div className="h-px w-full bg-line-gray opacity-70" />
              </div>

              <div className="flex w-[671px] flex-col gap-[38px]">
                <FormSection label="지역">
                  <button
                    type="button"
                    className="flex h-[47px] w-[671px] items-center justify-between rounded-[10px] border-[1.3px] border-line-gray bg-white px-[16px]"
                  >
                    <span className="typo-navbar-button text-text-black">
                      서울특별시 강남구
                    </span>
                    <ChevronDownIcon />
                  </button>
                </FormSection>

                <FormSection label="복지 대상 유형">
                  <div className="flex w-[671px] flex-wrap justify-between gap-y-[14px]">
                    <RadioOption
                      label="기초생활수급자"
                      selected={welfareType === 'basic'}
                      onClick={() => setWelfareType('basic')}
                    />
                    <RadioOption
                      label="차상위계층"
                      selected={welfareType === 'near-poverty'}
                      onClick={() => setWelfareType('near-poverty')}
                    />
                    <RadioOption
                      label="해당 없음"
                      selected={welfareType === 'none'}
                      onClick={() => setWelfareType('none')}
                    />
                  </div>
                </FormSection>

                <FormSection label="임신 여부">
                  <div className="flex w-[671px] flex-wrap justify-between gap-y-[14px]">
                    <RadioOption
                      label="예"
                      selected={pregnant === 'yes'}
                      onClick={() => setPregnant('yes')}
                    />
                    <RadioOption
                      label="아니요"
                      selected={pregnant === 'no'}
                      onClick={() => setPregnant('no')}
                    />
                  </div>
                </FormSection>

                <FormSection label="장애 여부">
                  <div className="flex w-[671px] flex-wrap justify-between gap-y-[14px]">
                    <RadioOption
                      label="예"
                      selected={disabled === 'yes'}
                      onClick={() => setDisabled('yes')}
                    />
                    <RadioOption
                      label="아니요"
                      selected={disabled === 'no'}
                      onClick={() => setDisabled('no')}
                    />
                  </div>
                </FormSection>
              </div>
            </div>
          </div>

          <div className="flex h-[43px] w-[801px] items-start justify-between">
            <button
              type="button"
              className="flex h-[43px] w-[110px] items-center justify-center gap-[6px] rounded-[10px] bg-button-background-gray px-[16px] text-[16px] font-medium leading-[19px] text-button-gray"
            >
              <ArrowLeftIcon />
              이전 단계
            </button>

            <button
              type="button"
              className="flex h-[43px] w-[110px] items-center justify-center gap-[6px] rounded-[10px] bg-button-blue px-[16px] text-[16px] font-medium leading-[19px] text-white"
            >
              다음 단계
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}