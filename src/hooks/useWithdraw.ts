import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteWithdraw } from "../apis/auth";
import { clearTokens } from "../apis/axiosInstance";
import { ROUTES } from "../constants/routes";

type UseWithdrawOptions = {
  redirectPath?: string;
};

export const useWithdraw = ({
  redirectPath = ROUTES.MAIN,
}: UseWithdrawOptions = {}) => {
  const navigate = useNavigate();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdraw = useCallback(async () => {
    if (isWithdrawing) {
      return false;
    }

    try {
      setIsWithdrawing(true);

      await deleteWithdraw();

      clearTokens();

      navigate(redirectPath, {
        replace: true,
      });

      return true;
    } catch {
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
      return false;
    } finally {
      setIsWithdrawing(false);
    }
  }, [isWithdrawing, navigate, redirectPath]);

  return {
    withdraw,
    isWithdrawing,
  };
};
