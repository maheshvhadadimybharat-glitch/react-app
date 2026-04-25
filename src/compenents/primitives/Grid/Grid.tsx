import React from "react";
import styles from "./Grid.module.css";

const Grid = ({
  children,
  cols = "1 1 1",
  gap = "md",
  className = "",
}) => {

  const [mobile, tablet, desktop] = cols.split(" ");

  const gridStyle = {
    "--cols-mobile": mobile,
    "--cols-tablet": tablet || mobile,
    "--cols-desktop": desktop || tablet || mobile,
  };

  const classes = [
    styles.grid,
    styles[`gap-${gap}`]
  ];

  if (className) classes.push(className);

  return (
    <div
      className={classes.join(" ")}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default Grid;