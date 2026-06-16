import { Navigate, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ButtonTestPage from "../pages/dev/ButtonTestPage";
import ModalTestPage from "../pages/dev/ModalTestPage";
import UserEditPage from "../pages/user/UserEditPage";
import FinancialInfoPage from "../pages/financial/FinancialInfoPage";
import FinancialSupportInfoPage from "../pages/financial/FinancialSupportInfoPage";
import LogoutTestPage from "../pages/dev/LogoutTestPage"; // 로그아웃 네브바 연결 후 삭제
import WithdrawTestPage from "../pages/dev/WithdrawTestPage"; // 회원 탈퇴 네브바 연결 후 삭제
import StrategyRecommendationPage from "../pages/strategy/StrategyRecommendationPage";
import StrategyResultPage from "../pages/strategy/StrategyResultPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES.BUTTON_TEST,
    element: <ButtonTestPage />,
  },
  {
    path: ROUTES.MODAL_TEST,
    element: <ModalTestPage />,
  },
  {
    path: ROUTES.USER_EDIT,
    element: <UserEditPage />,
  },
  {
    path: ROUTES.FINANCIAL_INFO,
    element: <FinancialInfoPage />,
  },
  {
    path: ROUTES.FINANCIAL_SUPPORT_INFO,
    element: <FinancialSupportInfoPage />,
  },
  {
    path: "/logout-test",
    element: <LogoutTestPage />,
  },
  {
    path: "/withdraw-test",
    element: <WithdrawTestPage />,
  },
  {
    path: ROUTES.STRATEGY,
    element: <Navigate to={ROUTES.STRATEGY_RESULT} replace />,
  },
  {
    path: ROUTES.STRATEGY_RECOMMEND,
    element: <StrategyRecommendationPage />,
  },
  {
    path: ROUTES.STRATEGY_RESULT,
    element: <StrategyResultPage />,
  },
]);
