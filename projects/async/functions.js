/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  seconds = 3000;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, seconds);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
// function loadAndSortTowns() {
//   return new Promise((resolve) => {
//     const towns = new XMLHttpRequest();
//     let resultArray = {
//       response: []
//     };
//     console.log(towns);
//     towns.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
//     towns.responseType = 'json';
//     towns.addEventListener('load', () => {
//       // setTimeout(() => {
//       towns.response.sort(function (a, b) {
//         if (a.name > b.name) {
//           return 1;
//         }
//         if (a.name < b.name) {
//           return -1;
//         }
//         return 0;
//       });
//       resolve();
//       return resultArray;
//       // }, 1000);
//     });
//     towns.send();
//   });
// }

function loadAndSortTowns() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
    );
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {
      if (xhr.status < 400 && xhr.status !== 0) {
        // setTimeout(() => {
        const sortTowns = xhr.response;
        sortTowns.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        // }, 1000);
        resolve(sortTowns);
      } else {
        reject();
      }
    });
    // xhr.addEventListener('error', () => {
    //   let err = xhr.status;
    //   if (err > 400) {
    //     return new Error('error');
    //   }
    //   reject(err)
    //   console.log(reject(err));
    // });
  });
}

export { delayPromise, loadAndSortTowns };
