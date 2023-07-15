const testPath = "npm2url/dist/index.cjs";

const defaultProviders: Record<string, (path: string) => string> = {
  jsdelivr: (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
  unpkg: (path: string) => `https://unpkg.com/${path}`,
};

export class UrlBuilder {
  providers = { ...defaultProviders };

  provider = "jsdelivr";

  getFastestProvider(path = testPath) {
    return Promise.any(
      Object.entries(this.providers).map(async ([name, factory]) => {
        const res = await fetch(factory(path));
        if (!res.ok) {
          throw res;
        }
        await res.text();
        return name;
      })
    );
  }

  async findFastestProvider() {
    this.provider = await this.getFastestProvider();
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
