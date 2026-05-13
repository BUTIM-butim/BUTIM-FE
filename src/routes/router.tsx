import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import MainPage from "../pages/MainPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
  },
]);
