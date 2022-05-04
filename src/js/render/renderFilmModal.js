import { checkIdInLocalStorage, LS_KEY_TYPE } from '../utils/localStorage';

function renderFilmModal(data) {
  //функция, которая принимает filminfo с сервера и рендерит ее в контейнер модалки
  //в data будет id фильма. нужно во время создания разметки проверить id на наличие записей в localStorage
  checkIdInLocalStorage(data.id, LS_KEY_TYPE.QUEUE); //если true - то на кнопку QUEUE вешаем класс active и текст кнопки "Remove from QUEUE" если false то текст кнопки "Add to QUEUE"
  checkIdInLocalStorage(data.id, LS_KEY_TYPE.WATCHED); //
}

export { renderFilmModal };
