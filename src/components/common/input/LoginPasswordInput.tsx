import { useState, type InputHTMLAttributes } from "react";
import InputBase, { type InputStatus } from "./InputBase";
import FieldLabel from "./FieldLabel";
import VisibilityIcon from "../icons/VisibilityIcon";

type LoginPasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  label: string;
  status?: InputStatus;
  containerClassName?: string;
};

const LoginPasswordInput = ({
  label,
  status = "default",
  id,
  containerClassName = "",
  ...props
}: LoginPasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`flex flex-col gap-[10px] ${containerClassName}`}>
      {label && <FieldLabel htmlFor={id} label={label} variant="login" />}

      <InputBase
        id={id}
        type={visible ? "text" : "password"}
        inputSize="loginPassword"
        status={status}
        textVariant="login"
        rightIcon={
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
            className="flex cursor-pointer items-center justify-center"
          >
            <VisibilityIcon visible={visible} />
          </button>
        }
        {...props}
      />
    </div>
  );
};

export default LoginPasswordInput;
