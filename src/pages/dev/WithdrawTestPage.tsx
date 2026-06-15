import WithdrawTestButton from "../../components/user/WithdrawTestButton";

const WithdrawTestPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background-blue px-6">
      <section className="flex w-[630px] flex-col items-center rounded-[24px] bg-white px-[64px] py-[64px] shadow-card-blue">
        <h1 className="typo-card-body-semibold text-text-black">
          회원 탈퇴 기능 테스트
        </h1>

        <p className="typo-popup-body mt-[16px] text-center text-popup-gray">
          버튼을 누르면 회원 탈퇴 확인 팝업이 표시됩니다.
        </p>

        <div className="mt-[40px] w-[331px]">
          <WithdrawTestButton />
        </div>
      </section>
    </main>
  );
};

export default WithdrawTestPage;
