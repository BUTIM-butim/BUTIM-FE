type GoIconSize = "large" | "medium" | "small" | "moreSmall";
type GoIconDirection = "right" | "left" | "down" | "up";

type GoIconProps = {
  size?: GoIconSize;
  direction?: GoIconDirection;
  className?: string;
};

const iconMap: Record<
  GoIconSize,
  {
    className: string;
    viewBox: string;
    path: string;
    baseDirection: GoIconDirection;
  }
> = {
  large: {
    className: "h-5 w-5", // 20px
    viewBox: "0 0 20 20",
    path: "M7 17L14 10L7 3",
    baseDirection: "right",
  },
  medium: {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 18 18",
    path: "M6.3499 15.2998L12.6499 8.9998L6.3499 2.6998",
    baseDirection: "right",
  },
  small: {
    className: "h-[14px] w-[14px]",
    viewBox: "0 0 14 14",
    path: "M2.1001 5.0502L7.0001 9.9502L11.9001 5.0502",
    baseDirection: "down",
  },
  moreSmall: {
    className: "h-3 w-3", // 12px
    viewBox: "0 0 12 12",
    path: "M4.4001 10.2002L8.6001 6.0002L4.4001 1.80019",
    baseDirection: "right",
  },
};

const getDirectionClass = (
  baseDirection: GoIconDirection,
  direction: GoIconDirection,
) => {
  if (baseDirection === direction) return "";

  if (baseDirection === "right") {
    const directionStyles: Record<GoIconDirection, string> = {
      right: "",
      left: "rotate-180",
      down: "rotate-90",
      up: "-rotate-90",
    };

    return directionStyles[direction];
  }

  if (baseDirection === "down") {
    const directionStyles: Record<GoIconDirection, string> = {
      down: "",
      up: "rotate-180",
      right: "-rotate-90",
      left: "rotate-90",
    };

    return directionStyles[direction];
  }

  return "";
};

const GoIcon = ({
  size = "medium",
  direction,
  className = "",
}: GoIconProps) => {
  const icon = iconMap[size];
  const iconDirection = direction ?? icon.baseDirection;
  const directionClass = getDirectionClass(icon.baseDirection, iconDirection);

  return (
    <svg
      className={`${icon.className} ${directionClass} ${className}`}
      viewBox={icon.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={icon.path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GoIcon;
