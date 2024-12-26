const testPath = "npm2url/dist/index.cjs";

const defaultProviders: Record<string, (path: string) => string> = {
  jsdelivr: (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
  unpkg: (path: string) => `https://unpkg.com/${path}`,
};

async function checkUrl(url: string, signal: AbortSignal) {
  const res = await fetch(url, {
    signal,
  });
  if (!res.ok) {
    throw res;
  }
  await res.text();
}

export class UrlBuilder {
  /** All available providers for this builder. */
  providers = { ...defaultProviders };

  /**
   * The currently selected provider name.
   */
  provider = "jsdelivr";

  /**
   * Get the fastest provider name.
   * If none of the providers returns a valid response within `timeout`, an error will be thrown.
   */
  async getFastestProvider(timeout = 5000, path = testPath) {
    const controller = new AbortController();
    let timer = 0;
    try {
      return await new Promise<string>((resolve, reject) => {
        Promise.all(
          Object.entries(this.providers).map(async ([name, factory]) => {
            try {
              await checkUrl(factory(path), controller.signal);
              resolve(name);
            } catch {
              // ignore
            }
          })
        ).then(() => reject(new Error("All providers failed")));
        timer = setTimeout(reject, timeout, new Error("Timed out"));
      });
    } finally {
      controller.abort();
      clearTimeout(timer);
    }
  }

  /**
   * Set the current provider to the fastest provider found by `getFastestProvider`.
   */
  async findFastestProvider(timeout?: number, path?: string) {
    this.provider = await this.getFastestProvider(timeout, path);
    return this.provider;
  }

  /**
   * @deprecated Modify `this.providers` directly.
   */
  setProvider(name: string, factory: ((path: string) => string) | null) {
    if (factory) {
      this.providers[name] = factory;
    } else {
      delete this.providers[name];
    }
  }

  /**
   * Resolve an npm path to a full URL with the specified provider or the currently selected provider.
   * If the path is already a full URL, it will be returned as is.
   */
  getFullUrl(path: string, provider = this.provider) {
    if (path.includes("://")) {
      return path;
    }
    const factory = this.providers[provider];
    if (!factory) {
      throw new Error(`Provider ${provider} not found`);
    }
    return factory(path);
  }
}

export const urlBuilder = new UrlBuilder();
