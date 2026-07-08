import React from "react";
import { ICON_REGISTRY } from "./iconRegistry";

/* ------------------ TYPES ------------------ */

export type IconName = keyof typeof ICON_REGISTRY;

export type IconSize = "inherit" | "xs" | "sm" | "md" | "lg" | "xl";

export type IconRounded = "none" | "sm" | "md" | "lg" | "full";

export type IconVariant = "filled" | "outlined" | "ghost";

type IconProps = {
  name: IconName;
  size?: IconSize | number;

  color?: string;
  className?: string;

  variant?: IconVariant;
  backgroundColor?: string;
  borderColor?: string;

  rounded?: IconRounded;
  padding?: number;
};

/* ------------------ CONSTANTS ------------------ */

const ICON_SIZES: Record<Exclude<IconSize, "inherit">, string> = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.75rem",
  xl: "2.25rem",
};

const PADDING_MAP: Record<Exclude<IconSize, "inherit">, number> = {
  xs: 6,
  sm: 8,
  md: 8,
  lg: 10,
  xl: 12,
};

const ROUNDED_MAP: Record<IconRounded, string> = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "12px",
  full: "9999px",
};

/* ------------------ COMPONENT ------------------ */

const Icon: React.FC<IconProps> = ({
  name,
  size = "inherit",
  color = "currentColor",
  className = "",

  variant = "ghost",
  backgroundColor,
  borderColor,

  rounded = "full",
  padding,
  ...props
}) => {
  const Component = ICON_REGISTRY[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  /* -------- Size -------- */

  const iconSize =
    typeof size === "number"
      ? `${size}px`
      : size === "inherit"
      ? "1em"
      : ICON_SIZES[size];

  const computedPadding =
    padding ??
    (size === "inherit" ? 6 : PADDING_MAP[size] ?? PADDING_MAP.md);

  const hasContainer = variant !== "ghost";

  /* -------- Variant Styles -------- */

  const variantStyles: React.CSSProperties = {
    ...(variant === "filled" && {
      backgroundColor: backgroundColor || "var(--color-neutralColor50)",
      color: color || "var(--color-text-light)",
    }),

    ...(variant === "outlined" && {
      border: `1px solid ${borderColor || color}`,
      color: color,
    }),
  };

  /* -------- Final Style -------- */

  const wrapperStyle: React.CSSProperties = {
    fontSize: iconSize,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color,

    ...(hasContainer && {
      padding: `${computedPadding}px`,
      borderRadius: ROUNDED_MAP[rounded],
    }),

    ...variantStyles,
  };

  return (
    <span style={wrapperStyle} className={className}>
      <Component size="1em" {...props} />
    </span>
  );
};

export default Icon;