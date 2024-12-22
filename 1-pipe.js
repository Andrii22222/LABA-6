'use strict';
/*
1. Напишите функцию `pipe`, композирующую передаваемые в нее аргументы слева
направо. `const pipe = (...fns) => x => ...` А если хоть один из аргументов
окажется не функционального типа, то `pipe` должен выбросить ошибку.
Например, если у нас есть три функции:
```js
const inc = x => ++x;
const twice = x => x * 2;
const cube = x => x ** 3;
```
И нам нужно скомпозировать их так `const f = pipe(inc, twice, cube);`
то при вызове `const x = f(5);` нужно ожидать, что `x` примет значение `1728`.
А если мы скомпозируем `const f = pipe(inc, inc);` то при вызове
`const x = f(7);` значение `x` будет `9`. Но если мы передадим не функцию в
`pipe`, например: `const f = pipe(inc, 7, cube);` то, не дожидаясь вызова `f`,
сразу получим ошибку.
*/

/*
const pipe = (...fns) => {
  let piped = x => x;
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      throw new Error(`Argument ${fn} is not functions`);
    }
    const p = piped;
    piped = x => fn(p(x));
  }
  return piped;
};
*/

const pipe = (...fns) => {
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      throw new Error(`Argument ${fn} is not functions`);
    }
  }
  return (x) => fns.reduce((v, fn) => fn(v), x);
};

/*
const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

let comp = pipe(inc, twice, cube);
console.log(comp(5));  //1728
comp = pipe(inc, inc);
console.log(comp(7));  //9
comp = pipe(inc, 7, cube);
console.log(comp(7));  //Error
*/
module.exports = { pipe };
