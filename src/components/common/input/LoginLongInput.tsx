import type { InputHTMLAttributes } from "react";
import InputBase, { type InputStatus } from "./InputBase";
import FieldLabel from "./FieldLabel";

type LoginLongInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  status?: InputStatus;
  containerClassName?: string;
};

const LoginLongInput = ({
  label,
  status = "default",
  id,
  containerClassName = "",
  ...props
}: LoginLongInputProps) => {
  return (
    <div className={`flex flex-col gap-[10px] ${containerClassName}`}>
      <FieldLabel htmlFor={id} label={label} variant="login" />

      <InputBase
        id={id}
        inputSize="loginLong"
        status={status}
        textVariant="login"
        {...props}
      />
    </div>
  );
};

export default LoginLongInput;
