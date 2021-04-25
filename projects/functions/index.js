/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */

function returnFirstArgument(arg) {
  return arg;
}

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6

 2.2 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */
function sumFn(a, b) {
  return a + b;
}
sumFn(20, 15);

function sumWithDefaults(a, b = 100) {
  return a + b;
}
sumWithDefaults(20);

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */
function returnFnResult(fn) {
  const resultFn = fn();
  return resultFn;
}

function showText() {
  return 'Привет!';
}

const result = returnFnResult(showText);
console.log(result);

// вариант с числом

// function sumFnResult(a, b, func) {
//   func(a, b);
//   console.log(func(a, b));
// }

// function sum(x, y) {
//   return x + y;
// }

// sumFnResult(2, 3, sum);
/*
 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */
function returnCounter(number = 0) {
  return function func() {
    return ++number;
  };
}

const f = returnCounter();
console.log(f());
console.log(f());
console.log(f());

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */
function returnArgumentsArray() {
  const argumentsArray = [];
  for (let i = 0; i < arguments.length; i++) {
    argumentsArray[i] = arguments[i];
  }
  /* alert(arguments.length); */
  return argumentsArray;
}

const resultArray = returnArgumentsArray(1, 2, 3, 4, 5);
console.log(resultArray);

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */
const valueArr = [3, 4, 6, 7];
function bindFunction(fn, ...args) {
  return function fn() {
    return sumFunc(...args);
  };
  // return fn.bind(null, ...args); - второй вариант
}
function sumFunc(a, b) {
  return a + b;
}

const newSum = bindFunction(sumFunc, ...valueArr);

console.log(newSum());

export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction,
};
