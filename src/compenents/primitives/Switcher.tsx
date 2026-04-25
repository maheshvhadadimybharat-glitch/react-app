import React from "react";
const GAP_MAP = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)"
};

const WIDTH_MAP = {
  sm: "var(--size-card-sm)",
  md: "var(--size-card-md)",
  lg: "var(--size-card-lg)"
};

const Switcher = ({
  as: Component = "div",
  gap = "md",
  minWidth = "md",
  className = "",
  children,
  ...props
}) => {

  const style = {
    display: "flex",
    flexWrap: "wrap",
    gap: GAP_MAP[gap] || GAP_MAP.md
  };

  const childStyle = {
    flexBasis: WIDTH_MAP[minWidth] || WIDTH_MAP.md,
    flexGrow: 1
  };

  const classes = [className].join(" ");

  return (
    <Component style={style} className={classes} {...props}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={childStyle}>
              {child}
            </div>
          ))
        : children}
    </Component>
  );
};

export default Switcher;