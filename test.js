/**
 * Run each bundle, ensure all outputs match `src/app-default.js`
 */

import { execSync } from 'node:child_process';
const run = (path) => execSync(`node ${path}`, { encoding: 'utf8' });
const assertEqual = (expected, observed, description) => {
  if (expected !== observed) {
    console.error(description);
    console.error(`Expected:
${expected}`);
    console.error(`Observed:
${observed}`);
    process.exit(1);
  }
};

const expected = run('src/app-default.js');
const shakable = run('src/app-shakable.js');

assertEqual(
  expected,
  shakable,
  'src/app-shakable.js logged different output than src/app-default.js'
);

console.log(
  '✅ src/app-shakable.js produces the same output as src/app-default.js'
);

const esbuild = run('bundlers/esbuild/app-shakable.js');
assertEqual(expected, esbuild, 'esbuild logged unexpected output');
console.log('✅ esbuild');

const parcel = run('bundlers/parcel/app-shakable.js');
assertEqual(expected, parcel, 'parcel logged unexpected output');
console.log('✅ parcel');

const rollup = run('bundlers/rollup/app-shakable.js');
assertEqual(expected, rollup, 'rollup logged unexpected output');
console.log('✅ rollup');

const terser = run('bundlers/terser/app-shakable.js');
assertEqual(expected, terser, 'terser logged unexpected output');
console.log('✅ terser');

const webpack = run('bundlers/webpack/main.mjs');
assertEqual(expected, webpack, 'webpack logged unexpected output');
console.log('✅ webpack');

console.log('All tests passed.');
