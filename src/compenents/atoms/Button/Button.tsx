import React from "react";
import styles from "./Button.module.css";

type ButtonVariant =
  | 'primary'
  | 'primary-outlined'
  | 'tonal'
  | 'success'
  | 'success-outlined'
  | 'danger'
  | 'danger-outlined'
  | 'blue'
  | 'blue-outlined';

type ButtonSize = 'default' | 'xs' | 'sm' | 'lg';

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  size = "default",
}) => {

  const variantClasses: Record<ButtonVariant, string> = {
    'primary': styles.primary,
    'primary-outlined': styles['primary-outlined'],
    'tonal': styles.tonal,
    'success': styles.success,
    'success-outlined': styles['success-outlined'],
    'danger': styles.danger,
    'danger-outlined': styles['danger-outlined'],
    'blue': styles.blue,
    'blue-outlined': styles['blue-outlined'],
  };

  const className = [
    styles.button,
    variantClasses[variant],
    styles[size],
  ].filter(Boolean).join(' ');

  return (
    <button className={`${className} w-full md:w-auto`} disabled={disabled}>
      {Icon && iconPosition === "left" && <Icon />}
      {label}
      {Icon && iconPosition === "right" && <Icon />}
    </button>
  );
};

export default Button;