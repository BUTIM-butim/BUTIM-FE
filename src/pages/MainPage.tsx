import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoginRequiredModal from "../components/auth/LoginRequiredModal";
import Button from "../components/common/button/Button";
import PreviewCard from "../components/main/PreviewCard";

import heroBackground from "../assets/images/hero-background.svg";
import symbolGraphic from "../assets/images/symbol-graphic.svg";

import { ROUTES } from "../constants/routes";

import type { PreviewCardStatus } from "../types/main";

type InputProgress = {
  lastPath?: string;
  financialStep?: "fund-status" | "support-target";
  supportTargetStep?: "basic" | "dependent";
  hasAccidentInfo?: boolean;
  hasFinancialInfo?: boolean;
};

const INPUT_PROGRESS_STORAGE_KEY = "butim-input-progress";

const getInputProgress = (): InputProgress => {
  const savedProgress = localStorage.getItem(INPUT_PROGRESS_STORAGE_KEY);

  if (!savedProgress) {
    return {};
  }

  try {
    return JSON.parse(savedProgress) as InputProgress;
  } catch {
    return {};
  }
};

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(
    () => Boolean((location.state as { showLoginModal?: boolean } | null)?.showLoginModal),
  );

  useEffect(() => {
    if ((location.state as { showLoginModal?: boolean } | null)?.showLoginModal) {
      window.history.replaceState({}, '');
    }
  }, []);

  /*
   * 로그인 여부는 accessToken 존재 여부로 판단합니다.
   *
   * 승인 기간 결과 및 전략 결과는
   * 관련 API 연결 전까지 테스트용 값으로 사용합니다.
   */
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  const hasApprovalResult = false;
  const hasStrategyResult = false;

  const approvalCardStatus: PreviewCardStatus = hasApprovalResult
    ? "completed"
    : "locked";

  const strategyCardStatus: PreviewCardStatus = hasStrategyResult
    ? "completed"
    : "locked";

  const hasAllResults = hasApprovalResult && hasStrategyResult;

  const moveToFinancialFirstStep = () => {
    const previousProgress = getInputProgress();

    localStorage.setItem(
      INPUT_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        ...previousProgress,
        lastPath: ROUTES.FINANCIAL,
        financialStep: "fund-status",
        supportTargetStep: "basic",
        hasFinancialInfo: false,
      }),
    );

    navigate(ROUTES.FINANCIAL);
  };

  const handleStartClick = () => {
    // 1. 로그인하지 않은 상태
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    // 2. 로그인했지만 승인 기간 결과가 없는 상태
    // 산재 정보 입력 화면으로 이동
    if (!hasApprovalResult) {
      navigate(ROUTES.ACCIDENT);
      return;
    }

    // 3. 승인 기간 결과는 있지만 전략 결과가 없는 상태
    // 재정 정보 입력 첫 단계로 이동
    if (!hasStrategyResult) {
      moveToFinancialFirstStep();
      return;
    }
  };

  const handleApprovalResultClick = () => {
    navigate(ROUTES.PERIOD);
  };

  const handleStrategyResultClick = () => {
    navigate(ROUTES.STRATEGY_RESULT);
  };

  return (
    <>
      <main className="relative min-h-[calc(100vh-68px)] overflow-hidden bg-background-blue">
        {/* 상단 배경 이미지 */}
        <div className="pointer-events-none absolute left-0 top-[-147px] h-[542px] w-full">
          <img
            src={heroBackground}
            alt=""
            aria-hidden="true"
            className="size-full object-cover"
          />
        </div>

        {/* 버팀 심볼 그래픽 */}
        <div className="pointer-events-none absolute right-[165.49px] top-[81px]">
          <div className="-rotate-[11.3deg]">
            <img
              src={symbolGraphic}
              alt=""
              aria-hidden="true"
              className="h-[278px] w-[307px]"
            />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 mx-auto w-full max-w-[1512px] px-[120px] pb-[56px] pt-[80px]">
          <section className="flex w-fit flex-col items-start gap-[36px]">
            <h1 className="typo-hero-title whitespace-nowrap text-text-black">
              산재 승인까지, 소득 공백을{" "}
              <span className="text-hero-text-blue">함께 대비합니다</span>
            </h1>

            <div className="flex flex-col gap-[12px] typo-hero-body text-text-dark-gray">
              <p>산재 신청이 승인되기까지 걸리는 시간을 예측하고,</p>

              <p>그 기간 동안 버틸 수 있는 지원 전략을 추천해드립니다.</p>
            </div>

            {/* 버튼이 사라져도 카드 위치가 유지되도록 높이 고정 */}
            <div className="h-[54px]">
              {!hasAllResults && (
                <Button
                  size="hero"
                  variant="blue"
                  hasArrow
                  arrowDirection="right"
                  onClick={handleStartClick}
                >
                  정보 입력하고 결과 확인하기
                </Button>
              )}
            </div>
          </section>

          {/* 하단 결과 카드 */}
          <div className="mt-[68px] flex w-full gap-[60px]">
            <PreviewCard
              tone="blue"
              status={approvalCardStatus}
              onAction={handleApprovalResultClick}
            />

            <PreviewCard
              tone="green"
              status={strategyCardStatus}
              onAction={handleStrategyResultClick}
            />
          </div>
        </div>
      </main>

      {/* 비로그인 사용자 안내 모달 */}
      {isLoginModalOpen && (
        <LoginRequiredModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default MainPage;
