import { useState } from "react";

import Button from "../common/button/Button";
import WithdrawConfirmModal from "./WithdrawConfirmModal";
import { useWithdraw } from "../../hooks/useWithdraw";

const WithdrawTestButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { withdraw, isWithdrawing } = useWithdraw();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isWithdrawing) {
      return;
    }

    setIsModalOpen(false);
  };

  const handleWithdraw = async () => {
    const isSuccess = await withdraw();

    if (isSuccess) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="blue"
        size="login"
        type="button"
        onClick={handleOpenModal}
        disabled={isWithdrawing}
      >
        회원 탈퇴 테스트
      </Button>

      {isModalOpen && (
        <WithdrawConfirmModal
          onClose={handleCloseModal}
          onWithdraw={() => {
            void handleWithdraw();
          }}
        />
      )}
    </>
  );
};

export default WithdrawTestButton;
