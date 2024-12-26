# npm2url

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

Convert an NPM package import into a CDN URL.

This is useful when you want your users to access the assets without needing to install the dependencies, and not being tied to a certain CDN.

## Installation

Install package:

```sh
pnpm install npm2url
```

## Quick Start

```ts
import { UrlBuilder, urlBuilder } from "npm2url";

// Get the full CDN URL for `npm2url` package, using the default provider
console.log(urlBuilder.getFullUrl("npm2url"));
// -> https://cdn.jsdelivr.net/npm/npm2url

// Get the full CDN URL for `npm2url` package, specifically using `jsdelivr` provider
console.log(urlBuilder.getFullUrl("npm2url", "jsdelivr"));
// -> https://cdn.jsdelivr.net/npm/npm2url

// You may also create a new instance to hold different properties
const anotherBuilder = new UrlBuilder();
console.log(anotherBuilder.getFullUrl("npm2url"));
```

## Advanced Usage

### Providers

```ts
import { urlBuilder } from "npm2url";

// Show all available providers
console.log(urlBuilder.providers);
// -> { jsdelivr: [Function], unpkg: [Function] }

// Show the name of the current provider
console.log(urlBuilder.provider);
// -> 'jsdelivr'
```

A provider is a simple function that accepts an npm path and returns a full URL string.

```ts
// Create a local provider
const providerName = "local";
urlBuilder.providers[providerName] = (path: string) =>
  `http://localhost:8080/assets/${path}`;

// Change the selected provider
urlBuilder.provider = providerName;
```

By default, there are two providers:

- `jsdelivr` (default)
- `unpkg`

### The fastest provider

Users from different regions may benefit from different CDNs. So we'd better check the connections to get the best CDN provider.

```ts
import { urlBuilder } from "npm2url";

// Update the selected provider to the fastest one
await urlBuilder.findFastestProvider();
// `urlBuilder.provider` is updated to the fastest provider
console.log(urlBuilder.getFullUrl("npm2url"));
// -> The fastest URL

// Or you may hope to get the fastest provider without changing the selected one
const fastest = await urlBuilder.getFastestProvider();
// `urlBuilder.provider` is not changed, pass `fastest` explicitly
console.log(urlBuilder.getFullUrl("npm2url", fastest));
// -> The fastest URL
```

Note that an error will be thrown if none of the providers is reachable.

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/npm2url?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/npm2url
[npm-downloads-src]: https://img.shields.io/npm/dm/npm2url?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/npm2url
[bundle-src]: https://img.shields.io/bundlephobia/minzip/npm2url?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=npm2url
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/npm2url
