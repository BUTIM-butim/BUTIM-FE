import type { ButtonHTMLAttributes, ReactNode } from "react";

type UnderlineButtonSize = "small" | "large";

type UnderlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: UnderlineButtonSize;
};

const sizeStyles: Record<UnderlineButtonSize, string> = {
  small: "font-pretendard text-[12px] font-semibold leading-[14px]",
  large: "font-pretendard text-[14px] font-semibold leading-[17px]",
};

const UnderlineButton = ({
  children,
  size = "small",
  className = "",
  disabled,
  ...props
}: UnderlineButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        relative isolate inline-flex w-fit items-center justify-center
        overflow-visible
        text-hero-text-blue
        transition-all duration-200
        cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-60

        before:pointer-events-none before:absolute before:inset-0 before:z-20
        before:bg-white before:opacity-0 before:transition-opacity before:duration-200
        enabled:hover:before:opacity-[0.14]

        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 underline decoration-hero-text-blue underline-offset-[3px]">
        {children}
      </span>
    </button>
  );
};

export default UnderlineButton;
