import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./styles/global.css";
import ButtonTestPage from "./pages/ButtonTestPage";
import Button from "./components/common/Button";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ButtonTestPage />
  </StrictMode>,
);
