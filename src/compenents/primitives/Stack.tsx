import React from "react";
const GAPS = {
  xs: "gap-1",
  sm: "gap-3",
  md: "gap-6",
  lg: "gap-8"
};

const Stack = ({
  as: Component = "div",
  gap = "md",
  className = "",
  children,
  ...props
}) => {

  const gapClass = GAPS[gap] || GAPS.md;

  return (
    <Component
      className={`flex flex-col ${gapClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Stack;