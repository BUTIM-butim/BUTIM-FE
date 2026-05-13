import type { ButtonHTMLAttributes, ReactNode } from "react";

type OutlineButtonSize = "signIn" | "information";

type OutlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: OutlineButtonSize;
  isActive?: boolean;
  fullWidth?: boolean;
};

const sizeStyles: Record<OutlineButtonSize, string> = {
  signIn: "h-[43px] px-2 typo-login-input rounded-[8px]",
  information: "h-[47px] px-2 typo-navbar-button rounded-[8px]",
};

const borderStyles: Record<
  OutlineButtonSize,
  { default: string; active: string }
> = {
  signIn: {
    default: "shadow-[inset_0_0_0_1.2px_var(--color-line-gray)]",
    active: "shadow-[inset_0_0_0_1.2px_var(--color-button-blue)]",
  },
  information: {
    default: "shadow-[inset_0_0_0_1.3px_var(--color-line-gray)]",
    active: "shadow-[inset_0_0_0_1.3px_var(--color-button-blue)]",
  },
};

const stateStyles = {
  default: "bg-white text-placeholder-gray",
  active: "bg-white text-text-blue",
};

const OutlineButton = ({
  children,
  size = "signIn",
  isActive = false,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: OutlineButtonProps) => {
  const isDisabled = disabled || !isActive;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`
        relative isolate inline-flex items-center justify-center
        overflow-hidden
        transition-all duration-200
        disabled:cursor-not-allowed

        before:pointer-events-none before:absolute before:inset-0 before:z-20 before:rounded-[inherit]
        before:bg-white before:opacity-0 before:transition-opacity before:duration-200
        enabled:hover:before:opacity-[0.2]

        ${sizeStyles[size]}
        ${isActive ? stateStyles.active : stateStyles.default}
        ${isActive ? borderStyles[size].active : borderStyles[size].default}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default OutlineButton;
