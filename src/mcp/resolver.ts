import mcp from "./mcp.json";

function getToken(path: string) {
  const keys = path.split(".");
  let result: any = mcp.tokens;

  keys.forEach((key) => {
    result = result[key];
  });

  return result;
}

export function resolveValue(value: any): any {
  if (typeof value !== "string") return value;

  // Replace all {token.path} inside string
  return value.replace(/\{([^}]+)\}/g, (_, tokenPath) => {
    const resolved = getToken(tokenPath);
    return resolved ?? "";
  });
}

export function resolveStyles(styles: any) {
  const resolved: any = {};

  Object.entries(styles).forEach(([key, value]) => {
    resolved[key] = resolveValue(value);
  });

  return resolved;
}