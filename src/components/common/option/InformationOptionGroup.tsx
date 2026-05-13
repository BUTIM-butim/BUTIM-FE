import InformationOptionButton from "./InformationOptionButton";

type SelectionMode = "single" | "multiple";

type InformationOptionGroupProps = {
  options: string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  selectionMode?: SelectionMode;
  columns?: 1 | 2;
  buttonSize?: "half" | "full";
  className?: string;
};

const columnStyles: Record<1 | 2, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const InformationOptionGroup = ({
  options,
  value,
  onChange,
  selectionMode = "single",
  columns = 2,
  buttonSize = "half",
  className = "",
}: InformationOptionGroupProps) => {
  const isSelected = (option: string) => {
    if (selectionMode === "multiple") {
      return Array.isArray(value) && value.includes(option);
    }

    return value === option;
  };

  const handleClick = (option: string) => {
    if (selectionMode === "multiple") {
      const currentValues = Array.isArray(value) ? value : [];

      const nextValues = currentValues.includes(option)
        ? currentValues.filter((item) => item !== option)
        : [...currentValues, option];

      onChange?.(nextValues);
      return;
    }

    onChange?.(option);
  };

  return (
    <div
      className={`
        grid w-[671px] gap-x-[31px] gap-y-[14px]
        ${columnStyles[columns]}
        ${className}
      `}
    >
      {options.map((option) => (
        <InformationOptionButton
          key={option}
          size={buttonSize}
          selected={isSelected(option)}
          onClick={() => handleClick(option)}
        >
          {option}
        </InformationOptionButton>
      ))}
    </div>
  );
};

export default InformationOptionGroup;
