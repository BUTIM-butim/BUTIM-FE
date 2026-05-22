const BellIcon = () => (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.5 8.75C12.74 8.75 10.5 10.99 10.5 13.75V18.25L9.1 19.65C8.7 20.05 8.98 20.75 9.55 20.75H21.45C22.02 20.75 22.3 20.05 21.9 19.65L20.5 18.25V13.75C20.5 10.99 18.26 8.75 15.5 8.75Z"
      stroke="#1F2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 22.25C13.83 23.02 14.59 23.5 15.5 23.5C16.41 23.5 17.17 23.02 17.5 22.25"
      stroke="#1F2937"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15.5 7.06V6.25"
      stroke="#1F2937"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 5.5L7 8.5L10 5.5"
      stroke="#1F2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type NavItemProps = {
  label: string;
  active?: boolean;
};

const NavItem = ({ label, active = false }: NavItemProps) => (
  <button
    type="button"
    className="flex h-[28px] w-[77px] flex-col items-center gap-[11px]"
  >
    <span
      className={`w-[77px] text-center text-[16px] font-medium leading-[19px] tracking-[-0.02em] ${
        active ? 'text-[#1866DC]' : 'text-[#1F2937]'
      }`}
    >
      {label}
    </span>

    {active && (
      <span className="h-0 w-[77px] border-t-[3px] border-[#3778E3]" />
    )}
  </button>
);

const LogoIcon = () => (
  <div className="h-[30px] w-[30px] shrink-0 rounded-full logo-gradient" />
);

const LogoText = () => (
  <span className="text-[22px] font-bold leading-[30px] tracking-[-0.04em] text-[#1F2937]">
    버팀
  </span>
);

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[64px] bg-white shadow-[0_2px_13.4px_1px_rgba(0,0,0,0.04)]">
      <div className="relative mx-auto h-full w-full max-w-[1512px]">
        {/* Logo */}
        <div className="absolute left-[120px] top-1/2 flex h-[38px] -translate-y-1/2 items-center gap-[8px] rounded-[10px] px-[12px] py-[4px]">
          <LogoIcon />
          <LogoText />
        </div>

        {/* Center Nav */}
        <nav className="absolute left-1/2 top-[23px] flex h-[28px] w-[373px] -translate-x-1/2 items-start gap-[71px]">
          <NavItem label="정보 입력" active />
          <NavItem label="예상 기간" />
          <NavItem label="맞춤 전략" />
        </nav>

        {/* Right Area */}
        <div className="absolute right-[120px] top-1/2 flex h-[31px] -translate-y-1/2 items-center gap-[8px]">
          <button
            type="button"
            aria-label="알림"
            className="flex h-[31px] w-[31px] items-center justify-center rounded-[6px]"
          >
            <BellIcon />
          </button>

          <button
            type="button"
            className="flex h-[31px] items-center justify-center gap-[4px] rounded-full px-[12px] py-[6px]"
          >
            <span className="text-center text-[16px] font-medium leading-[19px] tracking-[-0.02em] text-[#1F2937]">
              홍길동님
            </span>
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </header>
  );
}