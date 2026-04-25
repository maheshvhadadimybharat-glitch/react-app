import React from "react";
import styles from "./Container.module.css";

const Container = ({
  children,
  size = "xl",
  className = "",
  ...props
}) => {

  const sizeMap = {
    sm: "var(--size-container-sm)",
    md: "var(--size-container-md)",
    lg: "var(--size-container-lg)"
  };

  const style = {
    maxWidth: sizeMap[size]
  };

  const classes = [styles.container, className].join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;