import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoFull from '../../assets/logo-full-login.svg';
import GoIcon from '../common/icons/GoIcon';
import { ROUTES } from '../../constants/routes';

type InputProgress = {
  lastPath?: string;
  financialStep?: string;
  supportTargetStep?: string;
  hasAccidentInfo?: boolean;
  hasFinancialInfo?: boolean;
};

type HeaderProps = {
  isLoggedIn?: boolean;
  userName?: string;
  hasNotification?: boolean;
  onLogout?: () => void;
  onWithdraw?: () => void;
};

type NavItemProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

const INPUT_PROGRESS_STORAGE_KEY = 'butim-input-progress';

const cn = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(' ');
};

const getInputProgress = (): InputProgress | null => {
  const raw = localStorage.getItem(INPUT_PROGRESS_STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as InputProgress;
  } catch {
    return null;
  }
};

const getNextInputPath = () => {
  const progress = getInputProgress();

  if (progress?.lastPath) {
    return progress.lastPath;
  }

  return '/accident';
};

const Logo = () => (
  <img
    src={logoFull}
    alt="버팀"
    className="h-[30px] w-auto shrink-0"
  />
);

const NotificationButton = ({
  hasNotification = false,
}: {
  hasNotification?: boolean;
}) => {
  return (
    <button
      type="button"
      aria-label="알림"
      className="relative flex size-[31px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[6px] text-text-black transition-colors hover:rounded-[8px] hover:text-text-blue"
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

const NavItem = ({ label, active = false, onClick }: NavItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex h-[28px] w-[77px] cursor-pointer flex-col items-center gap-[11px] text-center typo-navbar-button"
  >
    <span
      className={cn(
        'w-full transition-colors group-hover:text-navbar-blue',
        active ? 'text-navbar-blue' : 'text-text-black',
      )}
    >
      {label}
    </span>

    <span
      className={cn(
        'h-[3px] w-full rounded-full transition-colors group-hover:bg-button-blue',
        active ? 'bg-button-blue' : 'bg-transparent',
      )}
    />
  </button>
);

export default function Header({
  isLoggedIn = false,
  userName = '홍길동',
  hasNotification = false,
  onLogout,
  onWithdraw,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const pathname = location.pathname;

  const isInfoActive =
    pathname.startsWith('/accident') ||
    pathname.startsWith('/financial') ||
    pathname.startsWith('/information') ||
    pathname === '/strategy/recommend';

  const isPeriodActive =
    pathname.startsWith('/period') || pathname.startsWith('/approval');

  const isStrategyActive =
    pathname === '/strategy/result' || pathname.startsWith('/strategy/result/');

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-[64px] bg-white shadow-[0_2px_13.4px_1px_rgba(0,0,0,0.04)]">
      <div className="relative mx-auto flex h-full w-[calc(100%-240px)] max-w-[1272px] items-center justify-between max-lg:w-[calc(100%-48px)]">
        <button
          type="button"
          onClick={() => navigate(ROUTES.MAIN)}
          className="flex h-[38px] shrink-0 cursor-pointer items-center gap-[8px] rounded-[10px] px-[12px] py-[4px]"
          aria-label="홈으로 이동"
        >
          <Logo />
        </button>

        <nav className="absolute left-1/2 top-[23px] flex h-[28px] -translate-x-1/2 items-center gap-[71px]">
          <NavItem
            label="정보 입력"
            active={isInfoActive}
            onClick={() => navigate(getNextInputPath())}
          />
          <NavItem
            label="예상 기간"
            active={isPeriodActive}
            onClick={() => navigate(ROUTES.PERIOD)}
          />
          <NavItem
            label="맞춤 전략"
            active={isStrategyActive}
            onClick={() => navigate(ROUTES.STRATEGY_RESULT)}
          />
        </nav>

        {isLoggedIn ? (
          <div
            ref={userMenuRef}
            className="flex shrink-0 items-center gap-[8px]"
          >
            <NotificationButton hasNotification={hasNotification} />
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
              className={cn(
                'flex cursor-pointer items-center justify-center gap-[4px] rounded-full px-[12px] py-[6px] typo-navbar-button',
                isUserMenuOpen ? 'text-navbar-blue' : 'text-text-black',
              )}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <span className="whitespace-nowrap">{userName}님</span>
              <GoIcon
                size="small"
                direction={isUserMenuOpen ? 'up' : 'down'}
                className="shrink-0"
              />
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-[-32px] top-[64px] flex w-[162px] flex-col items-center gap-[4px] rounded-b-[10px] bg-white pb-[4px]"
                role="menu"
              >
                <div className="h-px w-full bg-line-gray opacity-40" />
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.USER_EDIT)}
                  className="flex cursor-pointer items-center justify-center rounded-[6px] px-[12px] py-[6px] typo-popup-caption text-text-black"
                  role="menuitem"
                >
                  정보 수정
                </button>
                <div className="h-px w-full bg-line-gray opacity-40" />
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex cursor-pointer items-center justify-center rounded-[6px] px-[12px] py-[6px] typo-popup-caption text-text-black"
                  role="menuitem"
                >
                  로그아웃
                </button>
                <div className="h-px w-full bg-line-gray opacity-40" />
                <button
                  type="button"
                  onClick={onWithdraw}
                  className="flex cursor-pointer items-center justify-center rounded-[6px] px-[12px] py-[6px] typo-popup-caption text-text-black"
                  role="menuitem"
                >
                  회원 탈퇴
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-[8px]">
            <button
              type="button"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="flex cursor-pointer items-center justify-center rounded-[6px] px-[12px] py-[6px] typo-navbar-button text-text-black transition-colors hover:rounded-full hover:text-navbar-blue"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-button-blue px-[12px] py-[6px] typo-navbar-button text-white"
            >
              회원가입
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-[0.14]" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
