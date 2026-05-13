import FieldLabel from "./FieldLabel";

type InformationLabelProps = {
  label: string;
  caption?: string;
  htmlFor?: string;
  className?: string;
};

const InformationLabel = ({
  label,
  caption,
  htmlFor,
  className = "",
}: InformationLabelProps) => {
  return (
    <FieldLabel
      htmlFor={htmlFor}
      label={label}
      caption={caption}
      variant="information"
      className={className}
    />
  );
};

export default InformationLabel;
