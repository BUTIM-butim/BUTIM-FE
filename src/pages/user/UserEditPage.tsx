import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignupCard from "../../components/auth/SignupCard";
import { getUserMe, patchUserMe, type UserMeResponse } from "../../apis/user";

type TermKey = "privacy" | "service" | "age" | "sms";

const INITIAL_TERMS: TermKey[] = ["privacy", "service", "age"];

const formatPhoneNumber = (phoneNumber: string) => {
  const onlyNumbers = phoneNumber.replace(/\D/g, "").slice(0, 11);

  if (onlyNumbers.length <= 3) {
    return onlyNumbers;
  }

  if (onlyNumbers.length <= 7) {
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  }

  return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
    3,
    7,
  )}-${onlyNumbers.slice(7, 11)}`;
};

const UserEditPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserMeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserMe = async () => {
      try {
        const userMe = await getUserMe();
        setUser(userMe);
      } catch {
        alert("회원 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUserMe();
  }, [navigate]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-start justify-center bg-background-blue px-6 py-[16px]">
        <section className="flex w-[630px] items-center justify-center rounded-[24px] bg-white py-[120px] shadow-card-blue">
          <p className="typo-popup-body text-popup-gray">
            회원 정보를 불러오는 중입니다.
          </p>
        </section>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-background-blue px-6 py-[16px]">
      <SignupCard
        key={`${user.name}-${user.email}-${user.phoneNumber}`}
        mode="edit"
        initialName={user.name}
        initialEmail={user.email}
        initialPhone={formatPhoneNumber(user.phoneNumber)}
        initialTerms={INITIAL_TERMS}
        onEditComplete={async (values) => {
          await patchUserMe(values);

          // TODO:
          // 산재 정보 입력 여부에 따라
          // Main_로그인&정보 입력 후 또는 Main_로그인 후/정보 입력 전으로 이동
          navigate("/");
        }}
      />
    </main>
  );
};

export default UserEditPage;
