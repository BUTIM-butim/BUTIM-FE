import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { postLogout } from "../apis/auth";
import { clearTokens } from "../apis/axiosInstance";
import { ROUTES } from "../constants/routes";

type UseLogoutOptions = {
  redirectPath?: string;
};

export const useLogout = ({
  redirectPath = ROUTES.MAIN,
}: UseLogoutOptions = {}) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);
      await postLogout();
    } catch {
      // 서버 로그아웃 요청이 실패해도 클라이언트 로그아웃은 진행
    } finally {
      clearTokens();

      navigate(redirectPath, {
        replace: true,
      });

      setIsLoggingOut(false);
    }
  }, [isLoggingOut, navigate, redirectPath]);

  return {
    logout,
    isLoggingOut,
  };
};
