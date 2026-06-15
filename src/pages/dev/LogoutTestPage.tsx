// 네브바에 로그아웃 연결하고 삭제
import LogoutTestButton from "../../components/auth/LogoutTestButton";

const LogoutTestPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background-blue px-6">
      <section className="flex w-[630px] flex-col items-center rounded-[24px] bg-white px-[64px] py-[64px] shadow-card-blue">
        <h1 className="typo-card-body-semibold text-text-black">
          로그아웃 기능 테스트
        </h1>

        <p className="typo-popup-body mt-[16px] text-center text-popup-gray">
          로그아웃 버튼을 누르면 서버 로그아웃 API가 호출되고 로그인 페이지로
          이동합니다.
        </p>

        <div className="mt-[40px] w-[331px]">
          <LogoutTestButton />
        </div>
      </section>
    </main>
  );
};

export default LogoutTestPage;
