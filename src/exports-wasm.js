console.log('running exports-wasm.mjs');

const addWasm = Uint8Array.from([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 7, 1, 96, 2, 127, 127, 1, 127, 3, 2, 1, 0, 7,
  7, 1, 3, 97, 100, 100, 0, 0, 10, 9, 1, 7, 0, 32, 0, 32, 1, 106, 11,
]).buffer;

const wasm = await WebAssembly.instantiate(addWasm, {
  env: { abort: () => console.log('Abort!') },
});

console.log('exports-wasm.mjs: wasm instantiated');

export const add = wasm.instance.exports.add;
