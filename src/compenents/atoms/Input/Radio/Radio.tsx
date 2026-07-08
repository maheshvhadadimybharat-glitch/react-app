import React from "react";
import styles from "./Radio.module.css";

const Radio = ({
  id,
  label,
  name,
  labelPosition = "right", // right | left 
  required = false,
  checked = false,
  disabled = false
}) => {
  return (
    <div className={styles.wrapper}>
      {labelPosition === "left" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        type="radio"
        name={name}
        className={styles.formcontrol}
        id={id}
        defaultChecked={checked}
        disabled={disabled}
        required={required}
      />

      {labelPosition === "right" && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
}

export default Radio;