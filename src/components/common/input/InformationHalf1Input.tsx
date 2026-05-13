import type { InputHTMLAttributes } from "react";
import InputBase, { type InputRightType, type InputStatus } from "./InputBase";
import InformationLabel from "./InformationLabel";

type InformationHalf1InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  caption?: string;
  status?: InputStatus;
  rightType?: InputRightType;
  measure?: string;
  onRightClick?: () => void;
  containerClassName?: string;
};

const InformationHalf1Input = ({
  label,
  caption,
  status = "default",
  rightType = "none",
  measure,
  onRightClick,
  id,
  containerClassName = "",
  ...props
}: InformationHalf1InputProps) => {
  return (
    <div className={`flex flex-col gap-[14px] ${containerClassName}`}>
      <InformationLabel htmlFor={id} label={label} caption={caption} />

      <InputBase
        id={id}
        inputSize="informationHalf1"
        status={status}
        rightType={rightType}
        measure={measure}
        onRightClick={onRightClick}
        textVariant="information"
        {...props}
      />
    </div>
  );
};

export default InformationHalf1Input;
