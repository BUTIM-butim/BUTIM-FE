import type { InputHTMLAttributes } from "react";
import InputBase, { type InputStatus } from "./InputBase";
import InformationLabel from "./InformationLabel";

type InformationLongInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string;
  caption?: string;
  status?: InputStatus;
  containerClassName?: string;
};

const InformationLongInput = ({
  label,
  caption,
  status = "default",
  id,
  containerClassName = "",
  ...props
}: InformationLongInputProps) => {
  return (
    <div className={`flex flex-col gap-[14px] ${containerClassName}`}>
      <InformationLabel htmlFor={id} label={label} caption={caption} />

      <InputBase
        id={id}
        inputSize="informationLong"
        status={status}
        textVariant="information"
        {...props}
      />
    </div>
  );
};

export default InformationLongInput;
