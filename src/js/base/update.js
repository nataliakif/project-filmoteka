import { readState } from './state';
import { PAGE_TYPE } from './state';
import { renderGallery } from '../render/renderGallery';
import { renderHeader } from '../render/renderHeader';
import { renderNotification } from '../render/renderNotification';
import { renderPagination } from '../render/renderPagination';
import { renderFilmModal } from '../render/renderFilmModal';
import { LS_KEY_TYPE, readLocalStorage } from '../utils/localStorage';
import { divideOnPages } from '../utils/devideOnPages';
import { renderTeamModal } from '../render/renderTeamModal';

//самая главная функция, которая будет обновлять весь интерфейс
function updateInterface() {
  //считываем из sessionStorage state
  const state = readState();
  const data = [];
  const moviesIdArr = [];
  const moviesIdArrPaged = [];

  switch (state.pageType) {
    case PAGE_TYPE.TRENDS:
      data = []; //вызывавем api функцию которая получает тренды, в параметры ей передаем номер страницы из state.currentPage
      renderGallery(data);
      renderPagination(data.pageAmount, state.currentPage);
      renderHeader('шаблонная строка с разметкой поисковой формы');
      return;

    case PAGE_TYPE.SEARCH:
      //в форму вводим текст из state.search
      data = []; //вызывавем api функцию которая получает movies по запросу пользователя, в параметры ей передаем строку поиска из state.search и номер страницы из state.currentPage
      renderGallery(data);
      renderPagination(data.pageAmount, state.currentPage);
      renderHeader('шаблонная строка с разметкой поисковой формы');
      //снять слушатель с кнопок WATCHED и QUEUE
      return;

    case PAGE_TYPE.LIB_WATCHED:
      moviesIdArr = readLocalStorage(LS_KEY_TYPE.WATCHED); //считываем из localstorage массив фильмов с WATCHED
      moviesIdArrPaged = divideOnPages(moviesIdArr, 8);
      data = []; //вызываем api функцию которая получает movies в параметры передаем moviesIdArrPaged[state.currentPage-1]
      renderGallery(data);
      renderPagination(moviesIdArrPaged.length, state.currentPage);
      renderHeader('шаблонная строка с разметкой двух кнопок, WATCHED - активная');
      //cнять слушатель с формы поиска
      //на ссылку MyLib вешаем класс active - это нужно только для того случая, если пользователь перезагрузит страницу
      return;

    case PAGE_TYPE.LIB_QUEUE:
      moviesIdArr = readLocalStorage(LS_KEY_TYPE.QUEUE); //считываем из localstorage массив фильмов с WATCHED
      moviesIdArrPaged = divideOnPages(moviesIdArr, 8);
      data = []; //вызываем api функцию которая получает movies в параметры передаем moviesIdArrPaged[state.currentPage-1]
      renderGallery(data);
      renderPagination(moviesIdArrPaged.length, state.currentPage);
      //cнять слушатель с формы поиска
      //на ссылку MyLib вешаем класс active - это нужно только для того случая, если пользователь перезагрузит страницу
      return;
  }

  if (state.isModalOpen) {
    //у div с модалкой убираем class visually-hidden
    if (state.modalFilmId === null) {
      renderTeamModal(); //так как в state нет записанного filmID то рендерим в модалку команду
    }
    const filmDetailsData = null; //делаем запрос по modalFilmId
    renderFilmModal(filmDetailsData); //рендерим в модалку информацию о фильме
  }
}

export { updateInterface };
