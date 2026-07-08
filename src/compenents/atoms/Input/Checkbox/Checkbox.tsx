import React from "react";
import styles from "./Checkbox.module.css";


/* ---------------- TYPES ---------------- */
type CheckboxSize = "sm" | "md" | "lg";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  labelPosition?: "right" | "left";
  indeterminate?: boolean;
  size?: CheckboxSize;
};

/* ---------------- COMPONENT ---------------- */

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  labelPosition = "right",
  size = "md",
  required = false,
  disabled = false,
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  className = "",
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle indeterminate state
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const inputElement = (
    <input
      ref={inputRef}
      type="checkbox"
      id={id}
      className={`${styles.formcontrol} ${styles[size]} ${className}`}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      required={required}
      onChange={onChange}
      {...props}
    />
  );

  return (
    <label htmlFor={id} className={`${styles.wrapper} ${styles[size]} ${className}`}>

      {labelPosition === "left" && (
        <span className={styles.label}>{label}</span>
      )}

      {inputElement}

      {labelPosition === "right" && (
        <span className={styles.label}>{label}</span>
      )}

      
    </label>
  );
};

export default Checkbox;