import type { SidebarProps, SidebarSectionId, SidebarSubSectionId, SidebarStepStatus } from '../../types/sidebar';
import { SIDEBAR_SECTIONS } from '../../constants/sidebar';

type SubStepState = Exclude<SidebarStepStatus, 'blueActive'>;

const getMainState = (
  sectionId: SidebarSectionId,
  currentSectionId: SidebarSectionId,
): SidebarStepStatus => {
  const currentIndex = SIDEBAR_SECTIONS.findIndex((s) => s.id === currentSectionId);
  const sectionIndex = SIDEBAR_SECTIONS.findIndex((s) => s.id === sectionId);

  if (sectionIndex < currentIndex) return 'done';

  if (sectionId === currentSectionId) {
    return SIDEBAR_SECTIONS[sectionIndex].subSections.length > 0 ? 'active' : 'blueActive';
  }

  return 'nonActive';
};

const getSubState = (
  subId: SidebarSubSectionId,
  subIndex: number,
  currentSubSectionId?: SidebarSubSectionId,
  subSections?: { id: SidebarSubSectionId; title: string }[],
): SubStepState => {
  const currentIndex = subSections?.findIndex((s) => s.id === currentSubSectionId) ?? -1;

  if (subId === currentSubSectionId) return 'active';
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
  state: SidebarStepStatus;
}) => {
  if (state === 'done') {
    return (
      <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
        <span className="flex h-[18.35px] w-[18.35px] shrink-0 items-center justify-center rounded-full bg-[#4E5A6C]">
          <CheckIcon size={21} />
        </span>
      </span>
    );
  }

  if (state === 'blueActive') {
    return <ProgressDot state="active" size={21} />;
  }

  const bgColor = state === 'active' ? '#4E5A6C' : '#C7CED9';

  return (
    <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
      <span
        className="flex h-[19.5px] w-[19.5px] items-center justify-center rounded-full text-[12px] font-semibold leading-none text-white"
        style={{ backgroundColor: bgColor }}
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
      style={{ width: size, height: size }}
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
  state: SidebarStepStatus;
}) => {
  const isBlueActive = state === 'blueActive';
  const isLargeFontState = state === 'active' || state === 'blueActive';

  const textClassName =
    state === 'blueActive'
      ? 'text-[#185DC5] text-[18px] leading-[230%]'
      : state === 'active'
        ? 'text-[#475161] text-[18px] leading-[230%]'
        : state === 'done'
          ? 'text-[#4E5A6C] text-[16px] leading-[230%]'
          : 'text-[#9CA3AF] text-[16px] leading-[230%]';

  return (
    <div
      className={`relative flex w-[195px] shrink-0 items-center px-[21px] ${isLargeFontState ? 'h-[41px]' : 'h-[37px]'}`}
    >
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

export default function Sidebar({ currentSectionId, currentSubSectionId }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-[288px] rounded-r-[10px] border-r border-[#E5E7EB] bg-[#F2F6FE] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <nav className="pt-[110px]">
        <div className="ml-[57px] flex w-[195px] flex-col items-start gap-[15px]">
          {SIDEBAR_SECTIONS.map((section, index) => {
            const mainState = getMainState(section.id, currentSectionId);
            const isCurrentSection = section.id === currentSectionId;
            const shouldShowSubSteps = isCurrentSection && section.subSections.length > 0;

            return (
              <div key={section.id} className="contents">
                <div className="flex w-[195px] flex-col items-start gap-[15px]">
                  <MainStepRow
                    number={index + 1}
                    label={section.title}
                    state={mainState}
                  />

                  {shouldShowSubSteps && (
                    <div className="flex w-[195px] flex-col items-start gap-[15px]">
                      {section.subSections.map((subSection, subIndex) => (
                        <SubStepRow
                          key={subSection.id}
                          label={subSection.title}
                          state={getSubState(
                            subSection.id,
                            subIndex,
                            currentSubSectionId,
                            section.subSections,
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {index < SIDEBAR_SECTIONS.length - 1 && <Divider />}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
