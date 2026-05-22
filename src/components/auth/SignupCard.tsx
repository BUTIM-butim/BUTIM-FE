import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import logoFullLogin from "../../assets/logo-full-login.svg";

import TermsAgreementModal from "./TermsAgreementModal";
import Button from "../common/button/Button";
import UnderlineButton from "../common/button/UnderlineButton";
import CheckButton from "../common/check/CheckButton";
import LoginLongInput from "../common/input/LoginLongInput";
import LoginPasswordInput from "../common/input/LoginPasswordInput";
import LoginPhoneNumberInput from "../common/input/LoginPhoneNumberInput";
import ValidationMessage from "../common/input/ValidationMessage";
import SignupCompleteCard from "./SignupCompleteCard";

type SignupCardMode = "signup" | "edit";

type SignupCardProps = {
  mode?: SignupCardMode;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialTerms?: TermKey[];
  onEditComplete?: (values: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    termsAgreed: boolean;
    pushAlarmAgreed: boolean;
  }) => void;
};

type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  verificationCode?: string;
  terms?: string;
};

type TermKey = "privacy" | "service" | "age" | "sms";

type ErrorSlotProps = {
  message?: string;
};

const REQUIRED_TERMS: TermKey[] = ["privacy", "service", "age"];
const ALL_TERMS: TermKey[] = ["privacy", "service", "age", "sms"];

const TERM_CAPTION_LABELS: Record<TermKey, string> = {
  privacy: "개인정보 취급방침",
  service: "서비스 이용약관",
  age: "만 14세 이상 이용 동의",
  sms: "문자 수신 동의",
};

const DEFAULT_TERMS_CAPTION =
  "개인정보 취급방침 · 서비스 이용약관 · 만 14세 이상 이용 동의 (필수) | 문자 수신 동의 (선택)";

const TEST_VERIFICATION_CODE = "1234"; // 테스트를 위해 기본 비밀번호를 1234로 설정

const ErrorSlot = ({ message }: ErrorSlotProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-[10px]">
      <ValidationMessage>{message}</ValidationMessage>
    </div>
  );
};

const SignupCard = ({
  mode = "signup",
  initialName = "",
  initialEmail = "",
  initialPhone = "",
  initialTerms = [],
  onEditComplete,
}: SignupCardProps) => {
  const isEditMode = mode === "edit";

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [phone, setPhone] = useState(initialPhone);
  const [verifiedPhone, setVerifiedPhone] = useState(initialPhone);
  const [verificationCode, setVerificationCode] = useState("");

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(Boolean(initialPhone));

  const [selectedTerms, setSelectedTerms] = useState<TermKey[]>(initialTerms);
  const [isTermsSelectedFromModal, setIsTermsSelectedFromModal] = useState(
    initialTerms.length > 0 && initialTerms.length < ALL_TERMS.length,
  );
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);

  const isAllRequiredTermsChecked = REQUIRED_TERMS.every((term) =>
    selectedTerms.includes(term),
  );

  const isAllTermsChecked = ALL_TERMS.every((term) =>
    selectedTerms.includes(term),
  );

  const getSelectedTermsCaption = (terms: TermKey[]) => {
    const requiredSelectedTerms = terms.filter((term) =>
      REQUIRED_TERMS.includes(term),
    );

    const optionalSelectedTerms = terms.filter(
      (term) => !REQUIRED_TERMS.includes(term),
    );

    const captionParts: string[] = [];

    if (requiredSelectedTerms.length > 0) {
      captionParts.push(
        `${requiredSelectedTerms
          .map((term) => TERM_CAPTION_LABELS[term])
          .join(" · ")} (필수)`,
      );
    }

    if (optionalSelectedTerms.length > 0) {
      captionParts.push(
        `${optionalSelectedTerms
          .map((term) => TERM_CAPTION_LABELS[term])
          .join(" · ")} (선택)`,
      );
    }

    return captionParts.join(" | ");
  };

  const termsCaption = useMemo(() => {
    if (!isTermsSelectedFromModal || selectedTerms.length === 0) {
      return DEFAULT_TERMS_CAPTION;
    }

    return getSelectedTermsCaption(selectedTerms);
  }, [isTermsSelectedFromModal, selectedTerms]);

  const termsAgreementText =
    isAllTermsChecked || !isTermsSelectedFromModal
      ? "버팀 약관에 모두 동의합니다."
      : "버팀 약관에 동의합니다.";

  const isTermsAgreementChecked = selectedTerms.length > 0;

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,12}$/.test(
      value,
    );
  };

  const validatePhone = (value: string) => {
    return /^010-\d{4}-\d{4}$/.test(value);
  };

  const getEmailError = (value: string) => {
    const trimmedEmail = value.trim();

    if (!trimmedEmail) {
      return "이메일을 입력해주세요.";
    }

    if (!validateEmail(trimmedEmail)) {
      return "올바른 이메일 형식이 아닙니다.";
    }

    return undefined;
  };

  const getPasswordErrorByValues = (
    nextPassword: string,
    nextPasswordConfirm: string,
  ) => {
    const trimmedPassword = nextPassword.trim();
    const trimmedPasswordConfirm = nextPasswordConfirm.trim();

    if (!trimmedPassword) {
      return "비밀번호를 입력해주세요.";
    }

    if (!validatePassword(trimmedPassword)) {
      return "비밀번호 형식을 확인해주세요.";
    }

    if (trimmedPassword !== trimmedPasswordConfirm) {
      return "비밀번호가 일치하지 않습니다.";
    }

    return undefined;
  };

  const getPhoneError = (value: string) => {
    const trimmedPhone = value.trim();

    if (!trimmedPhone) {
      return "전화번호를 입력해주세요.";
    }

    if (!validatePhone(trimmedPhone)) {
      return "올바른 전화번호 형식이 아닙니다.";
    }

    return undefined;
  };

  const isPhoneErrorMessage = (message?: string) => {
    return (
      message === "전화번호를 입력해주세요." ||
      message === "올바른 전화번호 형식이 아닙니다."
    );
  };

  const getPasswordError = () => {
    return getPasswordErrorByValues(password, passwordConfirm);
  };

  const getPhoneVerificationError = () => {
    const trimmedPhone = phone.trim();
    const trimmedVerificationCode = verificationCode.trim();

    if (!trimmedPhone) {
      return "전화번호를 입력해주세요.";
    }

    if (!validatePhone(trimmedPhone)) {
      return "올바른 전화번호 형식이 아닙니다.";
    }

    if (!isPhoneVerified) {
      if (!isVerificationSent) {
        return "인증번호를 입력해주세요.";
      }

      if (!trimmedVerificationCode) {
        return "인증번호를 입력해주세요.";
      }

      if (trimmedVerificationCode !== TEST_VERIFICATION_CODE) {
        return "인증번호가 일치하지 않습니다.";
      }
    }

    return undefined;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextEmail = event.target.value;

    setEmail(nextEmail);

    setErrors((prev) => {
      if (!prev.email) {
        return prev;
      }

      return {
        ...prev,
        email: getEmailError(nextEmail),
      };
    });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextPassword = event.target.value;

    setPassword(nextPassword);

    setErrors((prev) => {
      if (!prev.password) {
        return prev;
      }

      return {
        ...prev,
        password: getPasswordErrorByValues(nextPassword, passwordConfirm),
      };
    });
  };

  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextPasswordConfirm = event.target.value;

    setPasswordConfirm(nextPasswordConfirm);

    setErrors((prev) => {
      if (!prev.password) {
        return prev;
      }

      return {
        ...prev,
        password: getPasswordErrorByValues(password, nextPasswordConfirm),
      };
    });
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextPhone = event.target.value;

    setPhone(nextPhone);

    if (nextPhone.trim() !== verifiedPhone) {
      setIsPhoneVerified(false);
      setIsVerificationSent(false);
      setVerificationCode("");
    }

    setErrors((prev) => {
      if (!prev.verificationCode) {
        return prev;
      }

      if (!isPhoneErrorMessage(prev.verificationCode)) {
        return {
          ...prev,
          verificationCode: undefined,
        };
      }

      return {
        ...prev,
        verificationCode: getPhoneError(nextPhone),
      };
    });
  };

  const handleVerificationCodeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setVerificationCode(event.target.value);
    setErrors((prev) => ({ ...prev, verificationCode: undefined }));
  };

  const handleSendVerificationCode = () => {
    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "전화번호를 입력해주세요.",
      }));
      return;
    }

    if (!validatePhone(trimmedPhone)) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "올바른 전화번호 형식이 아닙니다.",
      }));
      return;
    }

    // TODO: 휴대폰 인증번호 전송 API 연결
    // POST /api/auth/phone/send
    // 서버 전송 시 phoneNumber: phone.replaceAll("-", "")

    setIsVerificationSent(true);
    setIsPhoneVerified(false);
    setVerifiedPhone("");
    setVerificationCode("");

    setErrors((prev) => ({
      ...prev,
      verificationCode: undefined,
    }));
  };

  const handleToggleAllTerms = () => {
    setErrors((prev) => ({ ...prev, terms: undefined }));

    if (selectedTerms.length > 0) {
      setSelectedTerms([]);
      setIsTermsSelectedFromModal(false);
      return;
    }

    setSelectedTerms(ALL_TERMS);
    setIsTermsSelectedFromModal(false);
  };

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const handleConfirmTermsModal = (nextSelectedTerms: TermKey[]) => {
    setSelectedTerms(nextSelectedTerms);
    setIsTermsSelectedFromModal(nextSelectedTerms.length > 0);
    setIsTermsModalOpen(false);

    if (REQUIRED_TERMS.every((term) => nextSelectedTerms.includes(term))) {
      setErrors((prev) => ({ ...prev, terms: undefined }));
    }
  };

  const validateForm = () => {
    const nextErrors: SignupErrors = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      nextErrors.name = "이름을 입력해주세요.";
    }

    const emailError = getEmailError(trimmedEmail);

    if (emailError) {
      nextErrors.email = emailError;
    }

    const passwordError = getPasswordError();

    if (passwordError) {
      nextErrors.password = passwordError;
    }

    const phoneVerificationError = getPhoneVerificationError();

    if (phoneVerificationError) {
      nextErrors.verificationCode = phoneVerificationError;
    }

    if (!isAllRequiredTermsChecked) {
      nextErrors.terms = "필수 약관에 모두 동의해주세요.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();

    const trimmedPhone = phone.trim();

    const canVerifyPhone =
      isVerificationSent &&
      !isPhoneVerified &&
      verificationCode.trim() === TEST_VERIFICATION_CODE &&
      validatePhone(trimmedPhone);

    if (canVerifyPhone) {
      setIsPhoneVerified(true);
      setIsVerificationSent(false);
      setVerifiedPhone(trimmedPhone);
      setVerificationCode("");

      delete nextErrors.verificationCode;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const submitValues = {
      name,
      email,
      password,
      passwordConfirm,
      phoneNumber: phone.replaceAll("-", ""),
      termsAgreed: isAllRequiredTermsChecked,
      pushAlarmAgreed: selectedTerms.includes("sms"),
    };

    if (isEditMode) {
      // TODO: 회원 정보 수정 API 연결
      // PATCH /api/user/me
      // 이메일 또는 비밀번호가 변경되면 서버에 변경된 값이 저장되어야 하며,
      // 이후 로그인 시 변경된 이메일/비밀번호를 사용해야 함
      console.log("회원 정보 수정 예정", submitValues);

      onEditComplete?.({
        name,
        email,
        password,
        phoneNumber: phone.replaceAll("-", ""),
        termsAgreed: isAllRequiredTermsChecked,
        pushAlarmAgreed: selectedTerms.includes("sms"),
      });
      return;
    }

    // TODO: 회원가입 API 연결
    // POST /api/auth/signup

    console.log("회원가입 성공 처리 예정", submitValues);

    setIsSignupCompleted(true);
  };

  const passwordStatus = errors.password ? "error" : "default";

  const phoneStatus =
    errors.verificationCode === "전화번호를 입력해주세요." ||
    errors.verificationCode === "올바른 전화번호 형식이 아닙니다."
      ? "error"
      : "default";

  const verificationCodeStatus = errors.verificationCode ? "error" : "default";

  const isVerifiedCurrentPhone =
    isPhoneVerified && phone.trim() === verifiedPhone;

  const isPhoneButtonDisabled = isVerifiedCurrentPhone || !phone.trim();

  const phoneButtonText = isVerifiedCurrentPhone
    ? "인증 완료"
    : "인증번호 전송";

  if (isSignupCompleted) {
    return (
      <div className="flex min-h-[calc(100vh-48px)] items-center justify-center">
        <SignupCompleteCard />
      </div>
    );
  }

  return (
    <>
      <section className="flex w-[630px] flex-col items-center rounded-[24px] bg-white shadow-card-blue">
        <img
          src={logoFullLogin}
          alt="버팀"
          className="mt-[64px] h-[50px] w-[137px]"
          draggable={false}
        />

        <h1 className="typo-card-body-semibold mt-[50px] text-text-black">
          {isEditMode ? "회원 정보 수정" : "회원가입"}
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-[38px] flex w-[331px] flex-col"
        >
          <div>
            <LoginLongInput
              id="signup-name"
              label="이름"
              placeholder="홍길동"
              value={name}
              status={errors.name ? "error" : "default"}
              onChange={handleNameChange}
              autoComplete="name"
            />
            <ErrorSlot message={errors.name} />
          </div>

          <div className="mt-[24px]">
            <LoginLongInput
              id="signup-email"
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={email}
              status={errors.email ? "error" : "default"}
              onChange={handleEmailChange}
              autoComplete="email"
            />
            <ErrorSlot message={errors.email} />
          </div>

          <div className="mt-[24px]">
            <LoginPasswordInput
              id="signup-password"
              label="비밀번호"
              placeholder="영문/숫자/특수문자 조합, 8-12자"
              value={password}
              status={passwordStatus}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </div>

          <div className="mt-[8px]">
            <LoginPasswordInput
              id="signup-password-confirm"
              label=""
              placeholder="비밀번호를 한 번 더 입력해주세요."
              value={passwordConfirm}
              status={passwordStatus}
              onChange={handlePasswordConfirmChange}
              autoComplete="new-password"
            />
            <ErrorSlot message={errors.password} />
          </div>

          <div className="mt-[24px]">
            <LoginPhoneNumberInput
              id="signup-phone"
              label="전화번호"
              placeholder="010 - 0000 - 0000"
              value={phone}
              status={phoneStatus}
              buttonText={phoneButtonText}
              onChange={handlePhoneChange}
              onButtonClick={
                isPhoneButtonDisabled ? undefined : handleSendVerificationCode
              }
              buttonDisabled={isPhoneButtonDisabled}
              autoComplete="tel"
            />
          </div>

          {!isVerifiedCurrentPhone && (
            <div className="mt-[8px]">
              <LoginLongInput
                id="signup-verification-code"
                label=""
                placeholder="인증번호를 입력해주세요."
                value={verificationCode}
                status={verificationCodeStatus}
                onChange={handleVerificationCodeChange}
                disabled={!isVerificationSent}
                containerClassName="[&>label]:hidden [&>label]:h-0 [&>label]:overflow-hidden"
              />
              <ErrorSlot message={errors.verificationCode} />
            </div>
          )}

          <div className="mt-[24px]">
            <div className="flex items-center">
              <CheckButton
                variant={errors.terms ? "smallWarning" : "smallGray"}
                checked={isTermsAgreementChecked}
                onClick={handleToggleAllTerms}
                aria-label="버팀 약관 동의"
                className="mr-[2px] cursor-pointer"
              />

              <span className="typo-popup-caption text-popup-gray">
                {termsAgreementText}
              </span>

              <UnderlineButton
                size="large"
                type="button"
                onClick={handleOpenTermsModal}
                className="ml-auto"
              >
                약관 보기
              </UnderlineButton>
            </div>

            <p className="typo-small-caption mt-[8px] text-text-gray">
              {termsCaption}
            </p>

            <ErrorSlot message={errors.terms} />
          </div>

          <Button
            variant="blue"
            size="login"
            type="submit"
            className="mt-[40px] mb-[64px]"
          >
            완료
          </Button>
        </form>
      </section>

      {isTermsModalOpen && (
        <TermsAgreementModal
          selectedTerms={selectedTerms}
          onClose={handleCloseTermsModal}
          onConfirm={handleConfirmTermsModal}
        />
      )}
    </>
  );
};

export default SignupCard;
