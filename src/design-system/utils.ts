export function resolveToken(value: string, theme: any): string {
  if (!value) return value;

const rootMap: any = {
  color: theme.colors,
  spacing: theme.spacing,
  radius: theme.radius,
  typography: theme.typography,
  components: theme.components,
  semantic: (theme as any).semantic || {},
};

  console.log("Resolving:", value);

  return value.replace(/\{(.*?)\}/g, (_, tokenPath) => {
    const path = tokenPath.split(".");

    let result = rootMap[path[0]];

    for (let i = 1; i < path.length; i++) {
      result = result?.[path[i]];
    }

    return result ?? `{${tokenPath}}`;
  });

  
}