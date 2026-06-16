import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import WithdrawConfirmModal from "../components/user/WithdrawConfirmModal";
import { getAccessToken } from "../apis/axiosInstance";
import { useLogout } from "../hooks/useLogout";
import { useWithdraw } from "../hooks/useWithdraw";

const MainLayout = () => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getAccessToken()));

  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") ?? "사용자",
  );

  const { logout, isLoggingOut } = useLogout();
  const { withdraw, isWithdrawing } = useWithdraw();

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    await logout();

    setIsLoggedIn(false);
    setUserName("사용자");
  };

  const handleOpenWithdrawModal = () => {
    if (isWithdrawing) {
      return;
    }

    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    if (isWithdrawing) {
      return;
    }

    setIsWithdrawModalOpen(false);
  };

  const handleWithdraw = async () => {
    const isSuccess = await withdraw();

    if (!isSuccess) {
      return;
    }

    setIsWithdrawModalOpen(false);
    setIsLoggedIn(false);
    setUserName("사용자");
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={() => {
          void handleLogout();
        }}
        onWithdraw={handleOpenWithdrawModal}
      />

      <div className="pt-[64px]">
        <Outlet />
      </div>

      {isWithdrawModalOpen && (
        <WithdrawConfirmModal
          onClose={handleCloseWithdrawModal}
          onWithdraw={() => {
            void handleWithdraw();
          }}
        />
      )}
    </>
  );
};

export default MainLayout;
