// 로그인 후 이용할 수 있습니다. 팝업
import { useNavigate } from "react-router-dom";

import Button from "../common/button/Button";
import CloseIcon from "../common/icons/CloseIcon";
import DimOverlay from "../common/overlay/DimOverlay";

type LoginRequiredModalProps = {
  onClose: () => void;
};

const LoginRequiredModal = ({ onClose }: LoginRequiredModalProps) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose();
    navigate("/login");
  };

  return (
    <DimOverlay>
      <section className="relative flex h-[296px] w-[533px] flex-col items-center rounded-[16px] bg-white shadow-popup">
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={onClose}
          className="absolute right-[12.5px] top-[12.5px] flex h-[31px] w-[31px] cursor-pointer items-center justify-center"
        >
          <CloseIcon />
        </button>

        <h2 className="typo-popup-title mt-[50px] text-center text-text-black">
          로그인 후 이용할 수 있습니다
        </h2>

        <p className="typo-popup-body mt-[20px] text-center text-popup-gray">
          로그인 후 정보를 입력하면 산재 승인 기간과
          <br />
          소득 공백 대응 전략을 확인할 수 있습니다.
        </p>

        <div className="mt-[32px]">
          <Button
            variant="blue"
            size="popup"
            type="button"
            onClick={handleLoginClick}
            className="w-[375px]"
          >
            로그인하기
          </Button>
        </div>
      </section>
    </DimOverlay>
  );
};

export default LoginRequiredModal;
