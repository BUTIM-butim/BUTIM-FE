import { SIDEBAR_SECTIONS } from "../../constants/layout";
import type { SidebarProps } from "../../types/layout";

const cn = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

const StepBadge = ({ step, active }: { step: number; active: boolean }) => {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold leading-none",
        active
          ? "bg-number-gray text-white"
          : "bg-[rgba(156,163,175,0.4)] text-white",
      )}
    >
      {step}
    </span>
  );
};

const ProgressDot = ({ active }: { active: boolean }) => {
  return (
    <span
      className={cn(
        "relative flex size-[21px] shrink-0 items-center justify-center rounded-full",
        active
          ? "bg-[rgba(55,120,227,0.15)]"
          : "bg-[rgba(156,163,175,0.15)]",
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          "size-[11px] rounded-full border",
          active
            ? "border-button-blue bg-button-blue"
            : "border-placeholder-gray bg-[rgba(156,163,175,0.4)]",
        )}
      />
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
            const hasSubItems = Boolean(section.subItems?.length);

            return (
              <div key={section.id} className="flex flex-col gap-[15px]">
                <button
                  type="button"
                  onClick={() => onSectionClick?.(section)}
                  className="flex w-full items-center gap-[15px] px-[18px] text-left"
                >
                  <StepBadge step={section.step} active={isActiveSection} />
                  <span
                    className={cn(
                      isActiveSection
                        ? "typo-sidebar-title-bold text-title-gray"
                        : "typo-sidebar-title text-placeholder-gray",
                    )}
                  >
                    {section.label}
                  </span>
                </button>

                {hasSubItems && (
                  <div className="flex flex-col gap-[10px]">
                    {section.subItems?.map((subItem) => {
                      const isActiveSubItem =
                        isActiveSection && subItem.id === activeSubItemId;

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
                          <ProgressDot active={isActiveSubItem} />
                          <span
                            className={cn(
                              "typo-sidebar-title",
                              isActiveSubItem
                                ? "text-navbar-blue"
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
