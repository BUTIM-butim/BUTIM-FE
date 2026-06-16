import { useCallback, useState } from "react";

import { postLogout } from "../apis/auth";
import { clearTokens } from "../apis/axiosInstance";
import { ROUTES } from "../constants/routes";

export const useLogout = () => {
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

      window.location.replace(ROUTES.MAIN);
    }
  }, [isLoggingOut]);

  return {
    logout,
    isLoggingOut,
  };
};
