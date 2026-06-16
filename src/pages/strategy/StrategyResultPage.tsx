import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CashflowLineChart from '../../components/strategy/CashflowLineChart';
import StrategySummaryCard from '../../components/strategy/StrategySummaryCard';
import StrategyTimelineCard from '../../components/strategy/StrategyTimelineCard';
import type { TimelineItem as TimelineCardItem } from '../../components/strategy/StrategyTimelineCard';
import StrategyApplyCard from '../../components/strategy/StrategyApplyCard';
import type {
  ApplyOption,
  RecalculatePayload,
} from '../../components/strategy/StrategyApplyCard';
import Button from '../../components/common/button/Button';
import LogoFullLogin from '../../components/common/logo/LogoFullLogin';
import { strategyApi, getStrategyContext } from '../../apis/strategy';
import { getErrorMessage } from '../../apis/axiosInstance';
import type {
  StrategyMeResponse,
  StrategyItem as StrategyItemData,
} from '../../types/strategy';

type LocationState = {
  hasStrategyResult?: boolean;
};

type SupportItem = {
  title: string;
  period: string;
  applyPeriod: string;
  amount: string;
};

type InputProgress = {
  lastPath?: string;
  hasAccidentInfo?: boolean;
  hasFinancialInfo?: boolean;
};

const INPUT_PROGRESS_STORAGE_KEY = 'butim-input-progress';
const SELECTED_STRATEGY_STORAGE_KEY = 'butim-selected-strategy-id';
const HAS_STRATEGY_RESULT_STORAGE_KEY = 'butim-has-strategy-result';

const DEFAULT_INPUT_PATH = '/accident';

const formatDate = (value: string | null) => {
  if (!value) return '미정';
  const date = new Date(value);
  return `${String(date.getFullYear()).slice(2)}.${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const toSupportItem = (item: StrategyItemData): SupportItem => ({
  title: item.itemName,
  period: `${formatDate(item.expectedReceiveDate)} 지급 예상`,
  applyPeriod: `신청일: ${formatDate(item.expectedApplyDate)}`,
  amount: `+${Math.round(item.expectedAmount / 10000).toLocaleString()}만원`,
});

const timelineTypeByEvent: Record<string, TimelineCardItem['type']> = {
  CURRENT_ASSET: 'asset',
  HOSPITAL_COST: 'expense',
  WELFARE_RECEIVED: 'income',
  LOAN_RECEIVED: 'income',
  INSURANCE_RECEIVED: 'income',
  WORKERS_COMPENSATION_RECEIVED: 'income',
};

const toTimelineCardItem = (
  item: StrategyMeResponse['timeline'][number],
): TimelineCardItem => ({
  date: formatDate(item.date),
  label: item.eventName,
  amount: `${item.amount >= 0 ? '+' : ''}${Math.round(
    item.amount / 10000,
  ).toLocaleString()}만원`,
  type: timelineTypeByEvent[item.eventType] ?? 'asset',
});

const formatWon = (amount: number) =>
  `${Math.round(amount / 10000).toLocaleString()}만원`;

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

  if (!progress) {
    return DEFAULT_INPUT_PATH;
  }

  if (progress.lastPath) {
    return progress.lastPath;
  }

  return DEFAULT_INPUT_PATH;
};

function SelectedStrategyCard({
  description,
  supports,
}: {
  description: string;
  supports: SupportItem[];
}) {
  return (
    <div className="w-[801px] rounded-[12px] bg-white px-[32px] py-[28px] shadow-card-blue">
      <h2 className="typo-inform-sub-section text-text-black">맞춤 전략</h2>

      <div className="mt-[24px] h-[1px] w-full bg-line-gray opacity-70" />

      <div className="mt-[20px] flex h-[59px] items-center rounded-[12px] bg-background-blue px-[30px]">
        <span className="mr-[10px] text-text-blue">✓</span>
        <p className="typo-navbar-button text-title-gray">{description}</p>
      </div>

      <div className="mt-[32px] rounded-[10px] bg-white">
        <h3 className="typo-popup-button text-text-black">지원금</h3>

        <div className="mt-[18px] flex flex-col">
          {supports.map((item, index) => (
            <div
              key={item.title}
              className={`flex justify-between py-[14px] ${
                index !== supports.length - 1
                  ? 'border-b border-line-gray'
                  : ''
              }`}
            >
              <div>
                <p className="typo-navbar-button text-text-black">
                  {item.title}
                </p>
                <p className="mt-[6px] typo-warning-text text-text-gray">
                  {item.period}
                </p>
                <p className="mt-[4px] typo-warning-text text-text-gray">
                  {item.applyPeriod}
                </p>
              </div>

              <div className="flex flex-col items-end justify-end">
                <p className="typo-warning-text font-semibold text-text-blue">
                  {item.amount}
                </p>
                <button
                  type="button"
                  className="mt-[8px] typo-warning-text text-text-blue underline"
                >
                  신청하러 가기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NeedInfoCard() {
  const navigate = useNavigate();

  const handleMoveToInput = () => {
    const nextPath = getNextInputPath();
    navigate(nextPath);
  };

  return (
    <div className="flex h-[477px] w-[630px] flex-col items-center rounded-[16px] bg-white px-[127px] pb-[50px] pt-[64px] shadow-card-blue">
      <LogoFullLogin className="h-auto w-[137px]" />

      <h1 className="mt-[40px] w-[396px] text-center text-[34px] font-semibold leading-[140%] tracking-[-0.02em] text-text-black">
        맞춤 전략 확인을 위해
        <br />
        정보 입력이 필요합니다
      </h1>

      <p className="mt-[20px] w-[396px] text-center text-[20px] font-normal leading-[160%] tracking-[-0.02em] text-popup-gray">
        정보 입력을 완료하면 입력하신 정보를 바탕으로
        <br />
        현금 흐름과 맞춤 대응 전략을 확인할 수 있습니다.
      </p>

      <button
        type="button"
        onClick={handleMoveToInput}
        className="mt-[40px] flex h-[53px] w-[396px] items-center justify-center rounded-[10px] bg-button-blue text-[18px] font-semibold leading-[21px] text-white"
      >
        정보 입력하러 가기
      </button>
    </div>
  );
}

function NeedInfoPage() {
  return (
    <div className="min-h-screen bg-background-blue">
      <main className="relative min-h-screen overflow-hidden pt-[64px]">
        <div className="pointer-events-none absolute left-0 right-0 top-[64px] h-[542px] opacity-70">
          <div className="absolute left-0 top-[-147px] h-[437px] w-full bg-[#E9EFFD] blur-[2px]" />
          <div className="absolute left-0 top-[-147px] h-[491px] w-full bg-gradient-to-r from-[#EDF2FD] from-[75%] to-[rgba(237,242,253,0.6)] blur-[2px]" />
          <div className="absolute left-0 top-[-147px] h-[518px] w-full bg-gradient-to-r from-[#F1F5FD] from-[75%] to-[rgba(241,245,253,0.6)] blur-[2px]" />
          <div className="absolute left-0 top-[-146px] h-[542px] w-full bg-gradient-to-r from-[#F8F9FE] from-[85%] to-[rgba(248,249,254,0.6)] blur-[2px]" />
        </div>

        <section className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center pb-[40px] pt-[40px]">
          <NeedInfoCard />
        </section>
      </main>
    </div>
  );
}

export default function StrategyResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const [result, setResult] = useState<StrategyMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [recalculating, setRecalculating] = useState(false);
  const [recalculateError, setRecalculateError] = useState<string | null>(
    null,
  );

  const hasStrategyResult = useMemo(() => {
    const selectedStrategyId = localStorage.getItem(
      SELECTED_STRATEGY_STORAGE_KEY,
    );
    const storedHasResult = localStorage.getItem(
      HAS_STRATEGY_RESULT_STORAGE_KEY,
    );

    return Boolean(
      state?.hasStrategyResult ||
        selectedStrategyId ||
        storedHasResult === 'true',
    );
  }, [state]);

  useEffect(() => {
    if (state?.hasStrategyResult) {
      localStorage.setItem(HAS_STRATEGY_RESULT_STORAGE_KEY, 'true');
    }
  }, [state]);

  useEffect(() => {
    if (!hasStrategyResult) {
      setLoading(false);
      return;
    }

    const context = getStrategyContext();

    if (!context) {
      setLoading(false);
      return;
    }

    setUserId(context.userId);

    strategyApi
      .getMe(context.userId)
      .then(setResult)
      .catch(() => setResult(null))
      .finally(() => setLoading(false));
  }, [hasStrategyResult]);

  if (!hasStrategyResult) {
    return <NeedInfoPage />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-blue">
        <span className="typo-navbar-button text-text-gray">
          불러오는 중...
        </span>
      </div>
    );
  }

  const selectedStrategy = result?.selectedStrategy ?? null;

  const applyOptions: ApplyOption[] = selectedStrategy
    ? [...selectedStrategy.supportItems, ...selectedStrategy.loanItems].map(
        (item) => ({ itemId: item.itemId, label: item.itemName }),
      )
    : [];

  const handleRecalculate = async (payload: RecalculatePayload) => {
    if (!userId) {
      setRecalculateError('사용자 정보를 확인할 수 없습니다.');
      return;
    }

    setRecalculating(true);
    setRecalculateError(null);

    try {
      const cashflow = await strategyApi.recalculateCashflow({
        userId,
        ...payload,
      });

      setResult((prev) =>
        prev
          ? {
              ...prev,
              currentAsset: cashflow.currentAsset,
              cashGapDay: cashflow.cashGapDay,
              cashflow: cashflow.cashflow,
              timeline: cashflow.timeline,
            }
          : prev,
      );
    } catch (e) {
      setRecalculateError(getErrorMessage(e, '전략 재계산에 실패했습니다.'));
    } finally {
      setRecalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-blue">
      <main className="relative min-h-screen overflow-hidden pt-[64px]">
        <div className="pointer-events-none absolute right-[-35px] top-[205px] opacity-[0.03]">
          <div className="bg-logo-gradient bg-clip-text text-[480px] font-bold leading-none text-transparent">
            버
          </div>
        </div>

        <section className="relative z-10 mx-auto w-[1084px] pb-[80px] pt-[88px]">
          <div>
            <h1 className="typo-inform-title-section text-text-black">
              맞춤 전략 추천
            </h1>

            <p className="typo-navbar-button mt-[12px] text-title-gray">
              선택하신 전략을 기준으로 현금 흐름과 지원금 일정을 확인할 수
              있습니다.
            </p>

            <p className="typo-navbar-button mt-[10px] text-title-gray">
              필요 시 병원비, 보험금, 자산 변화를 입력해 상황에 맞게 전략을
              다시 계산할 수 있습니다.
            </p>
          </div>

          <div className="mt-[56px] grid grid-cols-[801px_363px] gap-x-[16px] gap-y-[16px]">
            <CashflowLineChart
              points={result?.cashflow ?? []}
              cashGapDay={result?.cashGapDay}
              approvalExpectedDays={result?.approvalExpectedDays}
              paymentExpectedDays={result?.paymentExpectedDays}
            />

            <div className="grid h-[254px] grid-cols-2 gap-[16px]">
              <StrategySummaryCard
                title="현재 자산"
                value={result ? formatWon(result.currentAsset) : '-'}
              />
              <StrategySummaryCard
                title="예상 승인 기간"
                value={result ? `D-${result.approvalExpectedDays}` : '-'}
              />
              <StrategySummaryCard
                title="현금 공백 발생"
                value={result ? `D-${result.cashGapDay}` : '-'}
              />
              <StrategySummaryCard
                title="예상 지급 기간"
                value={result ? `D-${result.paymentExpectedDays}` : '-'}
              />
            </div>

            <div className="flex flex-col gap-[16px]">
              <SelectedStrategyCard
                description={selectedStrategy?.summary ?? '전략 정보를 확인할 수 없습니다.'}
                supports={
                  selectedStrategy
                    ? selectedStrategy.supportItems.map(toSupportItem)
                    : []
                }
              />
              <StrategyApplyCard
                options={applyOptions}
                strategyTitle={selectedStrategy?.title ?? '선택한 전략'}
                submitting={recalculating}
                submitError={recalculateError}
                onSubmit={handleRecalculate}
              />
            </div>

            <StrategyTimelineCard
              items={result?.timeline.map(toTimelineCardItem)}
            />
          </div>

          <div className="mt-[56px] flex w-[801px] justify-between">
            <Button
              variant="gray"
              size="information"
              hasArrow
              arrowDirection="left"
              onClick={() => navigate('/strategy/recommend')}
            >
              이전 단계
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}