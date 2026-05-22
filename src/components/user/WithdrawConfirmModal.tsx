import Button from "../common/button/Button";
import CloseIcon from "../common/icons/CloseIcon";
import DimOverlay from "../common/overlay/DimOverlay";

type WithdrawConfirmModalProps = {
  onClose: () => void;
  onWithdraw: () => void;
};

const WithdrawConfirmModal = ({
  onClose,
  onWithdraw,
}: WithdrawConfirmModalProps) => {
  return (
    <DimOverlay>
      <section className="relative flex w-[546px] flex-col items-center rounded-[16px] bg-white shadow-popup">
        <button
          type="button"
          aria-label="회원 탈퇴 팝업 닫기"
          onClick={onClose}
          className="absolute right-[12.5px] top-[12.5px] flex h-[31px] w-[31px] cursor-pointer items-center justify-center"
        >
          <CloseIcon />
        </button>

        <h2 className="typo-popup-title mt-[50px] text-center text-text-black">
          정말 버팀을 탈퇴하실건가요?
        </h2>

        <p className="typo-popup-body mt-[20px] text-center text-popup-gray">
          탈퇴 시 계정 및 이용 기록은 모두 삭제되며,
          <br />
          재가입 시에도 삭제된 데이터는 복구할 수 없습니다.
        </p>

        <div className="mt-[32px] flex gap-[32px]">
          <Button
            variant="gray"
            size="popup"
            type="button"
            onClick={onClose}
            className="!w-[178px]"
          >
            취소
          </Button>

          <Button
            variant="blue"
            size="popup"
            type="button"
            onClick={onWithdraw}
            className="!w-[178px]"
          >
            탈퇴하기
          </Button>
        </div>

        <div className="h-[36px]" />
      </section>
    </DimOverlay>
  );
};

export default WithdrawConfirmModal;
