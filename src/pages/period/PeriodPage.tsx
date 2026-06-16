import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { periodApi, type PredictionResult } from '../../apis/period';
import { ROUTES } from '../../constants/routes';
import Sidebar from '../../components/layout/Sidebar';
import CheckIcon from '../../components/common/icons/CheckIcon';

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
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // 기존 결과가 있으면 바로 표시, 없으면 새 예측 실행
        const existing = await periodApi.getExisting();
        if (existing) {
          setResult(existing);
        } else {
          const newResult = await periodApi.predict();
          setResult(newResult);
        }
      } catch {
        setError('예측 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
            {/* 페이지 타이틀 */}
            <div className="flex flex-col gap-[8px]">
              <h1 className="typo-inform-title-section text-text-black">
                예측 승인 기간
              </h1>
              <p className="typo-inform-title-caption text-title-gray">
                입력하신 정보를 바탕으로 분석한 산재 승인 기간입니다.
              </p>
            </div>

            {loading && (
              <p className="typo-navbar-button text-title-gray">
                예측 중입니다...
              </p>
            )}
            {error && (
              <p className="typo-warning-text text-warning-red">{error}</p>
            )}

            {result && (
              <>
                <div className="flex flex-col gap-[15px]">
                  {/* ─── 카드 1: 예상 승인 기간 ─── */}
                  <div className="w-[800px] rounded-[12px] bg-white pb-[30px] pl-[32px] pr-[32px] pt-[26px] shadow-card-blue">
                    <div className="flex flex-col gap-[20px]">
                      {/* 헤더: 제목(좌) + 기간(우) — 바닥 끝 맞춤 */}
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

                      {/* Card/Text/Content */}
                      <div className="rounded-[12px] bg-background-blue py-[34px] pl-[32px] pr-[32px]">
                        <div className="flex flex-col gap-[10px]">
                          {[
                            `${formatDate(result.createdAt)} 기준, 승인까지 약 ${result.predictionMinDays}~${result.predictionMaxDays}일 정도 소요될 수 있어요.`,
                            `평균적으로 약 ${result.predictionMedianDays}일 내 승인 될 것으로 예상돼요.`,
                            `실제 지급 시점은 약 ${result.paymentDays}일로 예상돼요. (승인 후 약 2주 소요)`,
                          ].map((text, i) => (
                            <div key={i} className="flex items-start gap-[8px]">
                              <CheckIcon
                                variant="plainBlue"
                                checked
                                className="mt-[2px] shrink-0"
                              />
                              <span className="typo-navbar-button text-title-gray">
                                {text}
                              </span>
                            </div>
                          ))}
                          <div className="flex items-start gap-[8px]">
                            <CheckIcon
                              variant="plainBlue"
                              checked
                              className="mt-[2px] shrink-0"
                            />
                            <span className="typo-navbar-button text-title-gray">
                              재정 정보를 입력하면{' '}
                              <strong className="font-semibold text-button-blue">
                                지급 시점(약 {result.paymentDays}일)
                              </strong>
                              을 기준으로 현금 공백 시기와 대응 전략을 확인할
                              수 있어요.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─── 카드 2: 예측 신뢰도 ─── */}
                  <div className="w-[800px] rounded-[12px] bg-white pb-[30px] pl-[32px] pr-[32px] pt-[26px] shadow-card-blue">
                    <div className="flex flex-col gap-[24px]">
                      <span className="typo-inform-sub-section text-text-black">
                        예측 신뢰도
                      </span>

                      <div className="flex flex-col items-center gap-[24px]">
                        {/* Card/Reliability (507-34660)
                            - width 736, padding 24px 25px, rounded 10px, bg #F9FAFC
                            - 내부: col, items-center, gap 24px, width 685
                            - Label: row gap 16px, hug → 부모 items-center로 자동 중앙 정렬 */}
                        <div className="flex w-[736px] flex-col items-center justify-center rounded-[10px] bg-background-blue px-[25px] py-[24px]">
                          <div className="flex w-[685px] flex-col items-center gap-[24px]">
                            {/* 라벨: hug-width → 부모 items-center에 의해 중앙 정렬 */}
                            <div className="flex items-center gap-[16px]">
                              <span className="rounded-[4px] border border-button-gray bg-white p-[4px] typo-warning-text text-number-gray">
                                신뢰도
                              </span>
                              <span className="typo-card-body-semibold text-text-black">
                                {result.reliability}
                              </span>
                            </div>
                            {/* 프로그레스 바 */}
                            <ReliabilityProgressBar
                              reliability={result.reliability}
                              score={result.reliabilityScore}
                            />
                          </div>
                        </div>

                        {/* 유사 판례 버튼 */}
                        <button
                          type="button"
                          className="typo-navbar-button text-navbar-blue"
                        >
                          유사 판례 {result.similarCaseCount}건 기반 분석
                        </button>

                        {/* Card/Text/Title */}
                        <div className="w-[736px] rounded-[10px]">
                          <div className="flex flex-col gap-[24px]">
                            <div className="flex items-center gap-[8px]">
                              <CheckIcon
                                variant="plainBlue"
                                checked
                                className="shrink-0"
                              />
                              <span className="typo-popup-button text-text-black">
                                버팀 AI 판단 근거
                              </span>
                            </div>

                            <div className="flex flex-col gap-[14px] px-[36px]">
                              {result.analysisReasons.map((reason, i) => (
                                <Fragment key={i}>
                                  <div className="flex items-start gap-[8px]">
                                    <CheckIcon
                                      variant="plainBlue"
                                      checked
                                      className="mt-[2px] shrink-0"
                                    />
                                    <span className="typo-navbar-button text-title-gray">
                                      {reason}
                                    </span>
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
                    onClick={() => navigate(ROUTES.FINANCIAL_INFO)}
                    className="flex items-center gap-[6px] rounded-[10px] bg-button-blue px-[16px] py-[12px] typo-navbar-button text-white"
                  >
                    재정 정보 입력하고 전략 확인하기
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
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
