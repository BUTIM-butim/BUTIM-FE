import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { periodApi, type PredictionResult } from '../../apis/period';
import { ROUTES } from '../../constants/routes';
import Sidebar from '../../components/layout/Sidebar';
import CheckIcon from '../../components/common/icons/CheckIcon';
import LogoFullLogin from '../../components/common/logo/LogoFullLogin';
import LoadingOverlay from '../../components/common/loading/LoadingOverlay';

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}

// ─── 프로그레스 바 ────────────────────────────────────────────────────
// Figma: 5세그먼트 × 135px, gap 2px, 총 bar 685px (group width)
// 세그먼트 경계 흰색 오버레이: x=135, 272, 409, 546
const SEG_W = 135;
const SEG_GAP = 2;
const SEG_N = 5;
const BAR_W = 685; // Figma layout_870EHR width

const SEG_DIVIDERS = [135, 272, 409, 546];

const RELIABILITY_MAP: Record<string, number> = {
  '매우 낮음': 1,
  '낮음': 2,
  '보통': 3,
  '높음': 4,
  '매우 높음': 5,
};

function getFilledSegments(reliability: string, score: number): number {
  if (RELIABILITY_MAP[reliability] !== undefined) {
    return RELIABILITY_MAP[reliability];
  }
  return Math.min(SEG_N, Math.max(0, Math.round(score / 20)));
}

// 피그마 Card/Reliability > Progress Bar (layout_3RO1BE)
// col, gap 11px, width 685 — 라벨 없음 (라벨은 외부에서 렌더)
function ReliabilityProgressBar({
  reliability,
  score,
}: {
  reliability: string;
  score: number;
}) {
  const filled = getFilledSegments(reliability, score);
  const filledW =
    filled === 0
      ? 0
      : filled === SEG_N
        ? BAR_W
        : filled * SEG_W + (filled - 1) * SEG_GAP;

  return (
    <div
      className="flex flex-col items-center gap-[11px]"
      style={{ width: `${BAR_W}px` }}
    >
      {/* 바 (685×13) */}
      <div className="relative" style={{ width: `${BAR_W}px`, height: '13px' }}>
        {/* 5개 회색 세그먼트 */}
        <div className="flex h-full gap-[2px]">
          {Array.from({ length: SEG_N }, (_, i) => (
            <div
              key={i}
              className="h-full flex-none bg-[#EAEBEF]"
              style={{
                width: `${SEG_W}px`,
                borderRadius:
                  i === 0
                    ? '4px 0 0 4px'
                    : i === SEG_N - 1
                      ? '0 4px 4px 0'
                      : '0',
              }}
            />
          ))}
        </div>

        {/* 파란 gradient 오버레이 */}
        {filledW > 0 && (
          <div
            className="absolute left-0 top-0 h-full"
            style={{
              width: `${filledW}px`,
              background: 'linear-gradient(90deg, #C4DAFF 0%, #3778E3 100%)',
              borderRadius: '4px 0 0 4px',
            }}
          />
        )}

        {/* 세그먼트 경계 흰색 구분선 */}
        {SEG_DIVIDERS.map((x) => (
          <div
            key={x}
            className="absolute top-0 bg-white"
            style={{ left: `${x}px`, width: '2px', height: '13px' }}
          />
        ))}
      </div>

      {/* 눈금 레이블 (gap 111px) */}
      <div className="flex items-center gap-[111px]">
        {['20%', '40%', '60%', '80%'].map((label) => (
          <span key={label} className="typo-warning-text text-placeholder-gray">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── 페이지 ──────────────────────────────────────────────────────────
export default function PeriodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromFlow = Boolean(
    (location.state as { fromFlow?: boolean } | null)?.fromFlow,
  );

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [predicting, setPredicting] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const existing = await periodApi.getExisting();
        if (existing) {
          setResult(existing);
          return;
        }
        // 플로우 진입 시에만 POST 자동 실행
        if (!fromFlow) return;
        setPredicting(true);
        const newResult = await periodApi.predict();
        setResult(newResult);
      } catch {
        setError('예측 정보를 불러오는 데 실패했습니다.');
      } finally {
        setPredicting(false);
        setInitialized(true);
      }
    }
    load();
  }, [fromFlow]);

  // 공통 카드 렌더
  const cards = result && (
    <>
      <div className="flex flex-col gap-[15px]">
        {/* 카드 1: 예상 승인 기간 */}
        <div className="w-[800px] rounded-[12px] bg-white pb-[30px] pl-[32px] pr-[32px] pt-[26px] shadow-card-blue">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span className="typo-inform-sub-section text-text-black">
                예상 승인 기간
              </span>
              <div className="flex items-end gap-[6px]">
                <span className="leading-none typo-figure-extra text-button-blue">
                  {result.predictionMinDays}~{result.predictionMaxDays}
                </span>
                <span className="leading-none typo-card-title text-button-blue">
                  일
                </span>
              </div>
            </div>

            <div className="rounded-[12px] bg-background-blue py-[34px] pl-[32px] pr-[32px]">
              <div className="flex flex-col gap-[10px]">
                {[
                  `${formatDate(result.createdAt)} 기준, 승인까지 약 ${result.predictionMinDays}~${result.predictionMaxDays}일 정도 소요될 수 있어요.`,
                  `평균적으로 약 ${result.predictionMedianDays}일 내 승인 될 것으로 예상돼요.`,
                  `실제 지급 시점은 약 ${result.paymentDays}일로 예상돼요. (승인 후 약 2주 소요)`,
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-[8px]">
                    <CheckIcon variant="plainBlue" checked className="mt-[2px] shrink-0" />
                    <span className="typo-navbar-button text-title-gray">{text}</span>
                  </div>
                ))}
                <div className="flex items-start gap-[8px]">
                  <CheckIcon variant="plainBlue" checked className="mt-[2px] shrink-0" />
                  <span className="typo-navbar-button text-title-gray">
                    {fromFlow ? '재정 정보를 입력하면' : '맞춤 전략 페이지에서'}{' '}
                    <strong className="font-semibold text-button-blue">
                      지급 시점(약 {result.paymentDays}일)
                    </strong>
                    을 기준으로 현금 공백 시기와 대응 전략을 확인할 수 있어요.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 2: 예측 신뢰도 */}
        <div className="w-[800px] rounded-[12px] bg-white pb-[30px] pl-[32px] pr-[32px] pt-[26px] shadow-card-blue">
          <div className="flex flex-col gap-[24px]">
            <span className="typo-inform-sub-section text-text-black">예측 신뢰도</span>

            <div className="flex flex-col items-center gap-[24px]">
              <div className="flex w-[736px] flex-col items-center justify-center rounded-[10px] bg-background-blue px-[25px] py-[24px]">
                <div className="flex w-[685px] flex-col items-center gap-[24px]">
                  <div className="flex items-center gap-[16px]">
                    <span className="rounded-[4px] border border-button-gray bg-white p-[4px] typo-warning-text text-number-gray">
                      신뢰도
                    </span>
                    <span className="typo-card-body-semibold text-text-black">
                      {result.reliability}
                    </span>
                  </div>
                  <ReliabilityProgressBar
                    reliability={result.reliability}
                    score={result.reliabilityScore}
                  />
                </div>
              </div>

              <button
                type="button"
                className="cursor-pointer typo-navbar-button text-navbar-blue"
              >
                유사 판례 {result.similarCaseCount}건 기반 분석
              </button>

              <div className="w-[736px] rounded-[10px]">
                <div className="flex flex-col gap-[24px]">
                  <div className="flex items-center gap-[8px]">
                    <CheckIcon variant="plainBlue" checked className="shrink-0" />
                    <span className="typo-popup-button text-text-black">버팀 AI 판단 근거</span>
                  </div>
                  <div className="flex flex-col gap-[14px] px-[36px]">
                    {result.analysisReasons.map((reason, i) => (
                      <Fragment key={i}>
                        <div className="flex items-start gap-[8px]">
                          <CheckIcon variant="plainBlue" checked className="mt-[2px] shrink-0" />
                          <span className="typo-navbar-button text-title-gray">{reason}</span>
                        </div>
                        {i < result.analysisReasons.length - 1 && (
                          <div className="h-px w-full bg-line-gray opacity-70" />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex w-[800px] justify-between">
        <button
          type="button"
          className="invisible flex items-center gap-[6px] rounded-[10px] bg-button-background-gray px-[16px] py-[12px] typo-navbar-button text-button-gray"
        >
          이전 단계
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(fromFlow ? ROUTES.FINANCIAL_INFO : ROUTES.STRATEGY_RESULT)
          }
          className="cursor-pointer flex items-center gap-[6px] rounded-[10px] bg-button-blue px-[16px] py-[12px] typo-navbar-button text-white"
        >
          {fromFlow ? '재정 정보 입력하고 전략 확인하기' : '맞춤 전략 확인하기'}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4.5 9L7.5 6L4.5 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );

  // ── 플로우 진입 (사이드바 O, 원래 레이아웃) ──
  if (fromFlow) {
    return (
      <div className="min-h-screen bg-background-blue">
        <Sidebar currentSectionId="prediction" />
        <main className="relative ml-[288px] min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute right-[-35px] top-[205px] opacity-[0.03]">
            <div className="bg-logo-gradient bg-clip-text text-[480px] font-bold leading-none text-transparent">
              버
            </div>
          </div>
          <section className="relative z-10 ml-[135px] pb-[80px] pt-[111px]">
            <div className="flex w-[800px] flex-col gap-[56px]">
              <div className="flex flex-col gap-[8px]">
                <h1 className="typo-inform-title-section text-text-black">예측 승인 기간</h1>
                <p className="typo-inform-title-caption text-title-gray">
                  입력하신 정보를 바탕으로 분석한 산재 승인 기간입니다.
                </p>
              </div>
              {predicting && <LoadingOverlay />}
              {error && <p className="typo-warning-text text-warning-red">{error}</p>}
              {cards}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ── 헤더 진입 + GET 로딩 중 ──
  if (!fromFlow && !initialized) {
    return <div className="min-h-screen bg-background-blue" />;
  }

  // ── 헤더 진입 + 데이터 없음 (Card/No Result) ──
  if (!fromFlow && initialized && !result) {
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
            <div className="flex w-[630px] flex-col items-center rounded-[16px] bg-white px-[127px] pb-[50px] pt-[64px] shadow-card-blue">
              <LogoFullLogin className="h-auto w-[137px]" />
              <h1 className="mt-[40px] w-[396px] text-center text-[34px] font-semibold leading-[140%] tracking-[-0.02em] text-text-black">
                예상 기간 확인을 위해
                <br />
                정보 입력이 필요합니다
              </h1>
              <p className="mt-[20px] w-[396px] text-center text-[20px] font-normal leading-[160%] tracking-[-0.02em] text-popup-gray">
                정보 입력을 완료하면 입력하신 정보를 바탕으로
                <br />
                예상 승인 기간과 예측 신뢰도를 확인할 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ACCIDENT)}
                className="mt-[40px] flex h-[53px] w-[396px] cursor-pointer items-center justify-center rounded-[10px] bg-button-blue text-[18px] font-semibold leading-[21px] text-white"
              >
                정보 입력하러 가기
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ── 헤더 진입 (사이드바 X, 중앙 정렬) ──
  return (
    <div className="min-h-screen bg-background-blue">
      <main className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute right-[-35px] top-[205px] opacity-[0.03]">
          <div className="bg-logo-gradient bg-clip-text text-[480px] font-bold leading-none text-transparent">
            버
          </div>
        </div>
        <section className="relative z-10 flex justify-center pb-[80px] pt-[111px]">
          <div className="flex w-[800px] flex-col gap-[56px]">
            <div className="flex flex-col gap-[8px]">
              <h1 className="typo-inform-title-section text-text-black">예상 기간</h1>
              <p className="typo-inform-title-caption text-title-gray">
                입력하신 정보를 바탕으로 분석한 산재 승인 기간입니다.
              </p>
            </div>
            {error && <p className="typo-warning-text text-warning-red">{error}</p>}
            {cards}
          </div>
        </section>
      </main>
    </div>
  );
}
