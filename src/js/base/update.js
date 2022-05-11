import { checkReloadSite } from './handlers';
import { readState } from './state';
import { PAGE_TYPE } from './state';
import { renderGallery } from '../render/renderGallery';
import { MARKUP_HEADER_TYPE, renderHeader } from '../render/renderHeader';
import { renderPagination } from '../render/renderPagination';
import { addModalBtnListeners, renderFilmModal } from '../render/renderFilmModal';
import { LS_KEY_TYPE, readLocalStorage } from '../utils/localStorage';
import { divideOnPages } from '../utils/divideOnPages';
import { renderTeamModal } from '../render/renderTeamModal';
import { setGenres } from './setGenres';
import { activeGenreId } from '../render/renderGenres';
import {
  getPopularFilms,
  getGenres,
  getBySearchQuery,
  getFilmById,
  getFilmsByIdArray,
  getFilmByGenreId,
} from '../api/api-service';
import {
  addBtnHeaderListener,
  addFormListenerHome,
  removeBtnHeaderListener,
  removeFormListenerHome,
  addFormListenersSearch,
} from '../base/listeners';
import { refs } from '../references/refs';
import { openModal, closeModal } from './handlers';
import { scrollToTop } from './scrollToTop';
import { LIB_ELEMENTS_PER_PAGE } from './state';

let firstRender = true;

function updateInterface(needModalUpdate = true, needGalleryUpdate = true) {
  let pagedArrayOfIds = [];
  const state = readState();

  if (state.isModalOpen && needModalUpdate && !firstRender) {
    if (state.modalFilmId === null) {
      renderTeamModal();
    } else {
      getFilmById(state.modalFilmId).then(renderFilmModal).then(addModalBtnListeners);
    }
    openModal();
    if (
      !firstRender &&
      !needGalleryUpdate &&
      (state.pageType === PAGE_TYPE.TRENDS || state.pageType === PAGE_TYPE.SEARCH)
    ) {
      return;
    }
  } else {
    if (!refs.modal.classList.contains('is-hidden') && needModalUpdate) {
      closeModal();
      return;
    }
  }

  if (!needGalleryUpdate) {
    firstRender = false;
    return;
  }

  checkReloadSite();
  removeBtnHeaderListener();
  removeFormListenerHome();

  switch (state.pageType) {
    case PAGE_TYPE.TRENDS:
      if (activeGenreId) {
        getFilmByGenreId(activeGenreId, state.currentPage)
          .then(data => {
            return getGenres().then(genres => setGenres(data.data, genres));
          })
          .then(data => {
            renderGallery(data.results);
            renderPagination(data.total_pages, state.currentPage);
          });
      } else {
        getPopularFilms(state.currentPage)
          .then(data => {
            return getGenres().then(genres => setGenres(data.data, genres));
          })
          .then(data => {
            renderGallery(data.results);
            renderPagination(data.total_pages, state.currentPage);
          });
      }
      renderHeader(MARKUP_HEADER_TYPE.FORM);
      addFormListenerHome();
      break;

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
      addFormListenersSearch();
      break;

    case PAGE_TYPE.LIB_WATCHED:
      renderHeader(MARKUP_HEADER_TYPE.BUTTONS);
      addBtnHeaderListener();
      pagedArrayOfIds = divideOnPages(readLocalStorage(LS_KEY_TYPE.WATCHED), LIB_ELEMENTS_PER_PAGE);
      if (pagedArrayOfIds.length > 0 && pagedArrayOfIds[state.currentPage - 1]) {
        getFilmsByIdArray(pagedArrayOfIds[state.currentPage - 1]).then(data => {
          renderGallery(data);
          renderPagination(pagedArrayOfIds.length, state.currentPage);
        });
      } else {
        renderGallery(null);
        renderPagination(0);
      }
      break;

    case PAGE_TYPE.LIB_QUEUE:
      renderHeader(MARKUP_HEADER_TYPE.BUTTONS);
      addBtnHeaderListener();
      pagedArrayOfIds = divideOnPages(readLocalStorage(LS_KEY_TYPE.QUEUE), LIB_ELEMENTS_PER_PAGE);
      if (pagedArrayOfIds.length > 0 && pagedArrayOfIds[state.currentPage - 1]) {
        getFilmsByIdArray(pagedArrayOfIds[state.currentPage - 1]).then(data => {
          renderGallery(data);
          renderPagination(pagedArrayOfIds.length, state.currentPage);
        });
      } else {
        renderGallery(null);
        renderPagination(0);
      }
      break;
  }
  if (!state.isModalOpen) {
    scrollToTop();
  }
  firstRender = false;
}

export { updateInterface };
