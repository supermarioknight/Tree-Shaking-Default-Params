console.log('running exports-wasm.mjs');

const addWasm = Uint8Array.from([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 7, 1, 96, 2, 127, 127, 1, 127, 3, 2, 1, 0, 7,
  7, 1, 3, 97, 100, 100, 0, 0, 10, 9, 1, 7, 0, 32, 0, 32, 1, 106, 11,
]).buffer;

const wasm = await WebAssembly.instantiate(addWasm, {
  env: { abort: () => console.log('Abort!') },
});

console.log('exports-wasm.mjs: wasm instantiated');

const add = wasm.instance.exports.add;

console.log('running consumer-1.mjs');

const addTwoNumbers = (a, b, addImplementation = add) => {
  console.log('running addTwoNumbers');
  return addImplementation(a, b);
};

console.log('running consumer-2.mjs');

const addThreeNumbers = (a, b, c, addImplementation = add) => {
  console.log('running addTwoNumbers');
  return addImplementation(addImplementation(a, b), c);
};

console.log('running app.mjs');

const myAdd = (a, b) => a + b;

console.log(`addTwoNumbers: ${addTwoNumbers(1, 2, myAdd)}`);
console.log(`addThreeNumbers: ${addThreeNumbers(1, 2, 3, myAdd)}`);
//# sourceMappingURL=app-shakable.js.map
