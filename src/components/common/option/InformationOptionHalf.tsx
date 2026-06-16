type InformationOptionHalfProps = {
  label: string;
  value: string;
  selected?: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick?: (value: string) => void;
};

const InformationOptionHalf = ({
  label,
  value,
  selected = false,
  error = false,
  disabled = false,
  onClick,
}: InformationOptionHalfProps) => {
  const buttonStyle = selected
    ? 'border-button-blue bg-card-background-blue text-navbar-blue'
    : error
      ? 'border-warning-red bg-white text-text-gray'
      : 'border-line-gray bg-white text-text-gray';

  const iconStyle = selected
    ? 'border-button-blue bg-button-blue'
    : error
      ? 'border-warning-red bg-white'
      : 'border-placeholder-gray bg-white';

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onClick?.(value)}
      className={`
        group relative flex h-[47px] w-[320px] items-center overflow-hidden
        rounded-[10px] border-[1.4px] px-[16px]
        ${buttonStyle}
        typo-navbar-button
        transition-colors duration-150
        disabled:cursor-not-allowed disabled:opacity-50
      `}
    >
      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center">
        <span
          className={`
            flex h-[13px] w-[13px] items-center justify-center rounded-full border-[1.2px]
            ${iconStyle}
          `}
        >
          {selected && (
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 3L3 5L7 1"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </span>

      <span className="ml-[8px] truncate">{label}</span>

      {!selected && !disabled && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-10 rounded-[10px]
            bg-white opacity-0 transition-opacity duration-150
            group-hover:opacity-[0.18]
          "
        />
      )}
    </button>
  );
};

export default InformationOptionHalf;