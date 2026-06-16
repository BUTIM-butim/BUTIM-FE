import type { InputHTMLAttributes } from "react";
import InputBase, { type InputRightType, type InputStatus } from "./InputBase";
import InformationLabel from "./InformationLabel";

type InformationLongRightInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  caption?: string;
  status?: InputStatus;
  error?: boolean;
  rightType?: InputRightType;
  measure?: string;
  onRightClick?: () => void;
  containerClassName?: string;
};

const InformationLongRightInput = ({
  label,
  caption,
  status = "default",
  error = false,
  rightType = "measure",
  measure = "measure",
  onRightClick,
  id,
  containerClassName = "",
  ...props
}: InformationLongRightInputProps) => {
  const inputStatus: InputStatus = error ? "error" : status;

  return (
    <div className={`flex flex-col gap-[14px] ${containerClassName}`}>
      <InformationLabel htmlFor={id} label={label} caption={caption} />

      <InputBase
        id={id}
        inputSize="informationLong"
        status={inputStatus}
        rightType={rightType}
        measure={measure}
        onRightClick={onRightClick}
        textVariant="information"
        {...props}
      />
    </div>
  );
};

export default InformationLongRightInput;