const testPath = "npm2url/dist/index.cjs";

const defaultProviders: Record<string, (path: string) => string> = {
  jsdelivr: (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
  unpkg: (path: string) => `https://unpkg.com/${path}`,
};

export class UrlBuilder {
  providers = { ...defaultProviders };

  provider = "jsdelivr";

  /**
   * Get the fastest provider name.
   * If none of the providers returns a valid response within `timeout`, an error will be thrown.
   */
  getFastestProvider(timeout = 5000, path = testPath) {
    return new Promise<string>((resolve, reject) => {
      Promise.all(
        Object.entries(this.providers).map(async ([name, factory]) => {
          try {
            const res = await fetch(factory(path));
            if (!res.ok) {
              throw res;
            }
            await res.text();
            resolve(name);
          } catch {
            // ignore
          }
        })
      ).then(() => reject(new Error("All providers failed")));
      setTimeout(reject, timeout, new Error("Timed out"));
    });
  }

  /**
   * Set the current provider to the fastest provider found by `getFastestProvider`.
   */
  async findFastestProvider(timeout?: number, path?: string) {
    this.provider = await this.getFastestProvider(timeout, path);
    return this.provider;
  }

  setProvider(name: string, factory: ((path: string) => string) | null) {
    if (factory) {
      this.providers[name] = factory;
    } else {
      delete this.providers[name];
    }
  }

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
