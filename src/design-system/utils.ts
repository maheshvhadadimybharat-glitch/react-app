export function resolveToken(value: string, theme: Record<string, unknown>): string {
  if (!value) return value;

  const t = theme as Record<string, unknown>;

  const rootMap: Record<string, unknown> = {
    color: t['colors'],
    spacing: t['spacing'],
    radius: t['radius'],
    typography: t['typography'],
    components: t['components'],
    semantic: t['semantic'] || {},
  };

  console.log("Resolving:", value);

  return value.replace(/\{(.*?)\}/g, (_match, tokenPath) => {
    const path = (tokenPath as string).split('.');

    let result: unknown = rootMap[path[0]];

    for (let i = 1; i < path.length; i++) {
      if (result && typeof result === 'object') {
        result = (result as Record<string, unknown>)[path[i]];
      } else {
        result = undefined;
        break;
      }
    }

    return (result as string) ?? `{${tokenPath}}`;
  });

}