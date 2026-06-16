type TimelineType = 'asset' | 'expense' | 'income';

type TimelineItem = {
  date: string;
  label: string;
  amount: string;
  type: TimelineType;
};

const timelineItems: TimelineItem[] = [
  { date: '26.04.13', label: '전체 자산', amount: '100만원', type: 'asset' },
  { date: '26.04.13', label: '병원비', amount: '-20만원', type: 'expense' },
  { date: '26.04.13', label: '보험금', amount: '+20만원', type: 'income' },
  { date: '26.04.13', label: '병원비', amount: '-20만원', type: 'expense' },
  { date: '26.04.13', label: '병원비', amount: '-20만원', type: 'expense' },
  { date: '26.04.13', label: '전체 자산', amount: '100만원', type: 'asset' },
];

const dotClass: Record<TimelineType, string> = {
  asset: 'bg-button-green',
  expense: 'bg-warning-red',
  income: 'bg-button-blue',
};

const amountClass: Record<TimelineType, string> = {
  asset: 'text-text-green',
  expense: 'text-warning-red',
  income: 'text-text-blue',
};

export default function StrategyTimelineCard() {
  return (
    <div className="h-[374px] w-[363px] rounded-[12px] bg-white px-[32px] py-[28px] shadow-card-blue">
      <h2 className="typo-inform-sub-section text-text-black">
        자산 변동 타임라인
      </h2>

      <div className="mt-[24px] h-[1px] w-full bg-line-gray opacity-70" />

      <div className="mt-[27px] flex flex-col gap-[20px]">
        {timelineItems.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-start">
            <span className="w-[70px] typo-warning-text text-text-gray">
              {item.date}
            </span>

            <div className="relative flex w-[28px] justify-center">
              <span
                className={`mt-[5px] h-[7px] w-[7px] rounded-full ${dotClass[item.type]}`}
              />

              {index !== timelineItems.length - 1 && (
                <span className="absolute top-[18px] h-[24px] w-[1px] bg-line-gray" />
              )}
            </div>

            <span className="w-[88px] typo-navbar-button text-text-black">
              {item.label}
            </span>

            <span
              className={`ml-auto typo-navbar-button ${amountClass[item.type]}`}
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}