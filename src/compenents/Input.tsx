import React from "react";
import { theme } from "../design-system/theme";
import { resolveToken } from "../design-system/utils";

type InputVariant =
  keyof typeof theme.components.input.variants;

type InputSize =
  keyof typeof theme.components.input.sizes;

interface InputProps {
  placeholder?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
}

const Input = ({
  placeholder = "Enter text",
  variant = "default",
  size = "md",
  disabled = false,
}: InputProps) => {
  const componentConfig = theme.components?.input || {};

  const baseStyles = componentConfig.base || {};
  const variantStyles =
    componentConfig.variants?.[variant] || {};
  const sizeStyles =
    componentConfig.sizes?.[size] || {};

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles,
    ...sizeStyles,
  };

  const resolvedStyles = Object.entries(combinedStyles).reduce(
    (acc, [key, value]) => {
      const cssKey =
        key === "background" ? "backgroundColor" : key;

      acc[cssKey as any] = resolveToken(String(value), theme);
      return acc;
    },
    {} as React.CSSProperties
  );

  return (
    <input
      placeholder={placeholder}
      disabled={disabled}
      style={{
        ...resolvedStyles,
        outline: "none",
        width: "200px",
        opacity: disabled ? 0.5 : 1,
      }}
    />
  );
};

export default Input;