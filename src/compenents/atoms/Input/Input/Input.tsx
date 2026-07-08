import React from "react";
import styles from "./Input.module.css";

/* ---------------- TYPES ---------------- */

type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  description?: string;

  labelIcon?: React.ElementType;
  icon?: React.ElementType;
  descIcon?: React.ElementType;

  variant?: InputVariant;
  size?: InputSize;

  required?: boolean;
};

/* ---------------- COMPONENT ---------------- */

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  description,

  labelIcon: LabelIcon,
  icon: Icon,
  descIcon: DescIcon,

  variant = "default",
  size = "md",
  required = false,

  disabled = false,
  className = "",
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 8)}`;
  const descId = description ? `${inputId}-desc` : undefined;

  const variantClass =
    variant !== "default" ? styles[variant] : "";

  return (
    <div className={`${styles.wrapper} ${className}`}>
      
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {LabelIcon && (
            <span className={styles.labelIcon}>
              <LabelIcon />
            </span>
          )}

          {label}

          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input Section */}
      <div
        className={`
          ${styles.section}
          ${variantClass}
          ${disabled ? styles.disabled : ""}
        `}
      >
        {Icon && (
          <span className={styles.icon}>
            <Icon />
          </span>
        )}

        <input
          id={inputId}
          type={type}
          className={`${styles[size]} ${styles.formcontrol}`}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={variant === "error"}
          aria-describedby={descId}
          {...props}
        />
      </div>

      {/* Description / Helper */}
      {description && (
        <div id={descId} className={styles.description}>
          {DescIcon && (
            <span className={styles.descIcon}>
              <DescIcon />
            </span>
          )}
          {description}
        </div>
      )}
    </div>
  );
};

export default Input;