/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
homeworkContainer.style.height = '100vh';
homeworkContainer.style.width = '100wh';

document.addEventListener('mousedown', function (event) {
  console.log(event.target.classList.value);
  // используем дилегирование, обращаемся к body, далее через event.target к объекту
  if (event.target.classList.value !== 'draggable-div') return;

  event.target.ondragstart = function () {
    // отключаем Drag’n’Drop браузера
    return false;
  };
  // clientX/clientY Числовое значение координаты
  // getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport
  const shiftX = event.clientX - event.target.getBoundingClientRect().left; // координата клика по Х внутри блока, относительно самого блока newDiv
  const shiftY = event.clientY - event.target.getBoundingClientRect().top; // координата клика по У внутри блока, относительно самого блока newDiv

  function onMouseMove(event) {
    // Функция переносит квадрат newDiv на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши внутри блока
    event.target.style.left = event.pageX - shiftX + 'px';
    event.target.style.top = event.pageY - shiftY + 'px'; // pageХ/pageY Числовое значение координаты относительно документа
  }

  // передвигаем блок при событии mousemove
  document.addEventListener('mousemove', onMouseMove);

  // отпустить блок, удалить ненужные обработчики
  document.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };
});

function randomColor(elem) {
  // const codeColor = document.querySelector('#app');
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  elem.style.background = color;
}

export function createDiv(elem) {
  const divSize = (Math.random() * 100 + 50).toFixed();
  elem.style.width = `${divSize}` + 'px';
  elem.style.height = `${divSize}` + 'px';
  // сгенерируем случайную позицию для блока, относительно размеров экрана
  const docWidth = document.body.clientWidth;
  const docHeight = document.body.clientHeight; // document.body.clientWidth возвращает ширину HTML документа
  const positionX = (Math.random() * (docWidth - divSize)).toFixed();
  const positionY = (Math.random() * (docHeight - divSize) + 34).toFixed(); // добавим 34px по вертикали, чтобы созданные блоки не перекрывали кнопку

  elem.style.left = `${positionX}` + 'px';
  elem.style.top = `${positionY}` + 'px';

  randomColor(elem);

  return elem;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');
  const div = createDiv(newDiv);
  homeworkContainer.appendChild(div);
});
