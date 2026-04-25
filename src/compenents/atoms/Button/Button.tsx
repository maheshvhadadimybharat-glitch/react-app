import React from "react";
import styles from "./Button.module.css";

const Button = ({
  label,
  variant = "primary",   // primary | primary-outlined | tonal  
                         // success | success-outlined 
                         // danger | danger-outlined
                         // blue | blue-outlined

  icon: Icon,            // optional icon component
  iconPosition = "left", // left | right
  disabled = false,
  size = "default",       // default | xs | sm | lg
}) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${styles.button} ${styles[variant]} ${styles[size]} w-full md:w-auto`}
      disabled={disabled}
    >
      {Icon && iconPosition === "left" && (
        <span className={styles.icon}>
          <Icon name />
        </span>
      )}

      {label}

      {Icon && iconPosition === "right" && (
        <span className={styles.icon}>
          <Icon />
        </span>
      )}
    </button>
  )
}

export default Button