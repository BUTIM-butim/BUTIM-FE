type FieldLabelVariant = "login" | "information" | "search";

type FieldLabelProps = {
  label: string;
  caption?: string;
  htmlFor?: string;
  variant?: FieldLabelVariant;
  className?: string;
};

const labelStyles: Record<FieldLabelVariant, string> = {
  login: "typo-login-label text-text-black",
  information: "typo-popup-button text-text-black",
  search: "typo-job-label text-text-black",
};

const captionStyles: Record<FieldLabelVariant, string> = {
  login: "typo-optionlist-caption text-placeholder-gray",
  information: "typo-optionlist-caption text-placeholder-gray",
  search: "typo-optionlist-caption text-placeholder-gray",
};

const FieldLabel = ({
  label,
  caption,
  htmlFor,
  variant = "information",
  className = "",
}: FieldLabelProps) => {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      <label htmlFor={htmlFor} className={labelStyles[variant]}>
        {label}
      </label>

      {caption && <p className={captionStyles[variant]}>{caption}</p>}
    </div>
  );
};

export default FieldLabel;
