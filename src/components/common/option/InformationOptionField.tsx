import InformationOptionTwoColumn, {
  type InformationOptionItem,
} from "./InformationOptionTwoColumn";

type SingleOptionFieldProps = {
  selectionMode?: "single";
  label: string;
  caption?: string;
  options: InformationOptionItem[];
  value?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

type MultipleOptionFieldProps = {
  selectionMode: "multiple";
  label: string;
  caption?: string;
  options: InformationOptionItem[];
  value?: string[];
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (value: string[]) => void;
};

type InformationOptionFieldProps =
  | SingleOptionFieldProps
  | MultipleOptionFieldProps;

const InformationOptionField = (props: InformationOptionFieldProps) => {
  const {
    label,
    caption,
    options,
    error = false,
    errorMessage,
    disabled = false,
  } = props;

  const isMultiple = props.selectionMode === "multiple";

  const hasValue = isMultiple
    ? Array.isArray(props.value) && props.value.length > 0
    : Boolean(props.value);

  const hasError = error && !hasValue;

  return (
    <div className="w-[671px]">
      <div className="mb-[17px]">
        <label className="block typo-navbar-button text-text-black">
          {label}
        </label>

        {caption && (
          <p className="mt-[8px] typo-option-list-caption text-placeholder-gray">
            {caption}
          </p>
        )}
      </div>

      {isMultiple ? (
        <InformationOptionTwoColumn
          selectionMode="multiple"
          options={options}
          value={props.value}
          error={hasError}
          disabled={disabled}
          onChange={props.onChange}
        />
      ) : (
        <InformationOptionTwoColumn
          selectionMode="single"
          options={options}
          value={props.value}
          error={hasError}
          disabled={disabled}
          onChange={props.onChange}
        />
      )}

      {hasError && errorMessage && (
        <p className="mt-[8px] typo-warning-text text-warning-red">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InformationOptionField;
