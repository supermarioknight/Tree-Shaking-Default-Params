console.log('running consumer-2.mjs');

import { add } from './exports-wasm.js';

export const addThreeNumbers = (a, b, c, addImplementation = add) => {
  console.log('running addTwoNumbers');
  return addImplementation(addImplementation(a, b), c);
};
