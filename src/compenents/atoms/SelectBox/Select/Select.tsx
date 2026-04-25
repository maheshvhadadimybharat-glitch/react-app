import React from "react";
import styles from "./Select.module.css";

const Select = ({
  id,
  label,
  options = [],
  placeholder,
  description,
  error,
  labelIcon: LabelIcon,
  icon: Icon,
  descIcon: DescIcon,
  size = "default",        // default | lg
  required = false,
  variant = '',           // filter
  ...props
}) => { 
  const sizeClass = size !== "default" ? styles[size] : ""

  const descriptionId = description ? `${id}-desc` : undefined
  const errorId = error ? `${id}-error` : undefined

  const ariaDescribedBy = [descriptionId, errorId]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
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
      <div className={`${styles.section} ${sizeClass} ${error ? styles.error : ""}`}>
        {Icon && <span className={styles.icon}><Icon /></span>}

        <select
          id={id}
          className={`${styles.formcontrol}` }
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          required
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}

        </select>
      </div>

      {description && <div id={descriptionId} className={styles.description}>
        <span>
          {DescIcon && <DescIcon className={styles.descicon} />}
        </span>  
        {description}
      </div>}

       {error && (
        <p
          id={errorId}
          className={`${styles.description} ${styles.errorText}`}
          role="alert"
        >
          {error}
        </p>
      )}

    </div>
  )
}

export default Select;