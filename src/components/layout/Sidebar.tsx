import { SIDEBAR_SECTIONS } from "../../constants/layout";
import type { SidebarProps } from "../../types/layout";

const cn = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

type StepState = "done" | "active" | "nonActive";
type ProgressState = "done" | "active" | "nonActive";

const StepBadge = ({ step, state }: { step: number; state: StepState }) => {
  const isNonActive = state === "nonActive";

  return (
    <span
      className="relative size-6 shrink-0 overflow-hidden text-white"
      aria-hidden="true"
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 size-[19.5px] rounded-full",
          isNonActive ? "bg-line-gray" : "bg-number-gray",
        )}
      />
      <span className="absolute left-0.5 top-0.5 flex size-[19.5px] items-center justify-center text-[12px] font-semibold leading-none">
        {step}
      </span>
    </span>
  );
};

const ProgressDot = ({ state }: { state: ProgressState }) => {
  const isDone = state === "done";
  const isActive = state === "active";

  return (
    <span className="relative flex size-[21px] shrink-0 items-center justify-center overflow-hidden" aria-hidden="true">
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full border-[1.2px]",
          isActive && "border-button-blue bg-white",
          isDone && "border-number-gray bg-number-gray",
          !isActive && !isDone && "border-line-gray bg-white",
        )}
      >
        {isDone ? (
          <svg
            className="h-[7px] w-[9px]"
            viewBox="0 0 9 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 3.5L3.3 5.8L8 1"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <span
            className={cn(
              "size-3 rounded-full",
              isActive ? "bg-button-blue" : "bg-line-gray",
            )}
          />
        )}
      </span>
    </span>
  );
};

const Divider = () => {
  return <div className="h-px w-full bg-line-gray/40" />;
};

const Sidebar = ({
  sections = SIDEBAR_SECTIONS,
  activeSectionId = "industrial-accident",
  activeSubItemId = "basic",
  onSectionClick,
  onSubItemClick,
  className = "",
  ...props
}: SidebarProps) => {
  const activeSectionIndex = sections.findIndex(
    (section) => section.id === activeSectionId,
  );

  return (
    <aside
      className={cn(
        "min-h-[calc(100vh-64px)] w-[288px] shrink-0 border-r border-[#e5e7eb] bg-card-background-blue shadow-[0_4px_12px_0_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      <nav className="w-full px-[36px] pt-[80px]" aria-label="진행 단계">
        <div className="flex w-full flex-col gap-[15px]">
          {sections.map((section, index) => {
            const isActiveSection = section.id === activeSectionId;
            const isDoneSection = activeSectionIndex !== -1 && index < activeSectionIndex;
            const hasSubItems = Boolean(section.subItems?.length);
            const activeSubItemIndex =
              section.subItems?.findIndex((subItem) => subItem.id === activeSubItemId) ??
              -1;
            const stepState: StepState = isActiveSection
              ? "active"
              : isDoneSection
                ? "done"
                : "nonActive";

            return (
              <div key={section.id} className="flex flex-col gap-[15px]">
                <button
                  type="button"
                  onClick={() => onSectionClick?.(section)}
                  className={cn(
                    "relative flex h-[41px] w-full items-center gap-[15px] px-[18px] text-left",
                    isActiveSection &&
                      !hasSubItems &&
                      "rounded-[2px] border-l-[1.6px] border-text-blue bg-[rgba(55,120,227,0.08)]",
                  )}
                >
                  <StepBadge step={section.step} state={stepState} />
                  <span
                    className={cn(
                      isActiveSection
                        ? "typo-sidebar-title-bold text-title-gray"
                        : isDoneSection
                          ? "typo-sidebar-title text-number-gray"
                          : "typo-sidebar-title text-placeholder-gray",
                    )}
                  >
                    {section.label}
                  </span>
                </button>

                {hasSubItems && (
                  <div className="flex flex-col gap-[15px]">
                    {section.subItems?.map((subItem, subIndex) => {
                      const isActiveSubItem =
                        isActiveSection && subItem.id === activeSubItemId;
                      const isDoneSubItem =
                        isDoneSection ||
                        (isActiveSection &&
                          activeSubItemIndex !== -1 &&
                          subIndex < activeSubItemIndex);
                      const progressState: ProgressState = isActiveSubItem
                        ? "active"
                        : isDoneSubItem
                          ? "done"
                          : "nonActive";

                      return (
                        <button
                          key={subItem.id}
                          type="button"
                          onClick={() => onSubItemClick?.(section, subItem)}
                          className={cn(
                            "relative flex h-9 w-full items-center gap-[15px] rounded-sm pl-[39px] pr-3 text-left",
                            isActiveSubItem &&
                              "border-l-[1.2px] border-text-blue bg-[rgba(55,120,227,0.08)]",
                          )}
                        >
                          <ProgressDot state={progressState} />
                          <span
                            className={cn(
                              "typo-sidebar-title",
                              isActiveSubItem
                                ? "text-navbar-blue"
                                : isDoneSubItem
                                  ? "text-number-gray"
                                  : "text-placeholder-gray",
                            )}
                          >
                            {subItem.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {index < sections.length - 1 && <Divider />}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
