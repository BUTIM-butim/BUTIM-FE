import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import InputBase, { type InputStatus } from "./InputBase";
import FieldLabel from "./FieldLabel";
import OutlineButton from "../button/OutlineButton";

type LoginPhoneNumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  label: string;
  status?: InputStatus;
  buttonText?: string;
  onButtonClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
};

const LoginPhoneNumberInput = ({
  label,
  status = "default",
  buttonText = "인증번호 전송",
  onButtonClick,
  onChange,
  id,
  value,
  defaultValue,
  containerClassName = "",
  ...props
}: LoginPhoneNumberInputProps) => {
  const [inputValue, setInputValue] = useState(
    defaultValue ? String(defaultValue) : "",
  );

  const currentValue = value !== undefined ? String(value) : inputValue;
  const isButtonActive = currentValue.trim().length > 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className={`flex flex-col gap-[10px] ${containerClassName}`}>
      <FieldLabel htmlFor={id} label={label} variant="login" />

      <div className="flex h-[43px] w-[331px] items-center gap-[8px]">
        <InputBase
          id={id}
          inputSize="loginShort"
          status={status}
          textVariant="login"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />

        <div className="h-[43px] w-[91px] flex-none">
          <OutlineButton
            size="signIn"
            fullWidth
            isActive={isButtonActive}
            disabled={!isButtonActive}
            onClick={onButtonClick}
          >
            {buttonText}
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPhoneNumberInput;
