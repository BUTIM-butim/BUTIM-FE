import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import ButtonTestPage from "./pages/dev/ButtonTestPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ButtonTestPage />
    {/*버튼 및 아이콘 테스트 페이지입니다. 버튼 컴포넌트들 사용 코드 및 UI를 확인할 때 참고해주세요. */}
  </StrictMode>,
);
