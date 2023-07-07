const testPath = "@gera2ld/jsx-dom/dist/index.js";

export const providers: Record<string, (path: string) => string> = {
  jsdelivr: (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
  unpkg: (path: string) => `https://unpkg.com/${path}`,
};

export function cdnUrl(provider: string, path: string) {
  const factory = providers[provider];
  if (!factory) {
    throw new Error(`Provider ${provider} not found`);
  }
  return factory(path);
}

export function getFastestProvider(path = testPath) {
  return Promise.any(
    Object.entries(providers).map(async ([name, factory]) => {
      const res = await fetch(factory(path));
      if (!res.ok) {
        throw res;
      }
      await res.text();
      return name;
    })
  );
}

export async function getFastestCdnUrl(path?: string) {
  const provider = await getFastestProvider(path);
  return (path: string) => cdnUrl(provider, path);
}
