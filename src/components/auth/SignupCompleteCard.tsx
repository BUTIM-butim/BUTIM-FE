import Button from "../common/button/Button";
import LogoFullLogin from "../common/logo/LogoFullLogin";

const SignupCompleteCard = () => {
  const handleStartInfoInput = () => {
    // TODO: 산재 정보_1 페이지 생성 후 이동 연결
    // 예: navigate("/accident-info/step1");
  };

  return (
    <section className="flex w-[630px] flex-col items-center rounded-[16px] bg-white shadow-popup">
      <div className="mt-[64px]">
        <LogoFullLogin />
      </div>

      <h1 className="typo-popup-title mt-[40px] text-text-black">
        회원가입이 완료되었습니다
      </h1>

      <p className="typo-popup-body mt-[20px] text-center text-popup-gray">
        정보를 입력하고 산재 승인 시기와
        <br />
        소득 공백 대응 전략을 확인해보세요.
      </p>

      <Button
        variant="blue"
        size="popup"
        type="button"
        onClick={handleStartInfoInput}
        className="mt-[40px] mb-[50px] !w-[375px]"
      >
        정보 입력 시작하기
      </Button>
    </section>
  );
};

export default SignupCompleteCard;
