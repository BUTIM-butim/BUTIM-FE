import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ButtonTestPage from "../pages/dev/ButtonTestPage";
import ModalTestPage from "../pages/dev/ModalTestPage";

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
    path: "/dev/modal-test",
    element: <ModalTestPage />,
  },
]);
