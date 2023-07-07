# npm2url

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

Convert an NPM package import into a CDN URL.

## Usage

Install package:

```sh
pnpm install npm2url
```

Import:

```ts
import { cdnUrl, getFastestCdnUrl } from "npm2url";

const url: string = cdnUrl('jsdelivr', 'npm2url');

// Or find the fastest provider
const fastestCdnUrl = await getFastestCdnUrl();
const url: string = fastestCdnUrl('npm2url');
```

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
