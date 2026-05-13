import { useState } from "react";

import Button from "../../components/common/button/Button";
import OutlineButton from "../../components/common/button/OutlineButton";
import UnderlineButton from "../../components/common/button/UnderlineButton";

import CheckButton from "../../components/common/check/CheckButton";

import CloseIcon from "../../components/common/icons/CloseIcon";
import VisibilityIcon from "../../components/common/icons/VisibilityIcon";
import WarningIcon from "../../components/common/icons/WarningIcon";

import LoginLongInput from "../../components/common/input/LoginLongInput";
import LoginShortInput from "../../components/common/input/LoginShortInput";
import LoginPasswordInput from "../../components/common/input/LoginPasswordInput";
import LoginPhoneNumberInput from "../../components/common/input/LoginPhoneNumberInput";

import InformationLabel from "../../components/common/input/InformationLabel";
import InformationLongInput from "../../components/common/input/InformationLongInput";
import InformationLongRightInput from "../../components/common/input/InformationLongRightInput";
import InformationHalfFullInput from "../../components/common/input/InformationHalfFullInput";
import InformationHalf1Input from "../../components/common/input/InformationHalf1Input";
import InformationHalf2Input from "../../components/common/input/InformationHalf2Input";
import InformationHalf3Input from "../../components/common/input/InformationHalf3Input";
import InformationConfirmInput from "../../components/common/input/InformationConfirmInput";
import InformationSearchInput from "../../components/common/input/InformationSearchInput";
import ValidationMessage from "../../components/common/input/ValidationMessage";

import InformationOptionHalf from "../../components/common/option/InformationOptionHalf";
import InformationOptionTwoColumn from "../../components/common/option/InformationOptionTwoColumn";
import InformationOptionField from "../../components/common/option/InformationOptionField";

const optionItems = [
  { label: "Option 1", value: "Option 1" },
  { label: "Option 2", value: "Option 2" },
  { label: "Option 3", value: "Option 3" },
  { label: "Option 4", value: "Option 4" },
  { label: "Option 5", value: "Option 5" },
  { label: "Option 6", value: "Option 6" },
  { label: "Option 7", value: "Option 7" },
  { label: "Option 8", value: "Option 8" },
  { label: "Option 9", value: "Option 9" },
  { label: "Option 10", value: "Option 10" },
];

const ButtonTestPage = () => {
  const [smallGrayChecked, setSmallGrayChecked] = useState(false);
  const [smallBlueChecked, setSmallBlueChecked] = useState(false);
  const [largeChecked, setLargeChecked] = useState(false);
  const [strategyBlueChecked, setStrategyBlueChecked] = useState(false);
  const [strategyGreenChecked, setStrategyGreenChecked] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [halfButtonValue, setHalfButtonValue] = useState("Option 1");

  const [singleTwoColumnValue, setSingleTwoColumnValue] = useState("Option 2");

  const [multipleTwoColumnValue, setMultipleTwoColumnValue] = useState<
    string[]
  >(["Option 1"]);

  const [singleFieldValue, setSingleFieldValue] = useState("");
  const [multipleFieldValue, setMultipleFieldValue] = useState<string[]>([]);

  const [showSingleFieldError, setShowSingleFieldError] = useState(false);
  const [showMultipleFieldError, setShowMultipleFieldError] = useState(false);

  return (
    <main className="min-h-screen bg-background-blue p-10">
      <h1 className="typo-card-title-bold mb-8 text-text-black">
        Component Test
      </h1>

      <section className="space-y-12">
        <div>
          <h2 className="typo-job-label mb-6 text-text-black">Button</h2>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-text-gray">Button / Blue / Hero</p>
              <Button variant="blue" size="hero" hasArrow>
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Button / Blue / Card</p>
              <Button variant="blue" size="card" hasArrow>
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Button / Green / Card</p>
              <Button variant="green" size="card" hasArrow>
                Button
              </Button>
            </div>

            <div className="w-[320px]">
              <p className="mb-3 text-text-gray">Button / Blue / Popup Full</p>
              <Button variant="blue" size="popup" fullWidth>
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Button / Gray / Popup</p>
              <Button variant="gray" size="popup">
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Button / Blue / Information</p>
              <Button variant="blue" size="information" hasArrow>
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Gray / Information / Before
              </p>
              <Button
                variant="gray"
                size="information"
                hasArrow
                arrowDirection="left"
              >
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Button / Blue / Login</p>
              <Button variant="blue" size="login">
                Button
              </Button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Underline / Small</p>
              <UnderlineButton size="small">Button</UnderlineButton>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Underline / Large</p>
              <UnderlineButton size="large">Button</UnderlineButton>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Outline / SignIn</p>
              <div className="flex items-center gap-6">
                <OutlineButton size="signIn" disabled>
                  Button
                </OutlineButton>

                <OutlineButton size="signIn">Button</OutlineButton>
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Outline / Information</p>
              <div className="flex items-center gap-6">
                <OutlineButton size="information" disabled>
                  Button
                </OutlineButton>

                <OutlineButton size="information">Button</OutlineButton>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="typo-job-label mb-6 text-text-black">Icon</h2>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-text-gray">Check Icon / Small Gray</p>
              <CheckButton
                variant="smallGray"
                checked={smallGrayChecked}
                onClick={() => setSmallGrayChecked((prev) => !prev)}
                aria-label="small gray check"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Check Icon / Small Blue</p>
              <CheckButton
                variant="smallBlue"
                checked={smallBlueChecked}
                onClick={() => setSmallBlueChecked((prev) => !prev)}
                aria-label="small blue check"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Check Icon / Large</p>
              <CheckButton
                variant="large"
                checked={largeChecked}
                onClick={() => setLargeChecked((prev) => !prev)}
                aria-label="large check"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Check Icon / Strategy Blue</p>
              <CheckButton
                variant="strategyBlue"
                checked={strategyBlueChecked}
                onClick={() => setStrategyBlueChecked((prev) => !prev)}
                aria-label="strategy blue check"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Check Icon / Strategy Green</p>
              <CheckButton
                variant="strategyGreen"
                checked={strategyGreenChecked}
                onClick={() => setStrategyGreenChecked((prev) => !prev)}
                aria-label="strategy green check"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Close Icon</p>
              <button type="button" aria-label="닫기">
                <CloseIcon />
              </button>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Visibility Icon</p>
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  aria-label={
                    passwordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  <VisibilityIcon visible={passwordVisible} />
                </button>

                <span className="text-text-gray">
                  현재 상태:{" "}
                  {passwordVisible
                    ? "비밀번호 보임 / On"
                    : "비밀번호 안 보임 / Off"}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Warning Icon</p>
              <div className="flex items-center gap-[2px] text-warning-red">
                <WarningIcon />
                <span className="typo-warning-text">
                  유효성 검사 문구입니다.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="typo-job-label mb-6 text-text-black">Input</h2>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-text-gray">Input / Login / Long</p>
              <div className="space-y-[20px]">
                <LoginLongInput label="label" placeholder="placeholder" />

                <LoginLongInput label="label" defaultValue="content" />

                <div>
                  <LoginLongInput label="label" status="error" />
                  <ValidationMessage className="mt-[6px]">
                    유효성 검사 문구입니다.
                  </ValidationMessage>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Login / Short</p>
              <div className="space-y-[20px]">
                <LoginShortInput label="label" placeholder="placeholder" />

                <LoginShortInput label="label" defaultValue="content" />

                <div>
                  <LoginShortInput label="label" status="error" />
                  <ValidationMessage className="mt-[6px]">
                    유효성 검사 문구입니다.
                  </ValidationMessage>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Login / Password</p>
              <LoginPasswordInput label="label" placeholder="placeholder" />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Login / PhoneNumber</p>
              <LoginPhoneNumberInput
                label="label"
                placeholder="placeholder"
                buttonText="인증번호 전송"
                onButtonClick={() => console.log("phone confirm")}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Information / Label</p>
              <InformationLabel label="label" caption="Caption" />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Information / Long</p>
              <div className="space-y-[20px]">
                <InformationLongInput
                  label="label"
                  caption="Caption"
                  placeholder="placeholder"
                />

                <InformationLongInput
                  label="label"
                  caption="Caption"
                  defaultValue="content"
                />

                <div>
                  <InformationLongInput
                    label="label"
                    caption="Caption"
                    status="error"
                  />
                  <ValidationMessage className="mt-[6px]">
                    유효성 검사 문구입니다.
                  </ValidationMessage>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Input / Information / Long / Right
              </p>

              <div className="space-y-[20px]">
                <InformationLongRightInput
                  label="label"
                  caption="Caption"
                  placeholder="placeholder"
                  rightType="measure"
                  measure="원"
                />

                <InformationLongRightInput
                  label="label"
                  caption="Caption"
                  placeholder="placeholder"
                  rightType="calendar"
                  onRightClick={() => console.log("calendar")}
                />

                <InformationLongRightInput
                  label="label"
                  caption="Caption"
                  placeholder="placeholder"
                  rightType="dropdown"
                  onRightClick={() => console.log("dropdown")}
                />

                <InformationLongRightInput
                  label="label"
                  caption="Caption"
                  placeholder="placeholder"
                  rightType="search"
                  onRightClick={() => console.log("search")}
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Input / Information / HalfFull
              </p>
              <InformationHalfFullInput
                label="label"
                caption="Caption"
                placeholder="placeholder"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Information / Half1</p>
              <InformationHalf1Input
                label="label"
                caption="Caption"
                placeholder="placeholder"
                rightType="measure"
                measure="만원"
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Information / Half2</p>
              <InformationHalf2Input
                label="label"
                caption="Caption"
                placeholder="placeholder"
                rightType="dropdown"
                onRightClick={() => console.log("half2 dropdown")}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">Input / Information / Half3</p>
              <InformationHalf3Input
                label="label"
                caption="Caption"
                placeholder="placeholder"
                rightType="calendar"
                onRightClick={() => console.log("half3 calendar")}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Input / Information / Confirm Button
              </p>
              <InformationConfirmInput
                label="label"
                caption="Caption"
                placeholder="placeholder"
                buttonText="확인"
                onButtonClick={() => console.log("information confirm")}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Input / Information / Search
              </p>
              <InformationSearchInput
                label="label"
                caption="Caption"
                placeholder="placeholder"
                onRightClick={() => console.log("search")}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Half / Default
              </p>
              <InformationOptionHalf label="Option" value="default" />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Half / Click
              </p>
              <InformationOptionHalf label="Option" value="click" selected />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Half / Error
              </p>
              <InformationOptionHalf label="Option" value="error" error />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Half / Interactive
              </p>
              <div className="space-y-3">
                <InformationOptionHalf
                  label="Option 1"
                  value="Option 1"
                  selected={halfButtonValue === "Option 1"}
                  onClick={setHalfButtonValue}
                />
                <InformationOptionHalf
                  label="Option 2"
                  value="Option 2"
                  selected={halfButtonValue === "Option 2"}
                  onClick={setHalfButtonValue}
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Two Column / Single
              </p>
              <InformationOptionTwoColumn
                selectionMode="single"
                options={optionItems}
                value={singleTwoColumnValue}
                onChange={setSingleTwoColumnValue}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Two Column / Multiple
              </p>
              <InformationOptionTwoColumn
                selectionMode="multiple"
                options={optionItems}
                value={multipleTwoColumnValue}
                onChange={setMultipleTwoColumnValue}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Button / Information / Two Column / Error
              </p>
              <InformationOptionTwoColumn
                selectionMode="single"
                options={optionItems.slice(0, 4)}
                value=""
                error
                onChange={(value) => console.log(value)}
              />
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Input / Information / Button Two Column / Single
              </p>

              <div className="space-y-4">
                <InformationOptionField
                  selectionMode="single"
                  label="label"
                  caption="Caption"
                  options={optionItems}
                  value={singleFieldValue}
                  error={showSingleFieldError}
                  errorMessage="유효성 검사 문구입니다."
                  onChange={(value) => {
                    setSingleFieldValue(value);
                    setShowSingleFieldError(false);
                  }}
                />

                <div className="flex gap-3">
                  <Button
                    variant="blue"
                    size="popup"
                    onClick={() => setShowSingleFieldError(true)}
                  >
                    에러 확인
                  </Button>

                  <Button
                    variant="gray"
                    size="popup"
                    onClick={() => {
                      setSingleFieldValue("");
                      setShowSingleFieldError(false);
                    }}
                  >
                    초기화
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-text-gray">
                Input / Information / Button Two Column / Multiple
              </p>

              <div className="space-y-4">
                <InformationOptionField
                  selectionMode="multiple"
                  label="label"
                  caption="Caption"
                  options={optionItems}
                  value={multipleFieldValue}
                  error={showMultipleFieldError}
                  errorMessage="1개 이상 선택해주세요."
                  onChange={(value) => {
                    setMultipleFieldValue(value);
                    setShowMultipleFieldError(false);
                  }}
                />

                <div className="flex gap-3">
                  <Button
                    variant="blue"
                    size="popup"
                    onClick={() => setShowMultipleFieldError(true)}
                  >
                    에러 확인
                  </Button>

                  <Button
                    variant="gray"
                    size="popup"
                    onClick={() => {
                      setMultipleFieldValue([]);
                      setShowMultipleFieldError(false);
                    }}
                  >
                    초기화
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ButtonTestPage;
