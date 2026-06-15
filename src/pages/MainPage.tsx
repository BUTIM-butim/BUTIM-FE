import { useNavigate } from 'react-router-dom';

import Header from '../components/layout/Header';
import GoIcon from '../components/common/icons/GoIcon';
import { ROUTES } from '../constants/routes';
import type { PreviewCardTone } from '../types/main';
import heroBackground from '../assets/images/hero-background.svg';
import symbolGraphic from '../assets/images/symbol-graphic.svg';
import calendarIcon from '../assets/images/icon-calendar.svg';
import supportIcon from '../assets/images/icon-support.svg';
import lockIcon from '../assets/images/icon-lock.svg';
import cardBlueGraphic from '../assets/images/card-blue-graphic.svg';
import cardGreenGraphic from '../assets/images/card-green-graphic.svg';

type PreviewCardProps = {
  tone: PreviewCardTone;
};

const CardTitleIcon = ({ tone }: PreviewCardProps) => {
  const isBlue = tone === 'blue';

  return (
    <span className="relative size-[33px] shrink-0">
      <span className={`absolute ${isBlue ? 'inset-[8.33%_12.5%]' : 'inset-[16.67%_8.33%]'}`}>
        <img src={isBlue ? calendarIcon : supportIcon} alt="" className="size-full" />
      </span>
    </span>
  );
};

const LockIcon = () => (
  <span className="relative size-[42px] shrink-0 overflow-hidden">
    <span className="absolute inset-[8.33%_20.83%_12.5%_20.83%]">
      <img src={lockIcon} alt="" className="size-full" />
    </span>
  </span>
);

const PreviewCard = ({ tone }: PreviewCardProps) => {
  const isBlue = tone === 'blue';

  return (
    <section className="relative h-[322px] w-[606px] overflow-hidden rounded-2xl bg-white shadow-card-blue">
      <div className="absolute left-5 top-7 flex items-center gap-2">
        <CardTitleIcon tone={tone} />
        <h2 className="typo-card-title text-text-black">
          {isBlue ? (
            <>
              <span className="font-bold text-button-blue">승인까지 얼마나</span>
              <span> 걸릴까요?</span>
            </>
          ) : (
            <>
              <span>그 기간 동안, </span>
              <span className="font-bold text-button-green">어떻게 버틸 수</span>
              <span> 있을까요?</span>
            </>
          )}
        </h2>
      </div>

      <div
        className={`absolute left-1/2 top-[88px] h-[214px] w-[566px] -translate-x-1/2 overflow-hidden rounded-2xl ${
          isBlue ? 'bg-card-background-blue' : 'bg-card-background-green'
        }`}
      >
        <img
          src={isBlue ? cardBlueGraphic : cardGreenGraphic}
          alt=""
          className="absolute bottom-0 right-0 h-[99px] w-[349px]"
        />
        {isBlue ? (
          <div className="absolute left-5 top-5 flex w-[504px] flex-col gap-2 text-text-dark-gray">
            <div className="flex flex-col gap-1.5">
              <p className="typo-card-body-medium">예상 승인 기간</p>
              <p className="text-text-blue">
                <span className="typo-figure-bold">85~110</span>
                <span className="typo-figure">일</span>
              </p>
            </div>
            <p className="typo-card-body">평균 97일 내 승인되며, 실제 지급 시점은 약 111일입니다.</p>
          </div>
        ) : (
          <div className="absolute left-5 top-5 flex w-[504px] flex-col gap-4 text-text-dark-gray">
            <p className="typo-card-body">약 60일 후 자금이 부족할 것으로 예상됩니다.</p>
            <p className="typo-card-body">
              <span className="font-semibold text-text-green">지원금</span>
              <span> + </span>
              <span className="font-semibold text-text-green">저금리 대출</span>
              <span> 조합의 전략을 추천드립니다.</span>
            </p>
          </div>
        )}
      </div>

      <div
        className={`absolute left-5 top-[88px] flex h-[214px] w-[566px] flex-col items-center justify-center gap-2.5 rounded-2xl backdrop-blur-[5px] ${
          isBlue
            ? 'bg-[linear-gradient(180deg,#f2f6fe_5.108%,rgba(242,246,254,0.6)_87.794%,rgba(242,246,254,0.4)_121.56%)]'
            : 'bg-[linear-gradient(180deg,#edf8f7_4.202%,rgba(237,248,247,0.6)_53.978%,rgba(237,248,247,0.4)_100%)]'
        }`}
      >
        <LockIcon />
        <p className="typo-caption-semibold text-text-gray">정보 입력 후 확인할 수 있습니다.</p>
      </div>
    </section>
  );
};

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="relative min-h-[839px] overflow-hidden bg-background-blue">
        <div className="absolute left-0 top-[-147px] h-[542px] w-[1512px]">
          <div className="absolute inset-[-0.74%_-0.26%]">
            <img src={heroBackground} alt="" className="block size-full max-w-none" />
          </div>
        </div>

        <div className="absolute left-[calc(79.17%-28.25px)] top-[calc(50%-172.12px)] flex h-[332.752px] w-[355.509px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="-rotate-[11.3deg]">
            <img src={symbolGraphic} alt="" className="h-[278px] w-[307px]" />
          </div>
        </div>

        <div className="absolute left-[120px] top-[calc(50%+22px)] flex w-[1272px] -translate-y-1/2 flex-col gap-[68px]">
          <section className="flex h-[247px] w-[795px] flex-col items-start gap-9">
            <h1 className="typo-hero-title whitespace-nowrap text-text-black">
              산재 승인까지, 소득 공백을{' '}
              <span className="text-hero-text-blue">함께 대비합니다</span>
            </h1>

            <div className="flex w-[504px] flex-col gap-3 typo-hero-body text-text-dark-gray">
              <p>산재 신청이 승인되기까지 걸리는 시간을 예측하고,</p>
              <p>그 기간 동안 버틸 수 있는 지원 전략을 추천해드립니다.</p>
            </div>

            <button
              type="button"
              onClick={() => navigate(ROUTES.ACCIDENT)}
              className="flex cursor-pointer items-center gap-[10px] rounded-[10px] bg-button-blue px-[18px] py-[14px] typo-button-main-hero text-white"
            >
              정보 입력하고 결과 확인하기
              <GoIcon size="large" direction="right" />
            </button>
          </section>

          <div className="flex w-full items-center justify-between">
            <PreviewCard tone="blue" />
            <PreviewCard tone="green" />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
