// src/exports-wasm.js
console.log("running exports-wasm.mjs");
var addWasm = Uint8Array.from([
  0,
  97,
  115,
  109,
  1,
  0,
  0,
  0,
  1,
  7,
  1,
  96,
  2,
  127,
  127,
  1,
  127,
  3,
  2,
  1,
  0,
  7,
  7,
  1,
  3,
  97,
  100,
  100,
  0,
  0,
  10,
  9,
  1,
  7,
  0,
  32,
  0,
  32,
  1,
  106,
  11
]).buffer;
var wasm = await WebAssembly.instantiate(addWasm, {
  env: { abort: () => console.log("Abort!") }
});
console.log("exports-wasm.mjs: wasm instantiated");
var add = wasm.instance.exports.add;

// src/lib-1.js
console.log("running consumer-1.mjs");
var addTwoNumbers = (a, b, addImplementation = add) => {
  console.log("running addTwoNumbers");
  return addImplementation(a, b);
};

// src/lib-2.js
console.log("running consumer-2.mjs");
var addThreeNumbers = (a, b, c, addImplementation = add) => {
  console.log("running addTwoNumbers");
  return addImplementation(addImplementation(a, b), c);
};

// src/app-shakable.js
console.log("running app.mjs");
var myAdd = (a, b) => a + b;
console.log(`addTwoNumbers: ${addTwoNumbers(1, 2, myAdd)}`);
console.log(`addThreeNumbers: ${addThreeNumbers(1, 2, 3, myAdd)}`);
//# sourceMappingURL=app-shakable.js.map
