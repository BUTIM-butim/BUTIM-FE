import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import InformationPage from "../pages/InformationPage";
import MainPage from "../pages/MainPage";
import PeriodPage from "../pages/PeriodPage";
import StrategyPage from "../pages/StrategyPage";
import ButtonTestPage from "../pages/dev/ButtonTestPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
  },
  {
    path: ROUTES.INFORMATION,
    element: <InformationPage />,
  },
  {
    path: ROUTES.PERIOD,
    element: <PeriodPage />,
  },
  {
    path: ROUTES.STRATEGY,
    element: <StrategyPage />,
  },
  {
    path: ROUTES.DEV_BUTTONS,
    element: <ButtonTestPage />,
  },
]);
