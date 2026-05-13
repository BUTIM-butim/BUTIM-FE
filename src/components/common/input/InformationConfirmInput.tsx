import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import InputBase, { type InputStatus } from "./InputBase";
import InformationLabel from "./InformationLabel";
import OutlineButton from "../button/OutlineButton";

type InformationConfirmInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  label: string;
  caption?: string;
  status?: InputStatus;
  buttonText?: string;
  onButtonClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
};

const InformationConfirmInput = ({
  label,
  caption,
  status = "default",
  buttonText = "확인",
  onButtonClick,
  containerClassName = "",
  id,
  value,
  defaultValue,
  onChange,
  ...props
}: InformationConfirmInputProps) => {
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
    <div className={`flex flex-col gap-[14px] ${containerClassName}`}>
      <InformationLabel htmlFor={id} label={label} caption={caption} />

      <div className="flex h-[47px] w-[671px] items-center gap-[10px]">
        <InputBase
          id={id}
          inputSize="full"
          status={status}
          wrapperClassName="w-[570px] flex-none"
          textVariant="information"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />

        <div className="h-[47px] w-[91px] flex-none">
          <OutlineButton
            size="information"
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

export default InformationConfirmInput;
