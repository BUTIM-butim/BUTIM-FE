import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { postLogin } from "../../apis/auth";
import Button from "../common/button/Button";
import UnderlineButton from "../common/button/UnderlineButton";
import VisibilityIcon from "../common/icons/VisibilityIcon";
import LoginLongInput from "../common/input/LoginLongInput";
import ValidationMessage from "../common/input/ValidationMessage";
import LoadingOverlay from "../common/loading/LoadingOverlay";
import LogoFullLogin from "../common/logo/LogoFullLogin";

type InputStatus = "default" | "error";

const LoginCard = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState<InputStatus>("default");
  const [passwordStatus, setPasswordStatus] = useState<InputStatus>("default");
  const [isLoading, setIsLoading] = useState(false);

  const resetError = () => {
    if (!errorMessage) return;

    setErrorMessage("");
    setEmailStatus("default");
    setPasswordStatus("default");
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    resetError();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    resetError();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail && !trimmedPassword) {
      setErrorMessage("이메일과 비밀번호를 정확히 입력해주세요.");
      setEmailStatus("error");
      setPasswordStatus("error");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("이메일을 입력해주세요.");
      setEmailStatus("error");
      setPasswordStatus("default");
      return;
    }

    if (!trimmedPassword) {
      setErrorMessage("비밀번호를 입력해주세요.");
      setEmailStatus("default");
      setPasswordStatus("error");
      return;
    }

    try {
      setIsLoading(true);

      const loginData = await postLogin({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("refreshToken", loginData.refreshToken);
      localStorage.setItem("userName", loginData.name);

      navigate("/");

      // TODO: 메인 페이지 구현 시 산재정보 입력 여부에 따라 화면 상태 분기 필요
      // - 산재정보 입력 전: Main_로그인 후/정보 입력 전
      // - 산재정보 입력 후: Main_로그인&정보 입력 후
      // - 산재정보 입력 여부 기준 API: GET /api/accident-info/me
    } catch {
      setErrorMessage("이메일과 비밀번호를 정확히 입력해주세요.");
      setEmailStatus("error");
      setPasswordStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <section className="flex min-h-[530px] w-[630px] max-w-[calc(100vw-40px)] flex-col items-center rounded-[24px] bg-white shadow-card-blue">
        <LogoFullLogin className="mt-[71px]" />

        <form onSubmit={handleSubmit} className="mt-[52px] flex flex-col">
          <LoginLongInput
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            value={email}
            status={emailStatus}
            onChange={handleEmailChange}
            autoComplete="email"
          />

          <LoginLongInput
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type={passwordVisible ? "text" : "password"}
            value={password}
            status={passwordStatus}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            containerClassName="mt-[18px]"
            rightElement={
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                aria-label={
                  passwordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                }
                className="flex cursor-pointer items-center justify-center"
              >
                <VisibilityIcon visible={passwordVisible} />
              </button>
            }
          />

          {errorMessage && (
            <div className="mt-[16px] h-[14px]">
              <ValidationMessage>{errorMessage}</ValidationMessage>
            </div>
          )}

          <div className="mt-[32px]">
            <Button
              variant="blue"
              size="login"
              type="submit"
              disabled={isLoading}
            >
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
    </>
  );
};

export default LoginCard;
