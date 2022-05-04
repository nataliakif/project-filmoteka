import { readState, writeState } from './state';
import { PAGE_TYPE } from './state';
import { updateInterface } from './update';

//Обработчик на ссылку Home
function homeLinkClick(e) {
  //e.currentTarger.ClassList.add() - делаем ее активной через css
  writeState({
    pageType: PAGE_TYPE.TRENDS,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

//Обработчик на ссылку MyLibrary
function myLibLinkClick(e) {
  //e.currentTarger.ClassList.add() - делаем ее активной через css
  writeState({
    pageType: PAGE_TYPE.LIB_WATCHED,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

//обработчик submit на форме поиска
function onFormSubmit(e) {
  //e.currentTarger.ClassList.add() - делаем ее активной через css
  writeState({
    pageType: PAGE_TYPE.SEARCH,
    currentPage: 1,
    search: e.currentTarget.elements.input.value, //записываем в search пользовательский текст
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

//обработчик на кнопку WATCHED и QUEUE - он будет один
function libTypeBtnClick(e) {
  e.currentTarget;
  const libPageType = PAGE_TYPE.LIB_WATCHED; //если клик по WATCHED
  libPageType = PAGE_TYPE.LIB_QUEUE; // если клик по QUEUE
  writeState({
    pageType: libPageType,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

//обработчик клика на пагинатор
function onPaginatorClick(e) {
  const value = e.currentTarget.value; //пагинатор при клике на него должен вернуть номер страницы на которую кликнули
  const state = readState();
  state.currentPage = value;
  writeState(state);
  updateInterface();
}

//обработчик клика по галерее
function onGalleryClick(e) {
  const filmId = null;
  //при клике по карточке фильма в галерее, проверяем e.currentTarget.nodename, если это img или h2, то получаем из дата атрибута родительского элемента id фильма
  //считываем текущий state из sessionStorage
  const state = readState();
  state.modalFilmId = filmId;
  state.isModalOpen = true;
  writeState(state);
  updateInterface();
}
