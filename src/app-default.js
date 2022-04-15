console.log('running app.mjs');

import { addTwoNumbers } from './lib-1.js';
import { addThreeNumbers } from './lib-2.js';

console.log(`addTwoNumbers: ${addTwoNumbers(1, 2)}`);
console.log(`addThreeNumbers: ${addThreeNumbers(1, 2, 3)}`);
