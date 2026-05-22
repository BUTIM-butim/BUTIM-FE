import type { ButtonHTMLAttributes } from "react";
import CheckIcon from "../icons/CheckIcon";

type CheckButtonVariant =
  | "smallGray"
  | "smallBlue"
  | "smallWarning"
  | "large"
  | "strategyBlue"
  | "strategyGreen";

type CheckButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  checked?: boolean;
  variant?: CheckButtonVariant;
};

const CheckButton = ({
  checked = false,
  variant = "smallGray",
  className = "",
  disabled,
  ...props
}: CheckButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={checked}
      className={`
        inline-flex items-center justify-center
        rounded-full
        transition-none
        disabled:cursor-not-allowed disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      <CheckIcon variant={variant} checked={checked} />
    </button>
  );
};

export default CheckButton;
