console.log('running exports-wasm.mjs');
const $bfc2ffcd3d771168$var$addWasm = Uint8Array.from([
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
    11, 
]).buffer;
const $bfc2ffcd3d771168$var$wasm = await WebAssembly.instantiate($bfc2ffcd3d771168$var$addWasm, {
    env: {
        abort: ()=>console.log('Abort!')
    }
});
console.log('exports-wasm.mjs: wasm instantiated');
const $bfc2ffcd3d771168$export$e16d8520af44a096 = $bfc2ffcd3d771168$var$wasm.instance.exports.add;


console.log('running consumer-1.mjs');
const $20b3eac4440e7a37$export$1cbec7fd653f250e = (a, b, addImplementation = $bfc2ffcd3d771168$export$e16d8520af44a096)=>{
    console.log('running addTwoNumbers');
    return addImplementation(a, b);
};
const $20b3eac4440e7a37$var$treeShakenString = `This string should not show up in any bundle.`;
const $20b3eac4440e7a37$export$1922ef276cba71f1 = ()=>{
    console.log(`This function should be easy to tree-shake.`, $20b3eac4440e7a37$var$treeShakenString);
};



console.log('running consumer-2.mjs');
const $6dfd1cd36348096d$export$fc03dfb7e6b0e31e = (a, b, c, addImplementation = $bfc2ffcd3d771168$export$e16d8520af44a096)=>{
    console.log('running addTwoNumbers');
    return addImplementation(addImplementation(a, b), c);
};


console.log('running app.mjs');
const $9c7907f5c03efc9a$var$myAdd = (a, b)=>a + b
;
console.log(`addTwoNumbers: ${$20b3eac4440e7a37$export$1cbec7fd653f250e(1, 2, $9c7907f5c03efc9a$var$myAdd)}`);
console.log(`addThreeNumbers: ${$6dfd1cd36348096d$export$fc03dfb7e6b0e31e(1, 2, 3, $9c7907f5c03efc9a$var$myAdd)}`);


//# sourceMappingURL=app-shakable.js.map
