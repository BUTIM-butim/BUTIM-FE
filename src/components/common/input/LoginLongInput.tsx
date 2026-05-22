import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type LoginLongInputStatus = "default" | "error";

type LoginLongInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  label: string;
  status?: LoginLongInputStatus;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  rightElement?: ReactNode;
  containerClassName?: string;
};

const LoginLongInput = ({
  label,
  status = "default",
  id,
  rightElement,
  containerClassName = "",
  className = "",
  ...props
}: LoginLongInputProps) => {
  const borderColor =
    status === "error"
      ? "border-warning-red focus-within:border-warning-red"
      : "border-line-gray focus-within:border-button-blue";

  return (
    <div className={`flex w-[331px] flex-col gap-[10px] ${containerClassName}`}>
      <label htmlFor={id} className="typo-login-label text-text-black">
        {label}
      </label>

      <div
        className={`
          flex h-[43px] w-[331px] items-center rounded-[8px] border-[1.2px]
          bg-white px-[13px] transition-colors duration-150
          ${borderColor}
        `}
      >
        <input
          id={id}
          className={`
            typo-login-input h-full min-w-0 flex-1 bg-transparent
            text-text-black placeholder:text-placeholder-gray outline-none
            ${className}
          `}
          {...props}
        />

        {rightElement && (
          <div className="ml-[8px] flex shrink-0 items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginLongInput;
