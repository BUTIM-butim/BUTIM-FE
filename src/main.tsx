import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import ButtonTestPage from "./pages/dev/ButtonTestPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ButtonTestPage />
  </StrictMode>,
);
