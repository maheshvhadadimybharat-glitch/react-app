import React from "react";
import styles from "./Center.module.css";

const Center = ({
as: Component = "div",
  children,
  inline = false,
  full = false,
  textAlign = "center",
  className = "",
  ...props
}) => {

  const classes = [styles.center];

  if (inline) classes.push(styles.inline);
  if (full) classes.push(styles.full);
  if (className) classes.push(className);

  const style = {
    textAlign
  };

  return (
    <Component className={classes.join(" ")} style={style} {...props}>
      {children}
    </Component>
  );
};

export default Center;