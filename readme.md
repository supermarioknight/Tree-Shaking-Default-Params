# Tree-Shaking Default Parameters

This demo tests how various bundlers handle [Libauth](https://github.com/bitauth/libauth/)'s WebAssembly crypto implementations (`ripemd160`, `sha1`, `sha256`, `sha512`, and `secp256k1`).

As a [pure ESM library](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c), Libauth v2 can asynchronously instantiate each WASM implementation internally, exporting simple interfaces that behave like collections of JS-only functions (with better performance).

Many of Libauth's exported functions also use one of these built-in WASM instances as a default parameter. For example, `decodeBase58Address` has the definition:

```ts
export const decodeBase58Address = (
  address: string,
  sha256: { hash: (input: Uint8Array) => Uint8Array } = internalSha256
) => {
  // ...
};
```

Most application can simply call `decodeBase58Address(address)` to automatically use the default, WASM-based `sha256` implementation (`internalSha256`). See [`src/app-default.js`](./src/app-default.js).

Applications that already have another `sha256` implementation can provide that implementation as the second parameter: `decodeBase58Address(address, mySha256Implementation)`. In this case, the default parameter (`internalSha256`) is dead code, and should be possible to eliminate from the application's bundle (commonly called [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) in the JavaScript ecosystem). See [`src/app-shakable.js`](./src/app-shakable.js).

## Bundler Support

This repo tests dead-code elimination of unused default parameters as used in Libauth (with asynchronously instantiated WASM implementations): [`src/app-shakable.js`](./src/app-shakable.js).

Currently, **dead-code elimination of unused default parameters** is not support by any known bundler.

| Bundler                                 |                      Support                       | Issue |
| --------------------------------------- | :------------------------------------------------: | ----- |
| [`esbuild`](https://esbuild.github.io/) | ❌ ([example](./bundlers/esbuild/app-shakable.js)) |       |
| [`parcel`](https://parceljs.org/)       | ❌ ([example](./bundlers/parcel/app-shakable.js))  |       |
| [`rollup`](https://rollupjs.org/)       | ❌ ([example](./bundlers/rollup/app-shakable.js))  |       |
| [`webpack`](https://webpack.js.org/)    |    ❌ ([example](./bundlers/webpack/main.mjs))     |       |

This simpler example may also be useful for quickly testing support in bundlers:

`package.json`:

```json
{
  "type": "module"
}
```

`module.js`:

```js
// should not appear in bundle:
const internalAdd = (a, b) => (a === '0' ? b : a + b);

export const addAndLog = (a, b, impl = internalAdd) => console.log(impl(a, b));
```

`app.js`:

```js
import { addAndLog } from './module.js';

const myAdd = (a, b) => a + b;

addAndLog(1, 2, myAdd); // => 3
```
