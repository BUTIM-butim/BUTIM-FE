import type { ButtonHTMLAttributes, ReactNode } from "react";
import CheckIcon from "../icons/CheckIcon";

type InformationOptionButtonSize = "half" | "full";

type InformationOptionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children: ReactNode;
  selected?: boolean;
  size?: InformationOptionButtonSize;
};

const sizeStyles: Record<InformationOptionButtonSize, string> = {
  half: "h-[47px] w-[320px]",
  full: "h-[47px] w-[671px]",
};

const InformationOptionButton = ({
  children,
  selected = false,
  size = "half",
  className = "",
  disabled,
  ...props
}: InformationOptionButtonProps) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      className={`
        typo-navbar-button flex items-center gap-[10px]
        rounded-[10px] border-[1.3px] bg-white px-[16px]
        ${
          selected
            ? "border-button-blue text-text-blue"
            : "border-line-gray text-text-gray"
        }
        ${sizeStyles[size]}
        disabled:cursor-not-allowed disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      <CheckIcon variant="smallBlue" checked={selected} />
      <span>{children}</span>
    </button>
  );
};

export default InformationOptionButton;
