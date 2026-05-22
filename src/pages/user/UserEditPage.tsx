import SignupCard from "../../components/auth/SignupCard";

const UserEditPage = () => {
  return (
    <main className="flex min-h-screen items-start justify-center bg-background-blue px-6 py-[16px]">
      <SignupCard
        mode="edit"
        initialName="홍길동"
        initialEmail="example@example.com"
        initialPhone="010-1234-5678"
        initialTerms={["privacy", "service", "age"]}
        onEditComplete={(values) => {
          console.log("회원 정보 수정 완료", values);

          // TODO:
          // 회원 정보 수정 API 연결
          // 완료 후 사용자의 산재 정보 입력 여부에 따라 메인 화면으로 이동
        }}
      />
    </main>
  );
};

export default UserEditPage;
