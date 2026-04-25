import React from "react";
import styles from "./Icon.module.css";
import type { ICON_REGISTRY } from "./iconRegistry";

const ICON_SIZES = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.75rem",
  xl: "2.25rem",
};

const PADDING_MAP = {
  xs: 6,
  sm: 8,
  md: 8,
  lg: 10,
  xl: 12,
};

const Icon = ({
  name,
  size = "inherit", // default changed
  color = "currentColor",
  className = "",
  background = false,
  backgroundColor,
  rounded = "full",
  padding,
  ...props
}) => {

  const Component = ICON_REGISTRY[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  // Flexible size handling
  const iconSize =
    typeof size === "number"
      ? `${size}px`
      : size === "inherit"
      ? "1em"
      : ICON_SIZES[size] || ICON_SIZES.md;

  const computedPadding =
    padding ??
    (size === "inherit"
      ? 6
      : PADDING_MAP[size] || PADDING_MAP.md);

  // Always use wrapper for consistency
  const wrapperStyle = {
    fontSize: iconSize, 
    color: color,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    ...(background && {
      backgroundColor:
        backgroundColor || "var(--color-neutralColor50)",
      padding: `${computedPadding}px`,
      borderRadius:
        rounded === "full"
          ? "9999px"
          : rounded === "lg"
          ? "12px"
          : "6px",
    }),
  };

  return (
    <span style={wrapperStyle} className={className}>
      <Component size="1em" {...props} />
    </span>
  );
};

export default Icon;