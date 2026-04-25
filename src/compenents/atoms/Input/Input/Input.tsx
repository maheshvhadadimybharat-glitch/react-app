import React from "react";
import styles from "./Input.module.css";

const Input = ({
  id,
  label,
  placeholder,
  type,
  description,
  labelIcon: LabelIcon,
  icon: Icon,
  descIcon: DescIcon,
  variant="default",       // default | error | success
  size = "default",        // default | lg
  required = false,
  ...props
}) => { 
  const sizeClass = size !== "default" ? styles[size] : ""
  const variantClass = variant !== "default" ? styles[variant] : ""

  return (
    <div className={styles.wrapper}>
      { label && (
      <label htmlFor={id} className={styles.label}>
        <span className={styles.labelicon}>
          {LabelIcon && <LabelIcon className={styles.labelicon} />}
        </span> 
        {label}
        {required && <span className={styles.required} aria-hidden="true">  *</span>}
      </label>
      )
      }
      <div className={`${styles.section} ${sizeClass} ${variantClass}`}>
        {Icon && <span className={styles.icon}><Icon /></span>}

        <input
          id={id}
          type={type}
          className={styles.formcontrol}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {description && <div className={styles.description}>
        <span>
          {DescIcon && <DescIcon className={styles.descicon} />}
        </span>  
        {description}
      </div>}
    </div>
  )
}

export default Input;