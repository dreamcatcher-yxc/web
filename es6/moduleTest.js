var mod = require('./module/common');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
