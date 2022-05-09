import { refs } from '../references/refs';
import { readState, writeState } from './state';
import { PAGE_TYPE } from './state';
import { updateInterface } from './update';
import { handleScroll } from './scrollToTop';
import {
  addIdToLocalStorage,
  LS_KEY_TYPE,
  removeIdFromLocalStorage,
  checkIdInLocalStorage,
} from '../utils/localStorage';
import { checkStorageStatusOfFilm } from '../render/renderFilmModal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { getBySearchQuery } from '../api/api-service';

const notyf = new Notyf();

function homeLinkClick(e) {
  e.preventDefault();
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
  e.preventDefault();

  writeState({
    pageType: PAGE_TYPE.LIB_WATCHED,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

//Проверка стейта для добавления и удаления классов при перезагрузке
function checkReloadSite() {
  switch (readState().pageType) {
    case PAGE_TYPE.TRENDS:
      refs.headerContainer.classList.remove('header_libr');
      refs.homePageLink.classList.add('header-nav__isActive');
      refs.myLibPageLink.classList.remove('header-nav__isActive');
      break;

    case PAGE_TYPE.SEARCH:
      refs.headerContainer.classList.remove('header_libr');
      refs.homePageLink.classList.add('header-nav__isActive');
      refs.myLibPageLink.classList.remove('header-nav__isActive');
      break;

    case PAGE_TYPE.LIB_WATCHED:
      refs.headerContainer.classList.add('header_libr');
      refs.homePageLink.classList.remove('header-nav__isActive');
      refs.myLibPageLink.classList.add('header-nav__isActive');
      break;

    case PAGE_TYPE.LIB_QUEUE:
      refs.headerContainer.classList.add('header_libr');
      refs.homePageLink.classList.remove('header-nav__isActive');
      refs.myLibPageLink.classList.add('header-nav__isActive');
      break;
  }
}

/// Сделать функуцию на отрисовку и удаление btn фильтра в header

// function addChooseGenre(){
//   switch(readState().pageType){
//     case PAGE_TYPE.TRENDS:

//     break;
//     case PAGE_TYPE.SEARCH:

//     break;
//     case PAGE_TYPE.LIB_WATCHED:

//     break;
//     case PAGE_TYPE.LIB_QUEUE:

//     break;
//   }
// }

//обработчик submit на форме поиска
function onFormSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.input.value.trim();
  if (query === '') {
    notyf.error('Search result not successful. Enter the correct movie name and ');
    return;
  }

  //e.currentTarger.ClassList.add() - делаем ее активной через css
  writeState({
    pageType: PAGE_TYPE.SEARCH,
    currentPage: 1,
    search: e.currentTarget.elements.input.value.trim(), //записываем в search пользовательский текст
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}

//обработчик на кнопку WATCHED и QUEUE - он будет один
function libTypeWatchedBtnClick(e) {
  //С кнопки queue снимаем "current",а на текущую вешаем
  writeState({
    pageType: PAGE_TYPE.LIB_WATCHED,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}
function libTypeQueueBtnClick(e) {
  //С кнопки WATCHED снимаем "current",а на текущую вешаем
  writeState({
    pageType: PAGE_TYPE.LIB_QUEUE,
    currentPage: 1,
    search: '',
    isModalOpen: false,
    modalFilmId: null,
  });
  updateInterface();
}
//обработчик клика на пагинатор
function onPaginatorClick(page) {
  const state = readState();
  state.currentPage = page;
  writeState(state);
  updateInterface();
}

//обработчик клика по галерее
function onGalleryClick(e) {
  let nodeWithId = null;
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'H2' || e.target.nodeName === 'P') {
    nodeWithId = e.target.parentNode;
  }
  if (e.target.nodeName === 'LI') {
    nodeWithId = e.target;
  }
  if (!nodeWithId) {
    return;
  }
  const state = readState();
  state.modalFilmId = nodeWithId.dataset.id;
  state.isModalOpen = true;
  writeState(state);
  updateInterface();
}
//обработчик на клик по сслыке в footer
function onOpenTeamModal(e) {
  e.preventDefault();
  const state = readState();
  state.modalFilmId = null;
  state.isModalOpen = true;
  writeState(state);
  updateInterface();
}
//обработчик на кнопку закрытия в модалке
function onCloseModalWindow() {
  const state = readState();
  state.modalFilmId = null;
  state.isModalOpen = false;
  writeState(state);
  updateInterface();
}
//обработчик на ESC на закрытие модалки
function onEscKeyCloseModal(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModalWindow();
  }
}

function onModalBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModalWindow();
  }
}
//собрал в 1 функцию все действия для того чтобы модалка открылась из функции updateInterface
function openModal() {
  refs.modal.classList.remove('is-hidden');
  refs.scrollLock.classList.add('modal-open');
  refs.scrolltop.classList.remove('showBtn');
  refs.backdrop.addEventListener('click', onModalBackdropClick);
  window.addEventListener('keydown', onEscKeyCloseModal);
}
//собрал в 1 функцию все действия для того чтобы модалка закрылась из функции updateInterface
function closeModal() {
  refs.modal.classList.add('is-hidden');
  refs.scrollLock.classList.remove('modal-open');
  handleScroll();
  refs.backdrop.removeEventListener('click', onModalBackdropClick);
  window.removeEventListener('keydown', onEscKeyCloseModal);
  refs.modalContent.innerHTML = '';
  if (!readState().modalFilmId) {
    return;
  }
  refs.modalBtnWatched[0].removeEventListener('click', onModalBtnWatchedClick);
}

//обработчик на клик по кнопке Watched в модалке
function onModalBtnWatchedClick() {
  const state = readState();
  const filmId = state.modalFilmId;
  let isInWatched = checkIdInLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
  if (isInWatched) {
    removeIdFromLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
  } else {
    addIdToLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
    if (checkIdInLocalStorage(filmId, LS_KEY_TYPE.QUEUE)) {
      removeIdFromLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
      refs.modalBtnQueueTextField[0].textContent = 'REMOVING FROM QUEUE';
    }
  }
  const watchedBtnText = isInWatched ? 'REMOVING FROM WATCHED' : 'ADDING TO WATCHED';
  refs.modalBtnWatchedTextField[0].textContent = watchedBtnText;
  setTimeout(() => {
    checkStorageStatusOfFilm();
    if (state.pageType === PAGE_TYPE.LIB_WATCHED || state.pageType === PAGE_TYPE.LIB_QUEUE)
      updateInterface(false);
  }, 500);
}

function onModalBtnQueueClick() {
  const state = readState();
  const filmId = state.modalFilmId;
  let isInQueue = checkIdInLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
  if (isInQueue) {
    removeIdFromLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
  } else {
    addIdToLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
    if (checkIdInLocalStorage(filmId, LS_KEY_TYPE.WATCHED)) {
      removeIdFromLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
      refs.modalBtnWatchedTextField[0].textContent = 'REMOVING FROM WATCHED';
    }
  }
  const queueBtnText = isInQueue ? 'REMOVING FROM QUEUE' : 'ADDING TO QUEUE';
  refs.modalBtnQueueTextField[0].textContent = queueBtnText;
  setTimeout(() => {
    checkStorageStatusOfFilm();
    if (state.pageType === PAGE_TYPE.LIB_WATCHED || state.pageType === PAGE_TYPE.LIB_QUEUE)
      updateInterface(false);
  }, 500);
}

export {
  onFormSubmit,
  homeLinkClick,
  myLibLinkClick,
  libTypeWatchedBtnClick,
  libTypeQueueBtnClick,
  onPaginatorClick,
  onGalleryClick,
  onCloseModalWindow,
  onOpenTeamModal,
  openModal,
  closeModal,
  onModalBtnWatchedClick,
  onModalBtnQueueClick,
  checkReloadSite,
};
