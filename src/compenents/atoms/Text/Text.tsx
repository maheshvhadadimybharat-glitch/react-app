import React from "react";
import styles from "./Text.module.css";

const Text = ({
  children,
  className = "",
  as,

  // Design props
  variant = "", // base | link | label1 | label2 | label3 | helper | h1-h6 | title1 | title2 | title3
  color = "",

  ...props
}) => {

  // detect heading variant
  const isHeading = /^h[1-6]$/.test(variant);

  // default semantic tag
  let defaultTag = "span";
  if (isHeading) defaultTag = variant;

  // polymorphic component
  const Component = as || defaultTag;

  // variant class
  const variantClass = styles[variant];

  // heading class (optional extra styling for headings)
  const headingClass = isHeading ? styles.heading : "";

  // color class
  const colorClass = color ? styles[`color-${color}`] : "";

  // styles
  const classes = [
    styles.text,
    headingClass,
    variantClass,
    colorClass,
    className
  ].filter(Boolean).join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;