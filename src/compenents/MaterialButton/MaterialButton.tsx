import React, { useRef, useState } from "react";
import styles from "./MaterialButton.module.css";

type Variant = "contained" | "outlined" | "text";
type Color = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface MaterialButtonProps {
  label: React.ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const colorMap: Record<Color, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
  secondary: "bg-gray-700 hover:bg-gray-800 text-white border-transparent",
  danger: "bg-red-600 hover:bg-red-700 text-white border-transparent",
};

const outlineMap: Record<Color, string> = {
  primary: "border-blue-600 text-blue-600",
  secondary: "border-gray-700 text-gray-700",
  danger: "border-red-600 text-red-600",
};

export default function MaterialButton({
  label,
  variant = "contained",
  color = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  startIcon,
  endIcon,
}: MaterialButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; key: number }>>([]);
  const counter = useRef(0);
  const ref = useRef<HTMLButtonElement | null>(null);

  const sizeClasses =
    size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  const variantClasses =
    variant === "contained"
      ? `${colorMap[color]} shadow-sm`
      : variant === "outlined"
      ? `bg-transparent border ${outlineMap[color]} hover:bg-gray-50`
      : `bg-transparent text-${color === "primary" ? "blue" : color === "secondary" ? "gray" : "red"}-600`;

  const base = `inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none ${sizeClasses}`;

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);
    const key = counter.current++;
    setRipples((r) => [...r, { x, y, key }]);
    window.setTimeout(() => setRipples((r) => r.filter((it) => it.key !== key)), 650);
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      className={`${base} ${variantClasses} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${styles.rippleContainer}`}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span>{label}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}

      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.key}
          className={styles.ripple}
          style={{ left: r.x, top: r.y, width: 20, height: 20, transform: "translate(-50%, -50%)" }}
        />
      ))}
    </button>
  );
}
