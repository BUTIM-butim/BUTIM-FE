import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Button from '../../components/common/button/Button';
import CloseIcon from '../../components/common/icons/CloseIcon';

type StrategyId = 'strategy-1' | 'strategy-2';

type SupportItem = {
  title: string;
  period: string;
  amount: string;
};

type Strategy = {
  id: StrategyId;
  title: string;
  description: string;
  theme: 'blue' | 'green';
  supports: SupportItem[];
  loans?: SupportItem[];
};

const STRATEGIES: Strategy[] = [
  {
    id: 'strategy-1',
    title: '전략 1',
    description: '최대한 빠르게 받을 수 있는 전략이에요.',
    theme: 'blue',
    supports: [
      {
        title: '재난적 의료비 지원 사업',
        period: '50~60일 지급 예상',
        amount: '+40만원',
      },
      {
        title: '긴급복지 연료비 및 전기요금',
        period: '60~70일 지급 예상',
        amount: '+60만원',
      },
    ],
  },
  {
    id: 'strategy-2',
    title: '전략 2',
    description: '최대한 많이 받을 수 있는 전략이에요.',
    theme: 'green',
    supports: [
      {
        title: '재활근로',
        period: '90~100일 지급 예상',
        amount: '+80만원',
      },
      {
        title: '생계급여',
        period: '100~110일 지급 예상',
        amount: '+40만원',
      },
    ],
  },
];

const themeStyle = {
  blue: {
    selectedBorder: 'border-button-blue',
    selectedBg: 'bg-background-blue',
    text: 'text-navbar-blue',
    amount: 'text-text-blue',
    check: 'text-text-blue',
  },
  green: {
    selectedBorder: 'border-button-green',
    selectedBg: 'bg-background-green',
    text: 'text-text-green',
    amount: 'text-text-green',
    check: 'text-text-green',
  },
};

function StrategyCheckIcon({
  selected,
  theme,
}: {
  selected: boolean;
  theme: 'blue' | 'green';
}) {
  const selectedClass =
    theme === 'blue'
      ? 'border-button-blue bg-button-blue'
      : 'border-button-green bg-button-green';

  return (
    <span
      className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-[2px] ${
        selected ? selectedClass : 'border-line-gray bg-white'
      }`}
    >
      {selected && (
        <svg
          width="13"
          height="10"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 5L4.7 8L11.5 2"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function SmallCheckIcon({ className }: { className: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 8.6L7.1 11.4L13 5.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="6.5" r="5.2" stroke="#EF4444" strokeWidth="1.3" />
      <path
        d="M6.5 3.7V6.9"
        stroke="#EF4444"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M6.5 9.3H6.51"
        stroke="#EF4444"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CashFlowChart() {
  return (
    <div className="relative h-[321px] w-[801px] overflow-hidden rounded-[12px] bg-white shadow-card-blue">
      <svg
        width="801"
        height="321"
        viewBox="0 0 801 321"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="cashGapGradient"
            x1="488"
            y1="188"
            x2="466.5"
            y2="255"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EF4444" />
            <stop offset="1" stopColor="white" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <text x="36" y="34" fill="#989EA9" fontSize="10" fontWeight="500">
          (만원)
        </text>

        <text x="40" y="58" fill="#989EA9" fontSize="12" fontWeight="500">
          100
        </text>
        <text x="47" y="109" fill="#989EA9" fontSize="12" fontWeight="500">
          50
        </text>
        <text x="58" y="160" fill="#989EA9" fontSize="12" fontWeight="500">
          0
        </text>
        <text x="38" y="211" fill="#989EA9" fontSize="12" fontWeight="500">
          -50
        </text>
        <text x="34" y="262" fill="#989EA9" fontSize="12" fontWeight="500">
          -100
        </text>

        <line x1="79" y1="53" x2="646" y2="53" stroke="#EBEBEB" />
        <line x1="79" y1="103.75" x2="646" y2="103.75" stroke="#EBEBEB" />
        <line x1="79" y1="154.5" x2="646" y2="154.5" stroke="#EBEBEB" />
        <line x1="79" y1="205.25" x2="646" y2="205.25" stroke="#EBEBEB" />
        <line x1="79" y1="256" x2="646" y2="256" stroke="#EBEBEB" />

        <line
          x1="591.5"
          y1="53"
          x2="591.5"
          y2="256"
          stroke="#C7CED9"
          strokeDasharray="2 2"
        />
        <line
          x1="633.5"
          y1="53"
          x2="633.5"
          y2="255"
          stroke="#C7CED9"
          strokeDasharray="2 2"
        />

        <text x="578" y="45" fill="#2B3034" fillOpacity="0.4" fontSize="10">
          승인 시점
        </text>
        <text x="620" y="45" fill="#2B3034" fillOpacity="0.4" fontSize="10">
          지급 시점
        </text>

        <text x="80" y="288" fill="#989EA9" fontSize="12" fontWeight="500">
          0일
        </text>
        <text x="210" y="288" fill="#989EA9" fontSize="12" fontWeight="500">
          30일
        </text>
        <text x="347" y="288" fill="#989EA9" fontSize="12" fontWeight="500">
          60일
        </text>
        <text x="484" y="288" fill="#989EA9" fontSize="12" fontWeight="500">
          90일
        </text>
        <text x="580" y="288" fill="#989EA9" fontSize="12" fontWeight="500">
          97일
        </text>
        <text x="638" y="288" fill="#989EA9" fontSize="12" fontWeight="500">
          111일
        </text>
        <text x="682" y="288" fill="#989EA9" fontSize="10" fontWeight="500">
          (기준일: 26.04.13)
        </text>

        <path
          d="M359 255V154.5L495.5 206L633.5 234V255H359Z"
          fill="url(#cashGapGradient)"
          opacity="0.5"
        />

        <path
          d="M359 154.5L496 205.5L633 234"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M88 53L222 104L359 154.5"
          stroke="#C7CED9"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M88.5 53L222.5 104L329 111.5L359 118.5L380 62L499 104L633.5 142"
          stroke="#185DC5"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M88.5 53L222.5 104L359.5 154.5L496.5 205.5L530 135.5L598.5 113L633.5 129"
          stroke="#149F70"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <line
          x1="359.75"
          y1="157"
          x2="359.75"
          y2="256"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {[
          [88, 53],
          [222, 103],
        ].map(([cx, cy]) => (
          <g key={`gray-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#C7CED9" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        {[
          [359.5, 154],
          [496, 205],
          [633, 234],
        ].map(([cx, cy]) => (
          <g key={`red-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#EF4444" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        {[
          [88, 53],
          [222, 103],
          [329, 112],
          [359, 118],
          [380, 62],
          [499, 104],
          [633, 142],
        ].map(([cx, cy]) => (
          <g key={`blue-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#3778E3" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        {[
          [88, 53],
          [222, 103],
          [359.5, 154],
          [496, 205],
          [530, 136],
          [598, 114],
          [634, 129],
        ].map(([cx, cy]) => (
          <g key={`green-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#1BAB8B" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        <g>
          <circle cx="687.7" cy="59" r="5.35" stroke="#EF4444" />
          <circle cx="687.7" cy="59" r="4" fill="#EF4444" />
          <text x="706" y="63" fill="#EF4444" fontSize="12" fontWeight="500">
            현금 공백
          </text>

          <circle cx="687.7" cy="81" r="5.35" stroke="#3778E3" />
          <circle cx="687.7" cy="81" r="4" fill="#3778E3" />
          <text x="706" y="85" fill="#3778E3" fontSize="12" fontWeight="500">
            전략 1
          </text>

          <circle cx="687.7" cy="103" r="5.35" stroke="#1BAB8B" />
          <circle cx="687.7" cy="103" r="4" fill="#1BAB8B" />
          <text x="706" y="107" fill="#1BAB8B" fontSize="12" fontWeight="500">
            전략 2
          </text>
        </g>
      </svg>
    </div>
  );
}

function InfoBox({
  title,
  items,
  amountClass,
}: {
  title: string;
  items: SupportItem[];
  amountClass: string;
}) {
  return (
    <div className="flex h-[191px] w-[355px] flex-col rounded-[10px] bg-white p-[16px] shadow-[0px_0px_20.2px_rgba(30,30,30,0.02)]">
      <h4 className="mb-[26px] text-[18px] font-semibold leading-[21px] text-text-black">
        {title}
      </h4>

      <div className="flex flex-col gap-[12px]">
        {items.map((item, index) => (
          <div key={`${title}-${item.title}-${index}`}>
            <div className="flex justify-between gap-[12px]">
              <div>
                <p className="typo-navbar-button text-text-black">
                  {item.title}
                </p>
                <p className="mt-[8px] text-[14px] font-medium leading-[17px] text-text-gray">
                  {item.period}
                </p>
              </div>

              <p
                className={`text-[14px] font-medium leading-[17px] ${amountClass}`}
              >
                {item.amount}
              </p>
            </div>

            {index !== items.length - 1 && (
              <div className="mt-[12px] h-[1px] w-full bg-line-gray opacity-70" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StrategyCard({
  strategy,
  selected,
  showError,
  onClick,
}: {
  strategy: Strategy;
  selected: boolean;
  showError: boolean;
  onClick: () => void;
}) {
  const style = themeStyle[strategy.theme];

  const hasSupports = strategy.supports.length > 0;
  const hasLoans = strategy.loans !== undefined && strategy.loans.length > 0;

  const borderClass = showError
    ? 'border-warning-red'
    : selected
      ? style.selectedBorder
      : 'border-line-gray';

  const backgroundClass = selected ? style.selectedBg : 'bg-white';
  const titleClass = selected ? style.text : 'text-text-black';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-[395px] flex-col rounded-[12px] border-[1.8px] px-[20px] pb-[30px] pt-[20px] text-left shadow-card-blue ${borderClass} ${backgroundClass} ${
        hasLoans ? 'h-[592px]' : 'h-[377px]'
      }`}
    >
      <div className="flex w-[355px] flex-col gap-[24px]">
        <div className="flex h-[29px] items-center gap-[6px]">
          <StrategyCheckIcon selected={selected} theme={strategy.theme} />

          <h3
            className={`text-[24px] font-semibold leading-[29px] tracking-[-0.02em] ${titleClass}`}
          >
            {strategy.title}
          </h3>
        </div>

        <div className="flex h-[59px] w-[355px] items-center rounded-[12px] bg-white px-[30px]">
          <div className="flex items-start gap-[8px]">
            <SmallCheckIcon className={style.check} />
            <p className="typo-navbar-button text-title-gray">
              {strategy.description}
            </p>
          </div>
        </div>

        {hasSupports && (
          <InfoBox
            title="지원금"
            items={strategy.supports}
            amountClass={style.amount}
          />
        )}

        {hasLoans && (
          <InfoBox
            title="저금리 대출"
            items={strategy.loans ?? []}
            amountClass={style.amount}
          />
        )}
      </div>
    </button>
  );
}

function StrategyCompleteModal({
  open,
  onClose,
  onMove,
}: {
  open: boolean;
  onClose: () => void;
  onMove: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative flex h-[328px] w-[533px] items-center justify-center rounded-[16px] bg-white px-[79px] pb-[36px] pt-[50px] shadow-[0px_0px_24.8px_2px_rgba(31,41,55,0.12)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="전략 선택 완료 팝업 닫기"
          className="absolute right-[12.5px] top-[12.5px] flex h-[31px] w-[31px] cursor-pointer items-center justify-center rounded-[8px]"
        >
          <CloseIcon />
        </button>

        <div className="flex h-[242px] w-[375px] flex-col items-center justify-center gap-[32px]">
          <div className="flex w-[375px] flex-col items-center gap-[20px]">
            <h2 className="w-[375px] text-center text-[34px] font-semibold leading-[41px] tracking-[-0.02em] text-text-black">
              전략 선택이 완료되었습니다.
            </h2>

            <p className="w-[375px] text-center text-[20px] font-normal leading-[32px] tracking-[-0.02em] text-popup-gray">
              선택한 전략을 기준으로 현금 흐름과 지원금 일정을 확인할 수
              있습니다. 필요 시 소득·지출 정보를 추가로 입력해 전략을 다시
              계산할 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={onMove}
            className="flex h-[53px] w-[375px] items-center justify-center rounded-[10px] bg-button-blue px-[24px] py-[16px] text-[18px] font-semibold leading-[21px] text-white"
          >
            맞춤 전략 페이지 이동하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StrategyRecommendationPage() {
  const navigate = useNavigate();

  const [selectedStrategyId, setSelectedStrategyId] =
    useState<StrategyId | null>(null);
  const [showError, setShowError] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleSelectStrategy = (strategyId: StrategyId) => {
    setSelectedStrategyId(strategyId);
    setShowError(false);
  };

  const handleConfirm = () => {
    if (!selectedStrategyId) {
      setShowError(true);
      return;
    }

    setIsCompleteModalOpen(true);
  };

  const handleMove = () => {
    if (selectedStrategyId) {
      localStorage.setItem('butim-selected-strategy-id', selectedStrategyId);
      localStorage.setItem('butim-has-strategy-result', 'true');
    }

    setIsCompleteModalOpen(false);

    navigate('/strategy/result', {
      state: {
        hasStrategyResult: true,
        selectedStrategyId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background-blue">
      <Header />

      <Sidebar currentSectionId="strategy" />

      <main className="relative ml-[288px] min-h-screen overflow-hidden pt-[64px]">
        <div className="pointer-events-none absolute right-[-78px] top-[230px] opacity-[0.03]">
          <div className="bg-logo-gradient bg-clip-text text-[704px] font-bold leading-none text-transparent -rotate-[11.3deg]">
            버
          </div>
        </div>

        <section className="relative z-10 ml-[135px] pb-[80px] pt-[111px]">
          <div className="mb-[56px] flex w-[637px] flex-col gap-[8px]">
            <h1 className="typo-inform-title-section text-text-black">
              맞춤 전략 추천
            </h1>

            <p className="typo-inform-title-caption text-title-gray">
              입력하신 정보를 바탕으로 현금 공백 발생 시기와 대응 전략을
              추천드립니다.
            </p>

            <p className="typo-inform-title-caption text-title-gray">
              전략 1과 전략 2중 하나를 선택하시면, 선택한 전략을 기준으로 
              현금 흐름과 지원금 일정을 안내해드립니다.
            </p>
          </div>

          <div className="flex w-[801px] flex-col gap-[15px]">
            <CashFlowChart />

            <div className="flex w-[801px] justify-between gap-[15px]">
              {STRATEGIES.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  selected={selectedStrategyId === strategy.id}
                  showError={showError}
                  onClick={() => handleSelectStrategy(strategy.id)}
                />
              ))}
            </div>

            {showError && (
              <div className="flex items-center gap-[4px]">
                <WarningIcon />
                <p className="typo-warning-text text-warning-red">
                  전략을 선택해주세요.
                </p>
              </div>
            )}

            <div className="mt-[41px] flex w-[801px] justify-between">
              <Button
                variant="gray"
                size="information"
                hasArrow
                arrowDirection="left"
                onClick={() => navigate('/financial')}
              >
                이전 단계
              </Button>

              <Button
                variant="blue"
                size="information"
                hasArrow
                arrowDirection="right"
                onClick={handleConfirm}
              >
                전략 확정하기
              </Button>
            </div>
          </div>
        </section>
      </main>

      <StrategyCompleteModal
        open={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        onMove={handleMove}
      />
    </div>
  );
}