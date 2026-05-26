import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import MainPage from '../pages/MainPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ButtonTestPage from '../pages/dev/ButtonTestPage';
import ModalTestPage from '../pages/dev/ModalTestPage';
import UserEditPage from '../pages/user/UserEditPage';
import FinancialInfoPage from '../pages/financial/FinancialInfoPage';
import FinancialSupportInfoPage from '../pages/financial/FinancialSupportInfoPage';
import StrategyRecommendationPage from '../pages/strategy/StrategyRecommendationPage';
import StrategyResultPage from '../pages/strategy/StrategyResultPage';

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
    path: '/dev/modal-test',
    element: <ModalTestPage />,
  },
  {
    path: '/user/edit',
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
    path: '/strategy',
    element: <Navigate to="/strategy/result" replace />,
  },
  {
    path: '/strategy/recommend',
    element: <StrategyRecommendationPage />,
  },
  {
    path: '/strategy/result',
    element: <StrategyResultPage />,
  },
]);