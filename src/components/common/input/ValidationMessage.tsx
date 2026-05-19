import WarningIcon from "../icons/WarningIcon";

type ValidationMessageProps = {
  children: string;
  className?: string;
};

const ValidationMessage = ({
  children,
  className = "",
}: ValidationMessageProps) => {
  return (
    <p
      className={`
        flex h-[14px] items-center gap-[2px] text-warning-red
        ${className}
      `}
    >
      <WarningIcon />
      <span className="typo-warning-text">{children}</span>
    </p>
  );
};

export default ValidationMessage;
