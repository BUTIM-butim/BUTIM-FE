import Button from "../../components/common/button/Button";
import UnderlineButton from "../../components/common/button/UnderlineButton";
import OutlineButton from "../../components/common/button/OutlineButton";

const ButtonTestPage = () => {
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
      </section>
    </main>
  );
};

export default ButtonTestPage;
