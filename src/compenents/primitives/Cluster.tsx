import React from "react";
const GAPS = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8"
};

const ALIGN = {
  start: "items-start",
  center: "items-center",
  end: "items-end"
};

const JUSTIFY = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly"
};

const Cluster = ({
  as: Component = "div",
  gap = "md",
  align = "center",
  justify = "start",
  wrap = true,
  className = "",
  children,
  ...props
}) => {

  const gapClass = GAPS[gap] || GAPS.md;
  const alignClass = ALIGN[align] || ALIGN.center;
  const justifyClass = JUSTIFY[justify] || JUSTIFY.start;
  const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";

  const classes = [
    "flex",
    wrapClass,
    gapClass,
    alignClass,
    justifyClass,
    className
  ].join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Cluster;