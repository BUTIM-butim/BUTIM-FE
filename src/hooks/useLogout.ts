import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { postLogout } from "../apis/auth";
import { clearTokens } from "../apis/axiosInstance";
import { ROUTES } from "../constants/routes";

export const useLogout = () => {
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
      /*
       * 서버 로그아웃 요청이 실패해도
       * 브라우저에 저장된 로그인 정보는 삭제한다.
       */
    } finally {
      clearTokens();

      navigate(ROUTES.MAIN, {
        replace: true,
      });

      setIsLoggingOut(false);
    }
  }, [isLoggingOut, navigate]);

  return {
    logout,
    isLoggingOut,
  };
};
