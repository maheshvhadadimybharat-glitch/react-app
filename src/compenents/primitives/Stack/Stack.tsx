import React from "react";
import styles from "./Stack.module.css";

const gapMap = {
  none: "0",
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
};

const Stack = ({
  children,
  gap = "md",
  align,
  justify,
  className = "",
  as = "div",
  ...props
}) => {

  const Component = as;

  const stackStyle = {
    gap: gapMap[gap],
    alignItems: align,
    justifyContent: justify,
  };

  const classes = [styles.stack];

  if (className) {
    classes.push(className);
  }

  return (
    <Component
      className={classes.join(" ")}
      style={stackStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Stack;