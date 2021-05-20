/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
  const element = document.createElement('div');
  element.textContent = text;

  document.body.appendChild(element);
  return element;
}
// const result = createDivWithText('loftschool');
// console.log(result);

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
  where.prepend(what);
}

// prepend(document.querySelector('#one'), document.querySelector('#two'));

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </body>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
  const resultArray = [];
  for (let i = 0; i < where.children.length; i++) {
    const child = where.children[i];
    const prevChild = child.previousElementSibling;
    if (child.nodeName === 'P') {
      resultArray.push(prevChild);
    }
  }
  return resultArray;
}
// const resultSiblingsArray = findAllPSiblings(document.body);
// console.log(resultSiblingsArray);

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </body>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
  const result = [];

  for (const child of where.children) {
    if (child.nodeName === 'DIV') {
      result.push(child.textContent);
    }
  }
  return result;
}
// const resultError = findError(document.body);
// console.log(resultError);

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
  const w = where.childNodes;
  for (let i = 0; i < w.length; i++) {
    const child = where.childNodes[i];
    console.log(child);
    if (
      child.nodeName === '#text' ||
      child.nodeName === 'DIV' ||
      child.nodeName === 'P'
    ) {
      child.nodeValue = '';
      child.textContent = '';
    }
  }
}

/*
 Задание 6:

 Выполнить предыдущее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
  const w = where.childNodes;
  for (let i = 0; i < w.length; i++) {
    const child = where.childNodes[i];
    // console.log(child);
    if (child.hasChildNodes() === false) {
      child.nodeValue = '';
      child.textContent = '';
    } else {
      deleteTextNodesRecursive(child);
    }
  }
}
// deleteTextNodesRecursive(document.body);

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
const resultStatObj = {
  tags: {},
  classes: {},
  texts: 0,
};

function collectDOMStat(root) {
  for (const child of root.childNodes) {
    const childsIsTrue = child.hasChildNodes();
    const childName = child.nodeName;
    const childType = child.nodeType;
    const childClasses = child.classList;

    if (childsIsTrue === true) {
      if (childType === 1 && childName !== 'SCRIPT') {
        resultStatObj.tags[childName] = (resultStatObj.tags[childName] || 0) + 1;

        for (const elem of childClasses) {
          resultStatObj.classes[elem] = (resultStatObj.classes[elem] || 0) + 1;
        }

        collectDOMStat(child);
      }
    } else {
      if (childType === 3 && child.nextSibling === null && childName === '#text') {
        resultStatObj.texts = resultStatObj.texts
          ? (resultStatObj.texts += 1)
          : (resultStatObj.texts = 1);
      }
    }
  }
  return resultStatObj;
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // проверим новые узлы, есть ли что-то

      if (mutation.target.nodeName === 'SCRIPT') continue;

      if (mutation.addedNodes) {
        for (const node of mutation.addedNodes) {
          // перебираем узлы из добавленных

          if (
            !(node instanceof HTMLElement) ||
            mutation.addedNodes[0].nodeName === 'SCRIPT'
          )
            continue; // отслеживаем только узлы-элементы, другие (текстовые) и script пропускаем
          console.log('addedNodes', node);
          fn({
            type: 'insert',
            nodes: [mutation.addedNodes[0]],
          });
        }
      }
      if (mutation.removedNodes) {
        for (const node of mutation.removedNodes) {
          // перебираем узлы из удаленных

          if (!(node instanceof HTMLElement)) continue; // отслеживаем только узлы-элементы, другие (текстовые) и script пропускаем
          console.log('removedNodes', node);
          fn({
            type: 'remove',
            nodes: [mutation.removedNodes[0]],
          });
        }
      }
    }
  });
  observer.observe(where, { childList: true, subtree: true });
}

export {
  createDivWithText,
  prepend,
  findAllPSiblings,
  findError,
  deleteTextNodes,
  deleteTextNodesRecursive,
  collectDOMStat,
  observeChildNodes,
};
