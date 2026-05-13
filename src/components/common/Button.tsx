import type { ButtonHTMLAttributes, ReactNode } from "react";
import GoIcon from "./icons/GoIcon";

type ButtonVariant = "blue" | "green" | "gray";
type ButtonSize = "hero" | "card" | "popup" | "information" | "login";
type ArrowButtonSize = "hero" | "card" | "information";
type ArrowDirection = "left" | "right";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode; // 버튼 내부의 텍스트 또는 요소
  variant?: ButtonVariant; // 버튼 색상 옵션
  size?: ButtonSize; // 버튼 크기 옵션
  fullWidth?: boolean; // 버튼 너비 옵션
  hasArrow?: boolean; // 버튼에 화살표 아이콘 포함 여부
  arrowDirection?: ArrowDirection; // 화살표 아이콘 방향
};

const variantStyles: Record<ButtonVariant, string> = {
  blue: "bg-button-blue text-white",
  green: "bg-button-green text-white",
  gray: "bg-button-background-gray text-button-gray",
};

const sizeStyles: Record<ButtonSize, string> = {
  hero: "h-[54px] px-[18px] typo-button-main-hero rounded-[10px]",
  card: "h-[44px] px-[16px] typo-button-main-card rounded-[10px]",
  popup: "h-[53px] px-[24px] typo-popup-button rounded-[10px]",
  information: "h-[43px] px-[16px] typo-navbar-button rounded-[10px]",
  login: "h-[49px] w-[331px] px-[24px] typo-navbar-button rounded-lg", // 로그인 버튼은 고정된 너비로 설정
};

const gapStyles: Record<ButtonSize, string> = {
  hero: "gap-[10px]",
  card: "gap-[14px]",
  popup: "gap-[10px]",
  information: "gap-[6px]",
  login: "gap-[10px]",
};

const arrowSizeMap: Record<ArrowButtonSize, "large" | "medium" | "moreSmall"> =
  {
    hero: "large",
    card: "medium",
    information: "moreSmall",
  };

const isArrowButtonSize = (size: ButtonSize): size is ArrowButtonSize => {
  return size === "hero" || size === "card" || size === "information";
};

const Button = ({
  children,
  variant = "blue", // 기본 색상은 blue로 설정
  size = "popup", // 기본 크기는 popup으로 설정
  fullWidth = false,
  hasArrow = false, // 기본값은 false로 설정(화살표 X)
  arrowDirection = "right", // 화살표 아이콘 방향의 기본값은 right로 설정
  className = "", // 추가적인 클래스 이름을 받을 수 있도록 설정 - 페이지별 버튼 디자인이 수정될 때 사용
  disabled, // 버튼 비활성화 여부
  ...props
}: ButtonProps) => {
  const shouldShowArrow = hasArrow && isArrowButtonSize(size);

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        relative isolate inline-flex items-center justify-center
        overflow-hidden
        transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-60

        before:absolute before:inset-0 before:z-0 before:rounded-[inherit]
        before:bg-white before:opacity-0 before:transition-opacity before:duration-200
        hover:before:opacity-[0.14]

        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${gapStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {shouldShowArrow && arrowDirection === "left" && (
        <GoIcon
          size={arrowSizeMap[size]}
          direction="left"
          className="relative z-10"
        />
      )}

      <span className="relative z-10">{children}</span>

      {shouldShowArrow && arrowDirection === "right" && (
        <GoIcon
          size={arrowSizeMap[size]}
          direction="right"
          className="relative z-10"
        />
      )}
    </button>
  );
};

export default Button;
