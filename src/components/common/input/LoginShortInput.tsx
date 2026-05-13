import type { InputHTMLAttributes } from "react";
import InputBase, { type InputStatus } from "./InputBase";
import FieldLabel from "./FieldLabel";

type LoginShortInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  status?: InputStatus;
  containerClassName?: string;
};

const LoginShortInput = ({
  label,
  status = "default",
  id,
  containerClassName = "",
  ...props
}: LoginShortInputProps) => {
  return (
    <div className={`flex flex-col gap-[10px] ${containerClassName}`}>
      <FieldLabel htmlFor={id} label={label} variant="login" />

      <InputBase
        id={id}
        inputSize="loginShort"
        status={status}
        textVariant="login"
        {...props}
      />
    </div>
  );
};

export default LoginShortInput;
