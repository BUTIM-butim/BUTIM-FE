type StrategyCashFlowGraphProps = {
  variant?: 'select' | 'result';
};

const LegendDot = ({
  colorClass,
  label,
}: {
  colorClass: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-[6px]">
      <span
        className={`flex h-[10px] w-[10px] rounded-full border-[1px] ${colorClass}`}
      />
      <span className="typo-warning-text text-text-gray">{label}</span>
    </div>
  );
};

export default function StrategyCashFlowGraph({
  variant = 'result',
}: StrategyCashFlowGraphProps) {
  const showStrategy2 = variant === 'select';

  return (
    <div className="relative h-[321px] w-[801px] rounded-[12px] bg-white shadow-card-blue">
      <svg
        width="801"
        height="321"
        viewBox="0 0 801 321"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
      >
        <defs>
          <linearGradient
            id="cashGapGradient"
            x1="430"
            y1="180"
            x2="420"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EF4444" />
            <stop offset="1" stopColor="white" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* y-axis labels */}
        <text x="33" y="55" fontSize="10" fill="#989EA9">
          (만원)
        </text>
        <text x="58" y="82" fontSize="12" fill="#989EA9">
          100
        </text>
        <text x="65" y="130" fontSize="12" fill="#989EA9">
          50
        </text>
        <text x="72" y="178" fontSize="12" fill="#989EA9">
          0
        </text>
        <text x="61" y="226" fontSize="12" fill="#989EA9">
          -50
        </text>
        <text x="55" y="274" fontSize="12" fill="#989EA9">
          -100
        </text>

        {/* grid */}
        {[72, 123, 174, 225, 276].map((y) => (
          <line
            key={y}
            x1="103"
            y1={y}
            x2="670"
            y2={y}
            stroke="#EBEBEB"
          />
        ))}

        {/* vertical event lines */}
        <line
          x1="383"
          y1="73"
          x2="383"
          y2="276"
          stroke="#EF4444"
          strokeDasharray="3 3"
          strokeWidth="1.5"
        />
        <line
          x1="615"
          y1="73"
          x2="615"
          y2="276"
          stroke="#C7CED9"
          strokeDasharray="2 2"
        />
        <line
          x1="657"
          y1="73"
          x2="657"
          y2="276"
          stroke="#C7CED9"
          strokeDasharray="2 2"
        />

        <text x="598" y="59" fontSize="10" fill="rgba(43,48,52,0.4)">
          승인 시점
        </text>
        <text x="640" y="59" fontSize="10" fill="rgba(43,48,52,0.4)">
          지급 시점
        </text>

        {/* red area */}
        <path
          d="M383 275V174.5L520 226L657 254V275H383Z"
          fill="url(#cashGapGradient)"
          opacity="0.5"
        />

        {/* cash gap line */}
        <path
          d="M112 73L246 124L383 174.5L520 226L657 254"
          stroke="#C7CED9"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M383 174.5L520 226L657 254"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* strategy 1 line */}
        <path
          d="M112 73L246 124L352 131.5L382.5 138.5L404 82L520 124L657 162"
          stroke="#185DC5"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* strategy 2 line */}
        {showStrategy2 && (
          <path
            d="M112 73L246 124L383.5 174.5L520.5 225.5L554 155.5L622.5 133L657.5 149"
            stroke="#149F70"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* red markers */}
        {[
          [383, 174],
          [520, 225],
          [657, 254],
        ].map(([cx, cy]) => (
          <g key={`red-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#EF4444" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        {/* gray markers */}
        {[
          [112, 73],
          [246, 123],
        ].map(([cx, cy]) => (
          <g key={`gray-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#C7CED9" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        {/* blue markers */}
        {[
          [112, 73],
          [246, 123],
          [353, 132],
          [383, 138],
          [404, 82],
          [523, 124],
          [657, 162],
        ].map(([cx, cy]) => (
          <g key={`blue-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="5" fill="#3778E3" />
            <circle cx={cx} cy={cy} r="2.5" fill="white" />
          </g>
        ))}

        {/* green markers */}
        {showStrategy2 &&
          [
            [112, 73],
            [246, 123],
            [383, 174],
            [520, 225],
            [554, 156],
            [622, 134],
            [658, 149],
          ].map(([cx, cy]) => (
            <g key={`green-${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="5" fill="#1BAB8B" />
              <circle cx={cx} cy={cy} r="2.5" fill="white" />
            </g>
          ))}

        {/* x-axis labels */}
        <text x="105" y="306" fontSize="12" fill="#989EA9">
          0일
        </text>
        <text x="235" y="306" fontSize="12" fill="#989EA9">
          30일
        </text>
        <text x="373" y="306" fontSize="12" fill="#989EA9">
          60일
        </text>
        <text x="510" y="306" fontSize="12" fill="#989EA9">
          90일
        </text>
        <text x="603" y="306" fontSize="12" fill="#989EA9">
          97일
        </text>
        <text x="646" y="306" fontSize="12" fill="#989EA9">
          111일
        </text>
        <text x="693" y="306" fontSize="10" fill="#989EA9">
          기준일: 26.04.13
        </text>
      </svg>

      <div className="absolute right-[57px] top-[48px] flex flex-col gap-[8px]">
        <LegendDot colorClass="border-warning-red bg-warning-red" label="현금 공백" />
        <LegendDot colorClass="border-button-blue bg-button-blue" label="맞춤 전략" />
      </div>
    </div>
  );
}