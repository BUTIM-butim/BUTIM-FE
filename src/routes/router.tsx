import { Navigate, createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import MainLayout from "../layouts/MainLayout";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import FinancialInfoPage from "../pages/financial/FinancialInfoPage";
import FinancialSupportInfoPage from "../pages/financial/FinancialSupportInfoPage";
import StrategyRecommendationPage from "../pages/strategy/StrategyRecommendationPage";
import StrategyResultPage from "../pages/strategy/StrategyResultPage";
import UserEditPage from "../pages/user/UserEditPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.MAIN,
        element: <MainPage />,
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
    ],
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
    path: ROUTES.FINANCIAL,
    element: <FinancialInfoPage />,
  },
]);
