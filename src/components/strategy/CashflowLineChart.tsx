import { useId, useMemo, useState } from 'react';
import type { CashflowPoint, StrategyType } from '../../types/strategy';

type CashflowLineChartProps = {
  points: CashflowPoint[];
  cashGapDay?: number | null;
  approvalExpectedDays?: number | null;
  paymentExpectedDays?: number | null;
};

type LineGroupKey = 'BASELINE' | StrategyType;

const LINE_STYLE: Record<
  LineGroupKey,
  { label: string; lineColor: string; dotColor: string }
> = {
  BASELINE: { label: '현금 공백', lineColor: '#EF4444', dotColor: '#EF4444' },
  STRATEGY_1: { label: '전략 1', lineColor: '#185DC5', dotColor: '#3778E3' },
  STRATEGY_2: { label: '전략 2', lineColor: '#149F70', dotColor: '#1BAB8B' },
};

const ALL_GROUP_KEYS: LineGroupKey[] = ['BASELINE', 'STRATEGY_1', 'STRATEGY_2'];

const PADDING = { top: 56, right: 40, bottom: 50, left: 80 };
const WIDTH = 801;
const HEIGHT = 321;
const DAY_STEP = 30;

const SUPPORT_EVENT_TYPES = new Set([
  'WELFARE_APPLIED',
  'WELFARE_RECEIVED',
  'LOAN_APPLIED',
  'LOAN_RECEIVED',
  'INSURANCE_RECEIVED',
  'WORKERS_COMPENSATION_RECEIVED',
  'HOSPITAL_COST',
]);

const toManwon = (won: number) => won / 10000;

const groupKeyOf = (point: CashflowPoint): LineGroupKey =>
  point.strategyType ?? 'BASELINE';

const truncate = (text: string, max = 12) =>
  text.length > max ? `${text.slice(0, max)}…` : text;

const categoryColor = (
  key: LineGroupKey,
  dayOffset: number,
  cashGapDay?: number | null,
) => {
  if (key === 'BASELINE') {
    return cashGapDay != null && dayOffset >= cashGapDay
      ? '#EF4444'
      : '#989EA9';
  }

  return LINE_STYLE[key].lineColor;
};

export default function CashflowLineChart({
  points,
  cashGapDay,
  approvalExpectedDays,
  paymentExpectedDays,
}: CashflowLineChartProps) {
  const gradientId = useId();
  const clipId = useId();

  const [visibleKeys, setVisibleKeys] = useState<Set<LineGroupKey>>(
    new Set(ALL_GROUP_KEYS),
  );
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const groups = useMemo(() => {
    const map = new Map<LineGroupKey, CashflowPoint[]>();
    const sorted = [...points].sort((a, b) => a.dayOffset - b.dayOffset);

    for (const point of sorted) {
      const key = groupKeyOf(point);
      const list = map.get(key) ?? [];
      list.push(point);
      map.set(key, list);
    }

    return map;
  }, [points]);

  if (points.length === 0) {
    return (
      <div className="flex h-[321px] w-[801px] items-center justify-center rounded-[12px] bg-white shadow-card-blue">
        <span className="typo-navbar-button text-text-gray">
          현금흐름 데이터가 없습니다.
        </span>
      </div>
    );
  }

  const availableKeys = ALL_GROUP_KEYS.filter(
    (key) => (groups.get(key)?.length ?? 0) > 0,
  );

  const visiblePoints = points.filter((p) =>
    visibleKeys.has(groupKeyOf(p)),
  );
  const valueSource = visiblePoints.length > 0 ? visiblePoints : points;

  const maxDataDay = Math.max(...points.map((p) => p.dayOffset), 1);
  const maxDay = paymentExpectedDays ?? maxDataDay;

  const balancesInManwon = valueSource.map((p) => toManwon(p.balance));
  const maxBalance = Math.max(...balancesInManwon, 0, 1);
  const minBalance = Math.min(...balancesInManwon, 0, -1);

  const chartWidth = WIDTH - PADDING.left - PADDING.right;
  const chartHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const centerY = PADDING.top + chartHeight / 2;

  const x = (day: number) => PADDING.left + (day / maxDay) * chartWidth;
  const y = (balance: number) => {
    if (balance >= 0) {
      return centerY - (balance / maxBalance) * (chartHeight / 2);
    }
    return centerY + (balance / minBalance) * (chartHeight / 2);
  };

  const zeroY = centerY;

  const baselineGroup = groups.get('BASELINE');
  const baselineMinBalance = baselineGroup
    ? Math.min(...baselineGroup.map((p) => toManwon(p.balance)), 0)
    : 0;

  const showCashGapArea =
    visibleKeys.has('BASELINE') &&
    baselineGroup != null &&
    baselineGroup.length > 0 &&
    baselineMinBalance < 0;

  const cashGapAreaPoints = showCashGapArea
    ? [
        ...baselineGroup!.map(
          (p) => `${x(p.dayOffset)},${y(toManwon(p.balance))}`,
        ),
        ...[...baselineGroup!]
          .reverse()
          .map((p) => `${x(p.dayOffset)},${zeroY}`),
      ].join(' ')
    : '';

  const clipHeight = Math.max(HEIGHT - PADDING.bottom - zeroY, 0);

  const yTickValues = [
    minBalance,
    minBalance / 2,
    0,
    maxBalance / 2,
    maxBalance,
  ];

  const xTickValues = useMemo(() => {
    const ticks: number[] = [];
    for (let d = 0; d <= maxDay; d += DAY_STEP) {
      ticks.push(d);
    }
    if (ticks[ticks.length - 1] !== maxDay) {
      ticks.push(maxDay);
    }
    if (approvalExpectedDays != null && !ticks.includes(approvalExpectedDays)) {
      ticks.push(approvalExpectedDays);
    }
    return [...new Set(ticks)].sort((a, b) => a - b);
  }, [maxDay, approvalExpectedDays]);

  const toggleKey = (key: LineGroupKey) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const hoveredEntries =
    hoveredDay == null
      ? []
      : availableKeys
          .filter((key) => visibleKeys.has(key))
          .map((key) => {
            const point = groups
              .get(key)
              ?.find((p) => p.dayOffset === hoveredDay);
            return point ? { key, point } : null;
          })
          .filter((entry): entry is { key: LineGroupKey; point: CashflowPoint } => entry != null);

  const hoverDayKeys = useMemo(() => {
    const set = new Set<number>();
    for (const key of availableKeys) {
      if (!visibleKeys.has(key)) continue;
      for (const p of groups.get(key) ?? []) {
        set.add(p.dayOffset);
      }
    }
    return [...set];
  }, [availableKeys, visibleKeys, groups]);

  const tooltipLeft = hoveredDay != null ? x(hoveredDay) : 0;
  const tooltipWidth = hoveredEntries.length * 132;
  const clampedLeft = Math.min(
    Math.max(tooltipLeft - tooltipWidth / 2, 8),
    WIDTH - tooltipWidth - 8,
  );

  return (
    <div className="relative h-[321px] w-[801px] rounded-[12px] bg-white shadow-card-blue">
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EF4444" stopOpacity="0.45" />
            <stop offset="1" stopColor="#EF4444" stopOpacity="0.05" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect
              x={PADDING.left}
              y={zeroY}
              width={chartWidth}
              height={clipHeight}
            />
          </clipPath>
        </defs>

        {showCashGapArea && (
          <polygon
            points={cashGapAreaPoints}
            fill={`url(#${gradientId})`}
            clipPath={`url(#${clipId})`}
          />
        )}

        <text x={PADDING.left - 47} y={PADDING.top - 14} fontSize="10" fill="#989EA9">
          (만원)
        </text>

        {yTickValues.map((value, index) => (
          <g key={`y-${index}`}>
            <line
              x1={PADDING.left}
              y1={y(value)}
              x2={WIDTH - PADDING.right}
              y2={y(value)}
              stroke={value === 0 ? '#C7CED9' : '#EBEBEB'}
              strokeDasharray={value === 0 ? '2 2' : undefined}
            />
            <text
              x={PADDING.left - 14}
              y={y(value) + 4}
              fontSize="12"
              fill="#989EA9"
              textAnchor="end"
            >
              {Math.round(value).toLocaleString()}
            </text>
          </g>
        ))}

        {xTickValues.map((value) => (
          <text
            key={`x-${value}`}
            x={x(value)}
            y={HEIGHT - PADDING.bottom + 24}
            fontSize="12"
            fill="#989EA9"
            textAnchor="middle"
          >
            {value}일
          </text>
        ))}

        {cashGapDay != null && (
          <line
            x1={x(cashGapDay)}
            y1={PADDING.top}
            x2={x(cashGapDay)}
            y2={HEIGHT - PADDING.bottom}
            stroke="#EF4444"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity={0.6}
          />
        )}

        {approvalExpectedDays != null && (
          <>
            <line
              x1={x(approvalExpectedDays)}
              y1={PADDING.top}
              x2={x(approvalExpectedDays)}
              y2={HEIGHT - PADDING.bottom}
              stroke="#C7CED9"
              strokeDasharray="2 2"
            />
            <text
              x={x(approvalExpectedDays)}
              y={PADDING.top - 10}
              fontSize="10"
              fill="rgba(43,48,52,0.4)"
              textAnchor="middle"
            >
              승인 시점
            </text>
          </>
        )}

        {paymentExpectedDays != null && (
          <>
            <line
              x1={x(paymentExpectedDays)}
              y1={PADDING.top}
              x2={x(paymentExpectedDays)}
              y2={HEIGHT - PADDING.bottom}
              stroke="#C7CED9"
              strokeDasharray="2 2"
            />
            <text
              x={x(paymentExpectedDays)}
              y={PADDING.top - 24}
              fontSize="10"
              fill="rgba(43,48,52,0.4)"
              textAnchor="middle"
            >
              지급 시점
            </text>
          </>
        )}

        {availableKeys
          .filter((key) => visibleKeys.has(key))
          .map((key) => {
            const groupPoints = groups.get(key) ?? [];
            const style = LINE_STYLE[key];
            const polyline = groupPoints
              .map((p) => `${x(p.dayOffset)},${y(toManwon(p.balance))}`)
              .join(' ');

            return (
              <g key={key}>
                <polyline
                  points={polyline}
                  fill="none"
                  stroke={style.lineColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {groupPoints.map((p) => (
                  <circle
                    key={`${key}-${p.snapshotId}`}
                    cx={x(p.dayOffset)}
                    cy={y(toManwon(p.balance))}
                    r="5"
                    fill={categoryColor(key, p.dayOffset, cashGapDay)}
                    stroke="white"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })}

        {hoverDayKeys.map((day) => (
          <rect
            key={`hover-${day}`}
            x={x(day) - 8}
            y={PADDING.top}
            width={16}
            height={chartHeight}
            fill="transparent"
            onMouseEnter={() => setHoveredDay(day)}
            onMouseLeave={() => setHoveredDay(null)}
          />
        ))}

        {hoveredDay != null && (
          <line
            x1={x(hoveredDay)}
            y1={PADDING.top}
            x2={x(hoveredDay)}
            y2={HEIGHT - PADDING.bottom}
            stroke="#2B3034"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        )}
      </svg>

      {hoveredEntries.length > 0 && (
        <div
          className="pointer-events-none absolute top-[8px] z-10 flex gap-[6px]"
          style={{ left: clampedLeft }}
        >
          {hoveredEntries.map(({ key, point }) => {
            const isSupportEvent = SUPPORT_EVENT_TYPES.has(point.eventType);
            const isCashGapEvent = point.eventType === 'CASH_GAP';
            const amount =
              point.income > 0 ? point.income : -point.expense;

            return (
              <div
                key={key}
                className="w-[124px] rounded-[8px] bg-white p-[10px] shadow-[0px_2px_12px_rgba(31,41,55,0.15)]"
              >
                <p
                  className="text-[11px] font-semibold"
                  style={{
                    color: categoryColor(key, point.dayOffset, cashGapDay),
                  }}
                >
                  {LINE_STYLE[key].label}
                </p>
                <p className="mt-[4px] text-[12px] font-medium text-text-black">
                  {Math.round(toManwon(point.balance)).toLocaleString()}만원
                </p>

                {isCashGapEvent ? (
                  <p className="mt-[4px] text-[11px] text-warning-red">
                    현금 공백 발생
                  </p>
                ) : isSupportEvent && point.eventMemo ? (
                  <div className="mt-[4px] flex items-center justify-between gap-[4px]">
                    <span className="truncate text-[11px] text-text-gray">
                      {truncate(point.eventMemo)}
                    </span>
                    <span className="shrink-0 text-[11px] font-medium text-text-blue">
                      {amount >= 0 ? '+' : ''}
                      {Math.round(toManwon(amount)).toLocaleString()}만원
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute right-[24px] top-[16px] flex flex-col gap-[8px]">
        {availableKeys.map((key) => {
          const style = LINE_STYLE[key];
          const isVisible = visibleKeys.has(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleKey(key)}
              className="flex items-center gap-[6px]"
              style={{ opacity: isVisible ? 1 : 0.35 }}
            >
              <span
                className="flex h-[10px] w-[10px] rounded-full border-[1px]"
                style={{
                  borderColor: style.lineColor,
                  backgroundColor: style.lineColor,
                }}
              />
              <span className="typo-warning-text text-text-gray">
                {style.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
