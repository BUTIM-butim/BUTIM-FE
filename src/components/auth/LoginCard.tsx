import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/button/Button";
import UnderlineButton from "../common/button/UnderlineButton";
import VisibilityIcon from "../common/icons/VisibilityIcon";
import LoginLongInput from "../common/input/LoginLongInput";
import ValidationMessage from "../common/input/ValidationMessage";
import LogoFullLogin from "../common/logo/LogoFullLogin";

const LoginCard = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && email.trim().length === 0;
  const passwordError = submitted && password.trim().length === 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!email.trim() || !password.trim()) {
      return;
    }

    // TODO: 로그인 API 연결
    console.log("login", { email, password });
  };

  return (
    <section className="flex h-[530px] w-[630px] flex-col items-center rounded-[24px] bg-white shadow-card-blue">
      <LogoFullLogin className="mt-[72px]" />

      <form onSubmit={handleSubmit} className="mt-[52px] flex flex-col">
        <LoginLongInput
          id="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          status={emailError ? "error" : "default"}
          onChange={(event) => setEmail(event.target.value)}
        />

        {emailError && (
          <ValidationMessage className="mt-[6px]">
            이메일을 입력해주세요.
          </ValidationMessage>
        )}

        <LoginLongInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type={passwordVisible ? "text" : "password"}
          value={password}
          status={passwordError ? "error" : "default"}
          onChange={(event) => setPassword(event.target.value)}
          containerClassName="mt-[17px]"
          rightElement={
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              aria-label={passwordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="flex cursor-pointer items-center justify-center"
            >
              <VisibilityIcon visible={passwordVisible} />
            </button>
          }
        />

        {passwordError && (
          <ValidationMessage className="mt-[6px]">
            비밀번호를 입력해주세요.
          </ValidationMessage>
        )}

        <div className="mt-[32px]">
          <Button variant="blue" size="login">
            로그인
          </Button>
        </div>
      </form>

      <div className="mt-[28px] flex items-center justify-center gap-[8px]">
        <span className="typo-popup-caption text-text-gray">
          아직 회원이 아니신가요?
        </span>

        <UnderlineButton size="large" onClick={() => navigate("/signup")}>
          회원가입 하기
        </UnderlineButton>
      </div>
    </section>
  );
};

export default LoginCard;
