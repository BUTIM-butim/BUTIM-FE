// 화면 전체를 검은색 60%로 덮는 공통 오버레이
import type { ReactNode } from "react";

type DimOverlayProps = {
  children?: ReactNode;
  className?: string;
};

const DimOverlay = ({ children, className = "" }: DimOverlayProps) => {
  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center bg-black/60
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default DimOverlay;
