'use strict';
/*
2. Реализуйте композицию функций справа налево (без использования рекурсии),
которая будет подавлять ошибки, если композируемые функции будут их бросать,
то, исполнение функции завершается с `undefined`, а на ошибки можно будет
подписаться через `f.on('error', e => { ... });`.
*/
const compose = (...fns) => {
  const handlers = [];
  const composed = (x) => {
    let value = x;
    try {
      for (let i = fns.length - 1; i >= 0; i--) {
        value = fns[i](value);
      }
    } catch (err) {
      for (const handler of handlers) {
        handler(err);
      }
      return null;
    }
    return value;
  };
  composed.on = (name, handler) => {
    if (name === 'error') handlers.push(handler);
  };
  return composed;
};
/*
const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

let comp = compose(inc, twice, cube);
console.log(comp(5));  //251
comp = compose(inc, inc);
console.log(comp(7));  //9
comp = compose(inc, 7, cube);
console.log(comp(7));  //null
*/
module.exports = { compose };
