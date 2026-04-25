import React from "react";
import styles from "./TableCell.module.css";

const TableCell = ({
  as:Component = "td",
  children,
  align = "left" // left | right | center
}) => {
  return (
      <Component
        className={`${styles.cell} ${styles[align]}`}
      >
      {children}
      </Component>
  );    
}

export default TableCell;