import Button from "../common/button/Button";

import calendarIcon from "../../assets/images/icon-calendar.svg";
import supportIcon from "../../assets/images/icon-support.svg";
import lockIcon from "../../assets/images/icon-lock.svg";
import cardBlueGraphic from "../../assets/images/card-blue-graphic.svg";
import cardGreenGraphic from "../../assets/images/card-green-graphic.svg";

import type { PreviewCardStatus, PreviewCardTone } from "../../types/main";

type PreviewCardProps = {
  tone: PreviewCardTone;
  status: PreviewCardStatus;
  onAction?: () => void;
};

type CardTitleIconProps = {
  tone: PreviewCardTone;
};

const CardTitleIcon = ({ tone }: CardTitleIconProps) => {
  const isBlue = tone === "blue";

  return (
    <img
      src={isBlue ? calendarIcon : supportIcon}
      alt=""
      aria-hidden="true"
      className="size-[33px] shrink-0"
    />
  );
};

const PreviewCard = ({ tone, status, onAction }: PreviewCardProps) => {
  const isBlue = tone === "blue";
  const isLocked = status === "locked";

  return (
    <section className="relative h-[322px] w-[606px] shrink-0 overflow-hidden rounded-[16px] bg-white shadow-card-blue">
      {/* 카드 제목 */}
      <div className="absolute left-[20px] top-[28px] flex items-center gap-[8px]">
        <CardTitleIcon tone={tone} />

        <h2 className="whitespace-nowrap text-text-black">
          {isBlue ? (
            <>
              <span className="typo-card-title-bold text-button-blue">
                승인까지 얼마나
              </span>

              <span className="typo-card-title text-text-black">
                {" "}
                걸릴까요?
              </span>
            </>
          ) : (
            <>
              <span className="typo-card-title text-text-black">
                그 기간 동안,{" "}
              </span>

              <span className="typo-card-title-bold text-button-green">
                어떻게 버틸 수
              </span>

              <span className="typo-card-title text-text-black">
                {" "}
                있을까요?
              </span>
            </>
          )}
        </h2>
      </div>

      {/* 카드 내부 결과 영역 */}
      <div
        className={`absolute left-[20px] top-[88px] h-[214px] w-[566px] overflow-hidden rounded-[16px] ${
          isBlue ? "bg-card-background-blue" : "bg-card-background-green"
        }`}
      >
        <img
          src={isBlue ? cardBlueGraphic : cardGreenGraphic}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-[99px] w-[349px]"
        />

        {isBlue ? (
          <>
            {/* 승인 기간 결과 */}
            <div className="absolute left-[20px] top-[20px]">
              <p className="typo-card-body-medium text-text-dark-gray">
                예상 승인 기간
              </p>

              <p className="mt-[6px] text-text-blue">
                <span className="typo-figure-bold">85~110</span>
                <span className="typo-figure">일</span>
              </p>
            </div>

            <p className="absolute bottom-[74px] left-[20px] typo-card-body text-text-dark-gray">
              평균 97일 내 승인되며, 실제 지급 시점은 약 111일입니다.
            </p>

            {!isLocked && (
              <div className="absolute bottom-[16px] right-[16px]">
                <Button
                  size="card"
                  variant="blue"
                  hasArrow
                  arrowDirection="right"
                  onClick={onAction}
                  className="w-[156px]"
                >
                  자세히 보기
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* 전략 결과 */}
            <p className="absolute left-[20px] top-[20px] typo-card-body text-text-dark-gray">
              약 60일 후 자금이 부족할 것으로 예상됩니다.
            </p>

            <p className="absolute bottom-[126px] left-[20px] typo-card-body text-text-dark-gray">
              <span className="font-semibold text-text-green">지원금</span>

              <span> + </span>

              <span className="font-semibold text-text-green">저금리 대출</span>

              <span> 조합의 전략을 추천드립니다.</span>
            </p>

            {!isLocked && (
              <div className="absolute bottom-[16px] right-[16px]">
                <Button
                  size="card"
                  variant="green"
                  hasArrow
                  arrowDirection="right"
                  onClick={onAction}
                  className="w-[173px]"
                >
                  전략 확인하기
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 잠금 상태 오버레이 */}
      {isLocked && (
        <div
          className={`absolute left-[20px] top-[88px] flex h-[214px] w-[566px] flex-col items-center justify-center gap-[10px] rounded-[16px] backdrop-blur-[5px] ${
            isBlue
              ? "bg-[linear-gradient(180deg,#F2F6FE_4.202%,rgba(242,246,254,0.6)_72.223%,rgba(242,246,254,0.4)_100%)]"
              : "bg-[linear-gradient(180deg,#EDF8F7_4.202%,rgba(237,248,247,0.6)_53.978%,rgba(237,248,247,0.4)_100%)]"
          }`}
        >
          <img
            src={lockIcon}
            alt=""
            aria-hidden="true"
            className="size-[42px]"
          />

          <p className="typo-caption-semibold text-text-gray">
            정보 입력 후 확인할 수 있습니다.
          </p>
        </div>
      )}
    </section>
  );
};

export default PreviewCard;
