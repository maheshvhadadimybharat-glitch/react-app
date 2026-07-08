import mcp from "../mcp/mcp.json";
import { resolveStyles } from "../mcp/resolver";

type Props = {
  variant?: "filled" | "outlined" | "text";
  children: React.ReactNode;
};

export const Button = ({ variant = "filled", children }: Props) => {
  const config =
    mcp.components.button.variants[variant];

  const styles = resolveStyles(config);

  return (
    <button
      style={{
        background: styles.background,
        color: styles.color,
        border: styles.border,
        borderRadius: styles.radius,
        padding: styles.padding
      }}
    >
      {children}
    </button>
  );
};