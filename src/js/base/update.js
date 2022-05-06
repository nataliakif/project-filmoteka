import { readState } from './state';
import { PAGE_TYPE } from './state';
import { renderGallery } from '../render/renderGallery';
import { MARKUP_HEADER_TYPE, renderHeader } from '../render/renderHeader';
import { renderNotification } from '../render/renderNotification';
import { renderPagination } from '../render/renderPagination';
import { renderFilmModal } from '../render/renderFilmModal';
import { LS_KEY_TYPE, readLocalStorage } from '../utils/localStorage';
import { divideOnPages } from '../utils/devideOnPages';
import { renderTeamModal } from '../render/renderTeamModal';
import { setGenres } from './setGenres';
import { getPopularFilms, getGenres, getBySearchQuery } from '../api/api-service';
import { homeMarkup, myLibMarkup } from '../templates/markupHeader';
import {
  addBtnHeaderListener,
  addFormListenerHome,
  removeBtnHeaderListener,
  removeFormListenerHome,
} from '../base/listeners';
import { refs } from '../references/refs';

//самая главная функция, которая будет обновлять весь интерфейс
function updateInterface() {
  //считываем из sessionStorage state
  removeBtnHeaderListener();
  removeFormListenerHome();
  const state = readState();
  const data = [];
  const moviesIdArr = [];
  const moviesIdArrPaged = [];

  switch (state.pageType) {
    case PAGE_TYPE.TRENDS:
      getPopularFilms(state.currentPage)
        .then(data => {
          return getGenres().then(genres => setGenres(data.data, genres));
        })
        .then(data => {
          renderGallery(data.results);
          renderPagination(data.total_pages, state.currentPage);
        });
      renderHeader(MARKUP_HEADER_TYPE.FORM);
      addFormListenerHome();

      return;

    case PAGE_TYPE.SEARCH:
      getBySearchQuery(state.search, state.currentPage)
        .then(data => {
          return getGenres().then(genres => setGenres(data.data, genres));
        })
        .then(data => {
          renderGallery(data.results);
          renderPagination(data.total_pages, state.currentPage);
        });
      renderHeader(MARKUP_HEADER_TYPE.FORM);
      refs.searchForm[0].elements[0].value = state.search;
      addFormListenerHome();
      // createFormListner();
      return;

    case PAGE_TYPE.LIB_WATCHED:
      renderHeader(MARKUP_HEADER_TYPE.BUTTONS);
      addBtnHeaderListener();
      // moviesIdArr = readLocalStorage(LS_KEY_TYPE.WATCHED); //считываем из localstorage массив фильмов с WATCHED
      // moviesIdArrPaged = divideOnPages(moviesIdArr, 8);
      // data = []; //вызываем api функцию которая получает movies в параметры передаем moviesIdArrPaged[state.currentPage-1]
      // renderGallery(data);
      // renderPagination(moviesIdArrPaged.length, state.currentPage);

      //на ссылку MyLib вешаем класс active - это нужно только для того случая, если пользователь перезагрузит страницу
      return;

    case PAGE_TYPE.LIB_QUEUE:
      renderHeader(MARKUP_HEADER_TYPE.BUTTONS);
      addBtnHeaderListener();
      // moviesIdArr = readLocalStorage(LS_KEY_TYPE.QUEUE); //считываем из localstorage массив фильмов с WATCHED
      // moviesIdArrPaged = divideOnPages(moviesIdArr, 8);
      // data = []; //вызываем api функцию которая получает movies в параметры передаем moviesIdArrPaged[state.currentPage-1]
      // renderGallery(data);
      // renderPagination(moviesIdArrPaged.length, state.currentPage);
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
