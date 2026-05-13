import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import SearchIcon from "../icons/SearchIcon";

type InformationSearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  label: string;
  onRightClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
};

const InformationSearchInput = ({
  label,
  onRightClick,
  onChange,
  id,
  value,
  defaultValue,
  containerClassName = "",
  className = "",
  ...props
}: InformationSearchInputProps) => {
  const [inputValue, setInputValue] = useState(
    defaultValue ? String(defaultValue) : "",
  );

  const currentValue = value !== undefined ? String(value) : inputValue;
  const isActive = currentValue.trim().length > 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className={`flex flex-col gap-[18px] ${containerClassName}`}>
      <label htmlFor={id} className="typo-job-label text-text-black">
        {label}
      </label>

      <div
        className={`
          flex h-[47px] w-[475px] items-center rounded-[10px] p-[1.3px]
          ${
            isActive
              ? "bg-gradient-to-r from-[#0070FC] via-[#0099B8] to-[#00A89C]"
              : "bg-line-gray"
          }
        `}
      >
        <div className="flex h-full w-full items-center rounded-[8.7px] bg-white px-[16px]">
          <input
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={`
              typo-navbar-button h-full min-w-0 flex-1 bg-transparent
              text-text-black placeholder:text-placeholder-gray outline-none
              ${className}
            `}
            {...props}
          />

          <button
            type="button"
            onClick={onRightClick}
            className="ml-[8px] flex shrink-0 cursor-pointer items-center justify-center"
            aria-label="검색"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationSearchInput;
