console.log(Symbol());

const sym1 = Symbol(); // Symbol()
const sym2 = Symbol();

console.log(sym1 === sym2); // false

const sym3 = Symbol('cat');
const sym4 = Symbol('cat');

console.log(sym3); // Symbol(cat)
console.log(sym3 === sym4) // false