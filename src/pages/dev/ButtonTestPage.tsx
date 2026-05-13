import { useState } from "react";
import Button from "../../components/common/button/Button";
import UnderlineButton from "../../components/common/button/UnderlineButton";
import OutlineButton from "../../components/common/button/OutlineButton";
import CheckButton from "../../components/common/check/CheckButton";
import CloseIcon from "../../components/common/icons/CloseIcon";
import VisibilityIcon from "../../components/common/icons/VisibilityIcon";

const ButtonTestPage = () => {
  const [smallGrayChecked, setSmallGrayChecked] = useState(false);
  const [smallBlueChecked, setSmallBlueChecked] = useState(false);
  const [largeChecked, setLargeChecked] = useState(false);
  const [strategyBlueChecked, setStrategyBlueChecked] = useState(false);
  const [strategyGreenChecked, setStrategyGreenChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <main className="min-h-screen bg-background-blue p-10">
      <h1 className="typo-card-title-bold mb-8 text-text-black">Button Test</h1>

      <section className="space-y-8">
        <div>
          <p className="mb-3 text-text-gray">Hero</p>
          <Button variant="blue" size="hero" hasArrow>
            Button
          </Button>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Card Blue</p>
          <Button variant="blue" size="card" hasArrow>
            Button
          </Button>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Card Green</p>
          <Button variant="green" size="card" hasArrow>
            Button
          </Button>
        </div>

        <div className="w-[320px]">
          <p className="mb-3 text-text-gray">Popup Blue / Full</p>
          <Button variant="blue" size="popup" fullWidth>
            Button
          </Button>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Popup Gray</p>
          <Button variant="gray" size="popup">
            Button
          </Button>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Information Next</p>
          <Button variant="blue" size="information" hasArrow>
            Button
          </Button>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Information Before</p>
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
          <p className="mb-3 text-text-gray">Login</p>
          <Button variant="blue" size="login">
            Button
          </Button>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Underline Small</p>
          <UnderlineButton size="small">Button</UnderlineButton>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Underline Large</p>
          <UnderlineButton size="large">Button</UnderlineButton>
        </div>

        <div className="w-[320px]">
          <p className="mb-3 text-text-gray">Outline SignIn / Default</p>
          <OutlineButton size="signIn" isActive={false}>
            Button
          </OutlineButton>
        </div>

        <div className="w-[320px]">
          <p className="mb-3 text-text-gray">Outline SignIn / Active</p>
          <OutlineButton size="signIn" isActive>
            Button
          </OutlineButton>
        </div>

        <div className="w-[320px]">
          <p className="mb-3 text-text-gray">Outline Information / Default</p>
          <OutlineButton size="information" isActive={false}>
            Button
          </OutlineButton>
        </div>

        <div className="w-[320px]">
          <p className="mb-3 text-text-gray">Outline Information / Active</p>
          <OutlineButton size="information" isActive>
            Button
          </OutlineButton>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Check / Small Gray</p>
          <div className="flex items-center gap-6">
            <CheckButton
              variant="smallGray"
              checked={smallGrayChecked}
              onClick={() => setSmallGrayChecked((prev) => !prev)}
            />
            <span className="text-text-gray">클릭해서 상태 확인</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Check / Small Blue</p>
          <div className="flex items-center gap-6">
            <CheckButton
              variant="smallBlue"
              checked={smallBlueChecked}
              onClick={() => setSmallBlueChecked((prev) => !prev)}
            />
            <span className="text-text-gray">클릭해서 상태 확인</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Check / Large</p>
          <div className="flex items-center gap-6">
            <CheckButton
              variant="large"
              checked={largeChecked}
              onClick={() => setLargeChecked((prev) => !prev)}
            />
            <span className="text-text-gray">클릭해서 상태 확인</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Check / Strategy Blue</p>
          <div className="flex items-center gap-6">
            <CheckButton
              variant="strategyBlue"
              checked={strategyBlueChecked}
              onClick={() => setStrategyBlueChecked((prev) => !prev)}
            />
            <span className="text-text-gray">클릭해서 상태 확인</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Check / Strategy Green</p>
          <div className="flex items-center gap-6">
            <CheckButton
              variant="strategyGreen"
              checked={strategyGreenChecked}
              onClick={() => setStrategyGreenChecked((prev) => !prev)}
            />
            <span className="text-text-gray">클릭해서 상태 확인</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-text-gray">Close Icon</p>
          <CloseIcon />
        </div>

        <div>
          <p className="mb-3 text-text-gray">Visibility Icon</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              aria-label={passwordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
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
      </section>
    </main>
  );
};

export default ButtonTestPage;
