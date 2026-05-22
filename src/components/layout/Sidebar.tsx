import type { FinancialStep } from '../../types/financial';

type MainSectionKey = 'accident' | 'prediction' | 'financial' | 'strategy';

type StepState = 'done' | 'active' | 'blueActive' | 'nonActive';
type SubStepState = 'done' | 'active' | 'nonActive';

type SidebarSubStep = {
  key: string;
  label: string;
};

type SidebarMainStep = {
  key: MainSectionKey;
  number: number;
  label: string;
  subSteps?: SidebarSubStep[];
};

type SidebarProps = {
  currentSection?: MainSectionKey;
  currentStep?: FinancialStep | string;
};

const SIDEBAR_STEPS: SidebarMainStep[] = [
  {
    key: 'accident',
    number: 1,
    label: '산재 정보 작성',
    subSteps: [
      { key: 'basic-info', label: '기본 정보' },
      { key: 'accident-info', label: '사고 정보' },
      { key: 'work-info', label: '근무 정보' },
      { key: 'additional-info', label: '추가 정보' },
    ],
  },
  {
    key: 'prediction',
    number: 2,
    label: '예측 승인 기간',
  },
  {
    key: 'financial',
    number: 3,
    label: '재정 정보 작성',
    subSteps: [
      { key: 'fund-status', label: '자금 상황' },
      { key: 'support-target', label: '지원 대상 정보' },
    ],
  },
  {
    key: 'strategy',
    number: 4,
    label: '맞춤 전략 추천',
  },
];

const getMainState = (
  stepKey: MainSectionKey,
  currentSection: MainSectionKey,
): StepState => {
  const currentIndex = SIDEBAR_STEPS.findIndex((step) => step.key === currentSection);
  const stepIndex = SIDEBAR_STEPS.findIndex((step) => step.key === stepKey);

  if (stepIndex < currentIndex) return 'done';

  if (stepKey === currentSection) {
    const hasSubSteps = SIDEBAR_STEPS[stepIndex].subSteps?.length;
    return hasSubSteps ? 'active' : 'blueActive';
  }

  return 'nonActive';
};

const getSubState = (
  subKey: string,
  subIndex: number,
  currentStep?: string,
  currentSubSteps?: SidebarSubStep[],
): SubStepState => {
  const currentIndex = currentSubSteps?.findIndex((step) => step.key === currentStep) ?? -1;

  if (subKey === currentStep) return 'active';
  if (currentIndex !== -1 && subIndex < currentIndex) return 'done';

  return 'nonActive';
};

const CheckIcon = ({ size = 24 }: { size?: 21 | 24 }) => {
  const isMain = size === 24;

  return (
    <svg
      width={isMain ? 11 : 9}
      height={isMain ? 9 : 7}
      viewBox={isMain ? '0 0 11 9' : '0 0 9 7'}
      fill="none"
      aria-hidden
    >
      <path
        d={isMain ? 'M1 4.5L3.75 7.25L9.5 1' : 'M1 3.5L3.3 5.8L8 1'}
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const NumberCircle = ({
  number,
  state,
}: {
  number: number;
  state: StepState;
}) => {
  if (state === 'done') {
    return (
      <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#4E5A6C]">
        <CheckIcon size={24} />
      </span>
    );
  }

  if (state === 'blueActive') {
    return <ProgressDot state="active" size={24} />;
  }

  const color = state === 'active' ? '#4E5A6C' : '#C7CED9';

  return (
    <span className="relative flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full">
      <span
        className="flex h-[19.5px] w-[19.5px] items-center justify-center rounded-full text-[12px] font-semibold leading-none text-white"
        style={{ backgroundColor: color }}
      >
        {number}
      </span>
    </span>
  );
};

const ProgressDot = ({
  state,
  size = 21,
}: {
  state: SubStepState | 'active';
  size?: 21 | 24;
}) => {
  const isDone = state === 'done';
  const isActive = state === 'active';

  const color = isActive ? '#3778E3' : isDone ? '#4E5A6C' : '#C7CED9';

  return (
    <span
      className="relative flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <span
        className="flex items-center justify-center rounded-full border-[1.2px]"
        style={{
          width: size === 24 ? 18.35 : 16.06,
          height: size === 24 ? 18.35 : 16.06,
          borderColor: color,
          backgroundColor: isDone ? color : 'transparent',
        }}
      >
        {isDone ? (
          <CheckIcon size={21} />
        ) : (
          <span
            className="rounded-full border-[1.2px]"
            style={{
              width: size === 24 ? 13.7 : 12,
              height: size === 24 ? 13.7 : 12,
              backgroundColor: color,
              borderColor: color,
            }}
          />
        )}
      </span>
    </span>
  );
};

const Divider = () => (
  <div className="h-px w-[195px] shrink-0 bg-[#C7CED9] opacity-50" />
);

const MainStepRow = ({
  number,
  label,
  state,
}: {
  number: number;
  label: string;
  state: StepState;
}) => {
  const isBlueActive = state === 'blueActive';

  const textClassName =
    state === 'blueActive'
      ? 'text-[#185DC5] text-[18px] leading-[230%]'
      : state === 'active'
        ? 'text-[#475161] text-[18px] leading-[230%]'
        : state === 'done'
          ? 'text-[#4E5A6C] text-[16px] leading-[230%]'
          : 'text-[#9CA3AF] text-[16px] leading-[230%]';

  return (
    <div className="relative flex h-[41px] w-[195px] shrink-0 items-center px-[21px]">
      {isBlueActive && (
        <div className="absolute left-[6px] top-0 h-[41px] w-[189px] rounded-[2px] border-l-[1.6px] border-[#1866DC] bg-[#3778E3]/[0.08]" />
      )}

      <div className="relative z-10 flex h-full items-center gap-[15px]">
        <NumberCircle number={number} state={state} />
        <span
          className={`flex items-center whitespace-nowrap font-medium tracking-[-0.02em] ${textClassName}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

const SubStepRow = ({
  label,
  state,
}: {
  label: string;
  state: SubStepState;
}) => {
  const isActive = state === 'active';

  const textClassName =
    state === 'active'
      ? 'text-[#185DC5]'
      : state === 'done'
        ? 'text-[#4E5A6C]'
        : 'text-[#9CA3AF]';

  return (
    <div className="relative flex h-[37px] w-[195px] shrink-0 items-center px-[39px]">
      {isActive && (
        <div className="absolute left-[24px] top-0 h-[36px] w-[171px] rounded-[2px] border-l-[1.2px] border-[#1866DC] bg-[#3778E3]/[0.08]" />
      )}

      <div className="relative z-10 flex h-full items-center gap-[15px]">
        <ProgressDot state={state} size={21} />
        <span
          className={`flex items-center whitespace-nowrap text-[16px] font-medium leading-[230%] tracking-[-0.02em] ${textClassName}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default function Sidebar({
  currentSection = 'financial',
  currentStep = 'fund-status',
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-[288px] border-r border-[#E5E7EB] bg-[#F2F6FE] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <nav className="pt-[130px]">
        <div className="mx-auto flex w-[195px] flex-col items-start gap-[15px]">
          {SIDEBAR_STEPS.map((step, index) => {
            const mainState = getMainState(step.key, currentSection);
            const isCurrentSection = step.key === currentSection;
            const shouldShowSubSteps = isCurrentSection && step.subSteps?.length;

            return (
              <div key={step.key} className="contents">
                <div className="flex w-[195px] flex-col items-start gap-[15px]">
                  <MainStepRow
                    number={step.number}
                    label={step.label}
                    state={mainState}
                  />

                  {shouldShowSubSteps && (
                    <div className="flex w-[195px] flex-col items-start gap-[15px]">
                      {step.subSteps?.map((subStep, subIndex) => (
                        <SubStepRow
                          key={subStep.key}
                          label={subStep.label}
                          state={getSubState(
                            subStep.key,
                            subIndex,
                            currentStep,
                            step.subSteps,
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {index < SIDEBAR_STEPS.length - 1 && <Divider />}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}