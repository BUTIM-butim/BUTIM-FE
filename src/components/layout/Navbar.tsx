import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NAVBAR_MENUS } from "../../constants/layout";
import { ROUTES } from "../../constants/routes";
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
      className="flex h-[38px] shrink-0 cursor-pointer items-center gap-2 rounded-[10px] px-3 py-1"
      aria-label="버팀 홈"
    >
      <img src={butimLogo} alt="" className="size-[30px] shrink-0" />
      <img src={butimLogoText} alt="" className="h-[22px] w-[38px] shrink-0" />
    </Link>
  );
};

type NotificationButtonProps = {
  hasNotification?: boolean;
};

const NotificationButton = ({ hasNotification = false }: NotificationButtonProps) => {
  return (
    <button
      type="button"
      className="group relative flex size-[31px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] text-text-black transition-colors hover:rounded-[8px] hover:text-text-blue"
      aria-label="알림"
    >
      <svg
        className="h-[17px] w-[15px]"
        viewBox="0 0 15 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M11.5 6.75C11.5 4.25 10 2.5 7.5 2.5C5 2.5 3.5 4.25 3.5 6.75V10.35L2.15 12.6C1.88 13.05 2.2 13.62 2.72 13.62H12.28C12.8 13.62 13.12 13.05 12.85 12.6L11.5 10.35V6.75Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.15 15C6.45 15.48 6.9 15.72 7.5 15.72C8.1 15.72 8.55 15.48 8.85 15"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {hasNotification && (
        <span className="absolute left-[18px] top-[8px] size-[5px] rounded-full bg-warning-red" />
      )}
    </button>
  );
};

const Navbar = ({
  menus = NAVBAR_MENUS,
  activeMenuId = "",
  isLoggedIn = false,
  userName = "홍길동",
  hasNotification = false,
  onMenuClick,
  onLogout,
  onWithdraw,
  className = "",
  ...props
}: NavbarProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 w-full bg-white shadow-[0_2px_13.4px_1px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      <div className="relative mx-auto flex h-full w-[calc(100%-240px)] max-w-[1272px] items-center justify-between max-lg:w-[calc(100%-48px)]">
        <Logo />

        <nav className="absolute left-1/2 top-[23px] flex -translate-x-1/2 items-start gap-[71px]">
          {menus.map((menu) => {
            const isActive = menu.id === activeMenuId;

            const menuClassName =
              "group flex h-7 w-[77px] cursor-pointer flex-col items-center gap-[11px] text-center typo-navbar-button";
            const menuContent = (
              <>
                <span
                  className={cn(
                    "w-full transition-colors group-hover:text-navbar-blue",
                    isActive ? "text-navbar-blue" : "text-text-black",
                  )}
                >
                  {menu.label}
                </span>
                <span
                  className={cn(
                    "h-[3px] w-full rounded-full transition-colors group-hover:bg-button-blue",
                    isActive ? "bg-button-blue" : "bg-transparent",
                  )}
                />
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

        {isLoggedIn ? (
          <div ref={userMenuRef} className="flex shrink-0 items-center gap-2">
            <NotificationButton hasNotification={hasNotification} />
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-1 rounded-full px-3 py-1.5 typo-navbar-button",
                isUserMenuOpen ? "text-navbar-blue" : "text-text-black",
              )}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <span>{userName}님</span>
              <GoIcon
                size="small"
                direction={isUserMenuOpen ? "up" : "down"}
                className="shrink-0"
              />
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-[-32px] top-16 flex w-[162px] flex-col items-center gap-1 rounded-b-[10px] bg-white pb-1"
                role="menu"
              >
                <div className="h-px w-full bg-line-gray" />
                <Link
                  to={ROUTES.USER_EDIT}
                  className="flex cursor-pointer items-center justify-center rounded-[6px] px-3 py-1.5 typo-popup-caption text-text-black"
                  role="menuitem"
                >
                  정보 수정
                </Link>
                <div className="h-px w-full bg-line-gray" />
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex cursor-pointer items-center justify-center rounded-[6px] px-3 py-1.5 typo-popup-caption text-text-black"
                  role="menuitem"
                >
                  로그아웃
                </button>
                <div className="h-px w-full bg-line-gray" />
                <button
                  type="button"
                  onClick={onWithdraw}
                  className="flex cursor-pointer items-center justify-center rounded-[6px] px-3 py-1.5 typo-popup-caption text-text-black"
                  role="menuitem"
                >
                  회원 탈퇴
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to={ROUTES.LOGIN}
              className="flex cursor-pointer items-center justify-center rounded-[6px] px-3 py-1.5 typo-navbar-button text-text-black"
            >
              로그인
            </Link>
            <Link
              to={ROUTES.SIGNUP}
              className="flex cursor-pointer items-center justify-center rounded-full bg-button-blue px-3 py-1.5 typo-navbar-button text-white"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
