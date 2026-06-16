import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoginRequiredModal from "../components/auth/LoginRequiredModal";
import Button from "../components/common/button/Button";
import PreviewCard from "../components/main/PreviewCard";

import heroBackground from "../assets/images/hero-background.svg";
import symbolGraphic from "../assets/images/symbol-graphic.svg";

import { getMainResult } from "../apis/main";
import { ROUTES } from "../constants/routes";

import type { MainResult, PreviewCardStatus } from "../types/main";

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
    
  const [mainResult, setMainResult] = useState<MainResult | null>(null); 

  useEffect(() => {
    if ((location.state as { showLoginModal?: boolean } | null)?.showLoginModal) {
      window.history.replaceState({}, '');
    }
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let isMounted = true;

    const fetchMainResult = async () => {
      try {
        const result = await getMainResult();

        if (isMounted) {
          setMainResult(result);
        }
      } catch (error) {
        console.error("메인 페이지 결과 조회에 실패했습니다.", error);

        if (isMounted) {
          setMainResult(null);
        }
      }
    };

    void fetchMainResult();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const hasApprovalResult =
    mainResult !== null &&
    mainResult.predictionMinDays > 0 &&
    mainResult.predictionMaxDays > 0 &&
    mainResult.predictionMedianDays > 0 &&
    mainResult.actualExpectedDays > 0;

  const hasStrategyResult =
    mainResult !== null &&
    mainResult.paymentExpectedDays > 0 &&
    (mainResult.hasSupportItems || mainResult.hasLoanItems);

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
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!hasApprovalResult) {
      navigate(ROUTES.ACCIDENT);
      return;
    }

    if (!hasStrategyResult) {
      moveToFinancialFirstStep();
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
        <div className="pointer-events-none absolute left-0 top-[-147px] h-[542px] w-full">
          <img
            src={heroBackground}
            alt=""
            aria-hidden="true"
            className="size-full object-cover"
          />
        </div>

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

          <div className="mt-[68px] flex w-full gap-[60px]">
            <PreviewCard
              tone="blue"
              status={approvalCardStatus}
              predictionMinDays={mainResult?.predictionMinDays}
              predictionMaxDays={mainResult?.predictionMaxDays}
              predictionMedianDays={mainResult?.predictionMedianDays}
              actualExpectedDays={mainResult?.actualExpectedDays}
              onAction={handleApprovalResultClick}
            />

            <PreviewCard
              tone="green"
              status={strategyCardStatus}
              paymentExpectedDays={mainResult?.paymentExpectedDays}
              hasSupportItems={mainResult?.hasSupportItems}
              hasLoanItems={mainResult?.hasLoanItems}
              onAction={handleStrategyResultClick}
            />
          </div>
        </div>
      </main>

      {isLoginModalOpen && (
        <LoginRequiredModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default MainPage;
