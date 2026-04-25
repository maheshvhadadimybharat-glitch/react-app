import mcp from "./mcp.json";

export const theme = {
  colors: mcp.tokens.color,
  spacing: mcp.tokens.spacing,
  radius: mcp.tokens.radius,
  typography: mcp.tokens.typography,
  semantic: mcp.semantic,
  components: mcp.components,
};

export type Theme = typeof theme;