import {
  useState,
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import CalendarIcon from "../icons/CalendarIcon";
import DropdownIcon from "../icons/DropdownIcon";
import SearchIcon from "../icons/SearchIcon";

export type InputStatus = "default" | "error";

export type InputSize =
  | "loginLong"
  | "loginShort"
  | "loginPassword"
  | "informationLong"
  | "informationHalfFull"
  | "informationHalf1"
  | "informationHalf2"
  | "informationHalf3"
  | "informationSearch"
  | "full";

export type InputRightType =
  | "none"
  | "measure"
  | "calendar"
  | "dropdown"
  | "search";

export type InputTextVariant = "login" | "information";

type InputVisualStatus = "default" | "focused" | "error";

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  inputSize?: InputSize;
  status?: InputStatus;
  rightType?: InputRightType;
  measure?: string;
  rightIcon?: ReactNode;
  onRightClick?: () => void;
  textVariant?: InputTextVariant;
  wrapperClassName?: string;
};

const sizeStyles: Record<InputSize, string> = {
  loginLong: "h-[43px] w-[331px] rounded-[8px] px-[13px]",
  loginShort: "h-[43px] w-[232px] rounded-[8px] px-[13px]",
  loginPassword: "h-[43px] w-[331px] rounded-[8px] px-[13px]",

  informationLong: "h-[47px] w-[671px] rounded-[10px] px-[16px]",
  informationHalfFull: "h-[47px] w-[671px] rounded-[10px] px-[16px]",
  informationHalf1: "h-[47px] w-[212px] rounded-[10px] px-[16px]",
  informationHalf2: "h-[47px] w-[440px] rounded-[10px] px-[16px]",
  informationHalf3: "h-[47px] w-[320px] rounded-[10px] px-[16px]",
  informationSearch: "h-[47px] w-[475px] rounded-[10px] px-[16px]",
  full: "h-[47px] w-full rounded-[10px] px-[16px]",
};

const borderStyles: Record<InputVisualStatus, string> = {
  default: "border-line-gray",
  focused: "border-button-blue",
  error: "border-warning-red",
};

const borderWidthStyles: Record<InputSize, string> = {
  loginLong: "border-[1.2px]",
  loginShort: "border-[1.2px]",
  loginPassword: "border-[1.2px]",

  informationLong: "border-[1.3px]",
  informationHalfFull: "border-[1.3px]",
  informationHalf1: "border-[1.3px]",
  informationHalf2: "border-[1.3px]",
  informationHalf3: "border-[1.3px]",
  informationSearch: "border-[1.3px]",
  full: "border-[1.3px]",
};

const textVariantStyles: Record<InputTextVariant, string> = {
  login: "typo-login-input",
  information: "typo-navbar-button",
};

const getRightIcon = (rightType: InputRightType) => {
  if (rightType === "calendar") return <CalendarIcon />;
  if (rightType === "dropdown") return <DropdownIcon />;
  if (rightType === "search") return <SearchIcon />;

  return null;
};

const getRightAriaLabel = (rightType: InputRightType) => {
  if (rightType === "calendar") return "날짜 선택";
  if (rightType === "dropdown") return "옵션 열기";
  if (rightType === "search") return "검색";

  return undefined;
};

const InputBase = ({
  inputSize = "full",
  status = "default",
  rightType = "none",
  measure,
  rightIcon,
  onRightClick,
  textVariant = "information",
  wrapperClassName = "",
  className = "",
  disabled,
  onFocus,
  onBlur,
  ...props
}: InputBaseProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const icon = rightIcon ?? getRightIcon(rightType);

  const hasClickableIcon =
    rightType === "calendar" ||
    rightType === "dropdown" ||
    rightType === "search";

  const visualStatus: InputVisualStatus =
    status === "error" ? "error" : isFocused ? "focused" : "default";

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div
      className={`
        inline-flex items-center overflow-hidden bg-white
        ${sizeStyles[inputSize]}
        ${borderWidthStyles[inputSize]}
        ${borderStyles[visualStatus]}
        ${disabled ? "opacity-60" : ""}
        ${wrapperClassName}
      `}
    >
      <input
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          ${textVariantStyles[textVariant]}
          h-full min-w-0 flex-1 bg-transparent
          text-text-black placeholder:text-placeholder-gray
          outline-none disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />

      {rightType === "measure" && (
        <span
          className={`
            ml-[8px] shrink-0 text-text-gray
            ${textVariantStyles[textVariant]}
          `}
        >
          {measure}
        </span>
      )}

      {icon && hasClickableIcon && (
        <button
          type="button"
          onClick={onRightClick}
          className="ml-[8px] flex shrink-0 cursor-pointer items-center justify-center"
          aria-label={getRightAriaLabel(rightType)}
        >
          {icon}
        </button>
      )}

      {rightIcon && !hasClickableIcon && (
        <div className="ml-[8px] flex shrink-0 items-center justify-center">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default InputBase;
