import { Link } from "react-router-dom";
import { NAVBAR_MENUS } from "../../constants/layout";
import type { NavbarProps } from "../../types/layout";
import GoIcon from "../common/icons/GoIcon";
import butimLogo from "../../assets/icons/butim-logo.svg";
import butimLogoText from "../../assets/icons/butim-logo-text.svg";

const cn = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex h-[38px] shrink-0 items-center gap-2 rounded-[10px] px-3 py-1"
      aria-label="버팀 홈"
    >
      <img src={butimLogo} alt="" className="size-[30px] shrink-0" />
      <img src={butimLogoText} alt="" className="h-[22px] w-[38px] shrink-0" />
    </Link>
  );
};

const NotificationIcon = () => {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.25 7.5C14.25 5 12.78 3.1 10.5 2.47V2.25C10.5 1.42 9.83 0.75 9 0.75C8.17 0.75 7.5 1.42 7.5 2.25V2.47C5.22 3.1 3.75 5 3.75 7.5V10.48L2.53 12.52C2.23 13.02 2.59 13.65 3.17 13.65H14.83C15.41 13.65 15.77 13.02 15.47 12.52L14.25 10.48V7.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.1 15.15C7.42 15.82 8.12 16.25 9 16.25C9.88 16.25 10.58 15.82 10.9 15.15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Navbar = ({
  menus = NAVBAR_MENUS,
  activeMenuId = "",
  userName = "홍길동",
  onMenuClick,
  className = "",
  ...props
}: NavbarProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 w-full bg-white shadow-[0_2px_13.4px_1px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-full w-[min(calc(100%-48px),1272px)] items-center justify-between">
        <Logo />

        <nav className="absolute left-1/2 top-[23px] flex -translate-x-1/2 items-start gap-[71px]">
          {menus.map((menu) => {
            const isActive = menu.id === activeMenuId;

            const menuClassName =
              "flex h-7 w-[77px] flex-col items-center gap-[11px] text-center typo-navbar-button";
            const menuContent = (
              <>
                <span
                  className={cn(
                    "w-full",
                    isActive ? "text-navbar-blue" : "text-text-black",
                  )}
                >
                  {menu.label}
                </span>
                {isActive && (
                  <span className="h-[3px] w-full rounded-full bg-button-blue" />
                )}
              </>
            );

            return menu.href ? (
              <Link
                key={menu.id}
                to={menu.href}
                onClick={() => onMenuClick?.(menu)}
                className={menuClassName}
              >
                {menuContent}
              </Link>
            ) : (
              <button
                key={menu.id}
                type="button"
                onClick={() => onMenuClick?.(menu)}
                className={menuClassName}
              >
                {menuContent}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex size-[31px] items-center justify-center rounded-md text-text-black transition-colors hover:bg-hover-gray"
            aria-label="알림"
          >
            <NotificationIcon />
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-text-black transition-colors typo-navbar-button hover:bg-hover-gray"
          >
            <span>{userName}님</span>
            <GoIcon size="small" direction="down" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
