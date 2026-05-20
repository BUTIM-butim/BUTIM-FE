import { useState } from "react";

import LoginRequiredModal from "../../components/auth/LoginRequiredModal";
import Button from "../../components/common/button/Button";

const ModalTestPage = () => {
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[24px] bg-background-blue p-10">
      <h1 className="typo-card-title-bold text-text-black">Modal Test</h1>

      <Button
        variant="blue"
        size="popup"
        onClick={() => setIsLoginRequiredModalOpen(true)}
      >
        로그인 필요 팝업 열기
      </Button>

      {isLoginRequiredModalOpen && (
        <LoginRequiredModal
          onClose={() => setIsLoginRequiredModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ModalTestPage;
