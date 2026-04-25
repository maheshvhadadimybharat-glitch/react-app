import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  id,
  label,
  name,
  labelPosition = "right", // right | left 
  required = false,
  checked = false,
  disabled = false
}) => {
  return(
    <div className={styles.wrapper}>  
      { labelPosition === "left" && (
        <label for={id} className={styles.label}>
          {label}
        </label>
      )}
      
      <input 
        type="checkbox" 
        name={name}
        className={styles.formcontrol} 
        id={id} 
        //checked={checked}
        disabled={disabled}
        />
      
      { labelPosition === "right" && (
        <label for={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox;