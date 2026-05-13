import InformationOptionHalf from "./InformationOptionHalf";

export type InformationOptionItem = {
  label: string;
  value: string;
};

type SingleOptionProps = {
  selectionMode?: "single";
  options: InformationOptionItem[];
  value?: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

type MultipleOptionProps = {
  selectionMode: "multiple";
  options: InformationOptionItem[];
  value?: string[];
  error?: boolean;
  disabled?: boolean;
  onChange?: (value: string[]) => void;
};

type InformationOptionTwoColumnProps = SingleOptionProps | MultipleOptionProps;

const InformationOptionTwoColumn = (props: InformationOptionTwoColumnProps) => {
  const { options, error = false, disabled = false } = props;

  const isMultiple = props.selectionMode === "multiple";

  const hasValue = isMultiple
    ? Array.isArray(props.value) && props.value.length > 0
    : Boolean(props.value);

  const isSelected = (optionValue: string) => {
    if (isMultiple) {
      return props.value?.includes(optionValue) ?? false;
    }

    return props.value === optionValue;
  };

  const handleClick = (optionValue: string) => {
    if (isMultiple) {
      const currentValue = props.value ?? [];

      const nextValue = currentValue.includes(optionValue)
        ? currentValue.filter((value) => value !== optionValue)
        : [...currentValue, optionValue];

      props.onChange?.(nextValue);
      return;
    }

    props.onChange?.(optionValue);
  };

  return (
    <div className="grid w-[671px] grid-cols-2 gap-x-[31px] gap-y-[14px]">
      {options.map((option) => (
        <InformationOptionHalf
          key={option.value}
          label={option.label}
          value={option.value}
          selected={isSelected(option.value)}
          error={error && !hasValue}
          disabled={disabled}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default InformationOptionTwoColumn;
