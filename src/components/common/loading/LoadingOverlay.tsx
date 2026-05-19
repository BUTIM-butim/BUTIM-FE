// 오버레이와 로딩 컴포넌트 합친 최종 버전
import DimOverlay from "../overlay/DimOverlay";
import LoadingDots from "./LoadingDots";

const LoadingOverlay = () => {
  return (
    <DimOverlay>
      <LoadingDots />
    </DimOverlay>
  );
};

export default LoadingOverlay;
