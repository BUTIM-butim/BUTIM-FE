type CheckIconVariant =
  | "smallGray"
  | "smallBlue"
  | "smallWarning"
  | "large"
  | "strategyBlue"
  | "strategyGreen"
  | "plainBlue";

type CheckIconProps = {
  variant?: CheckIconVariant;
  checked?: boolean;
  className?: string;
};

const circlePathSmall =
  "M8.5 15C9.35374 15.001 10.1993 14.8334 10.988 14.5067C11.7768 14.1799 12.4932 13.7006 13.0961 13.0961C13.7006 12.4932 14.1799 11.7768 14.5067 10.988C14.8334 10.1993 15.001 9.35374 15 8.5C15.001 7.64625 14.8334 6.80072 14.5067 6.01196C14.1799 5.22321 13.7006 4.50678 13.0961 3.90385C12.4932 3.29941 11.7768 2.82005 10.988 2.49333C10.1993 2.1666 9.35374 1.99895 8.5 2C7.64625 1.99895 6.80072 2.1666 6.01196 2.49333C5.22321 2.82005 4.50678 3.29941 3.90385 3.90385C3.29941 4.50678 2.82005 5.22321 2.49333 6.01196C2.1666 6.80072 1.99895 7.64625 2 8.5C1.99895 9.35374 2.1666 10.1993 2.49333 10.988C2.82005 11.7768 3.29941 12.4932 3.90385 13.0961C4.50678 13.7006 5.22321 14.1799 6.01196 14.5067C6.80072 14.8334 7.64625 15.001 8.5 15Z";

const checkPathSmall = "M5.8999 8.4998L7.8499 10.4498L11.7499 6.5498";

const circlePathLarge =
  "M10.0294 18.5295C11.084 18.5308 12.1285 18.3237 13.1029 17.9201C14.0772 17.5165 14.9622 16.9244 15.707 16.1777C16.4537 15.4329 17.0458 14.5479 17.4494 13.5736C17.853 12.5992 18.0601 11.5547 18.0588 10.5001C18.0601 9.44549 17.853 8.401 17.4494 7.42666C17.0458 6.45231 16.4537 5.56732 15.707 4.82252C14.9622 4.07585 14.0772 3.48371 13.1029 3.08011C12.1285 2.67651 11.084 2.46941 10.0294 2.47071C8.97479 2.46941 7.9303 2.67651 6.95595 3.08011C5.98161 3.48371 5.09662 4.07585 4.35182 4.82252C3.60515 5.56732 3.013 6.45231 2.6094 7.42666C2.2058 8.401 1.99871 9.44549 2.00001 10.5001C1.99871 11.5547 2.2058 12.5992 2.6094 13.5736C3.013 14.5479 3.60515 15.4329 4.35182 16.1777C5.09662 16.9244 5.98161 17.5165 6.95595 17.9201C7.9303 18.3237 8.97479 18.5308 10.0294 18.5295Z";

const checkPathLarge = "M6.81787 10.4996L9.22669 12.9085L14.0443 8.09082";

const circlePathStrategy =
  "M13.3724 24.7057C14.7786 24.7074 16.1712 24.4313 17.4703 23.8932C18.7695 23.355 19.9494 22.5655 20.9425 21.57C21.9381 20.5769 22.7276 19.3969 23.2657 18.0978C23.8039 16.7986 24.08 15.406 24.0783 13.9998C24.08 12.5937 23.8039 11.201 23.2657 9.90188C22.7276 8.60276 21.9381 7.42277 20.9425 6.4297C19.9494 5.43414 18.7695 4.64462 17.4703 4.10648C16.1712 3.56835 14.7786 3.29222 13.3724 3.29395C11.9662 3.29222 10.5736 3.56835 9.27444 4.10648C7.97532 4.64462 6.79532 5.43414 5.80226 6.4297C4.8067 7.42277 4.01718 8.60276 3.47904 9.90188C2.94091 11.201 2.66478 12.5937 2.66651 13.9998C2.66478 15.406 2.94091 16.7986 3.47904 18.0978C4.01718 19.3969 4.8067 20.5769 5.80226 21.57C6.79532 22.5655 7.97532 23.355 9.27444 23.8932C10.5736 24.4313 11.9662 24.7074 13.3724 24.7057Z";

const checkPathStrategy = "M9.09033 13.9994L12.3021 17.2111L18.7256 10.7876";

const CheckIcon = ({
  variant = "smallGray",
  checked = false,
  className = "",
}: CheckIconProps) => {
  if (variant === "smallGray") {
    return (
      <svg
        className={className}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={circlePathSmall}
          stroke="var(--color-popup-gray)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {checked && (
          <path
            d={checkPathSmall}
            stroke="var(--color-popup-gray)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }

  if (variant === "smallBlue") {
    return (
      <svg
        className={className}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={circlePathSmall}
          fill={checked ? "var(--color-button-blue)" : "none"}
          stroke={
            checked
              ? "var(--color-button-blue)"
              : "var(--color-placeholder-gray)"
          }
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {checked && (
          <path
            d={checkPathSmall}
            stroke="var(--color-white)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }

  if (variant === "smallWarning") {
    return (
      <svg
        className={className}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={circlePathSmall}
          stroke="var(--color-warning-red)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {checked && (
          <path
            d={checkPathSmall}
            stroke="var(--color-warning-red)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }

  if (variant === "large") {
    return (
      <svg
        className={className}
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={circlePathLarge}
          stroke="var(--color-text-black)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {checked && (
          <path
            d={checkPathLarge}
            stroke="var(--color-text-black)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }

  if (variant === "plainBlue") {
    return (
      <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3.5 10.5L8 15L16.5 5.5"
          stroke="var(--color-button-blue)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "strategyBlue") {
    return (
      <svg
        className={className}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={circlePathStrategy}
          fill={checked ? "var(--color-button-blue)" : "none"}
          stroke={
            checked ? "var(--color-button-blue)" : "var(--color-line-gray)"
          }
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {checked && (
          <path
            d={checkPathStrategy}
            stroke="var(--color-white)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={circlePathStrategy}
        fill={checked ? "var(--color-button-green)" : "none"}
        stroke={
          checked ? "var(--color-button-green)" : "var(--color-line-gray)"
        }
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {checked && (
        <path
          d={checkPathStrategy}
          stroke="var(--color-white)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default CheckIcon;
