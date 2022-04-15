console.log('running consumer-1.mjs');

import { add } from './exports-wasm.js';

export const addTwoNumbers = (a, b, addImplementation = add) => {
  console.log('running addTwoNumbers');
  return addImplementation(a, b);
};

const treeShakenString = `This string should not show up in any bundle.`;

export const easyToTreeShake = () => {
  console.log(`This function should be easy to tree-shake.`, treeShakenString);
};
