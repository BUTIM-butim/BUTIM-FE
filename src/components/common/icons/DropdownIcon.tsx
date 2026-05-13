type DropdownIconProps = {
  className?: string;
};

const DropdownIcon = ({ className = "" }: DropdownIconProps) => {
  return (
    <svg
      className={`h-[17px] w-[17px] text-number-gray ${className}`}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="translate(-65 -77)">
        <path
          d="M66.8496 82.1752L73.4996 88.8252L80.1496 82.1752"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DropdownIcon;
