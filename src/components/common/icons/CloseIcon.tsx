type CloseIconProps = {
  className?: string;
};

const CloseIcon = ({ className = "" }: CloseIconProps) => {
  return (
    <svg
      className={`h-[31px] w-[31px] text-text-black transition-colors duration-200 hover:text-text-blue ${className}`}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21.5 9L9.5 22M9.5 9L21.5 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseIcon;
