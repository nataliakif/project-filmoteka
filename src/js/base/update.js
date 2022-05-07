import { checkReloadSite } from './handlers';

import { readState } from './state';
import { PAGE_TYPE } from './state';
import { renderGallery } from '../render/renderGallery';
import { MARKUP_HEADER_TYPE, renderHeader } from '../render/renderHeader';
import { renderPagination } from '../render/renderPagination';
import { renderFilmModal } from '../render/renderFilmModal';
import { LS_KEY_TYPE, readLocalStorage } from '../utils/localStorage';
import { divideOnPages } from '../utils/devideOnPages';
import { renderTeamModal } from '../render/renderTeamModal';
import { setGenres } from './setGenres';
import {
  getPopularFilms,
  getGenres,
  getBySearchQuery,
  getFilmById,
  getFilmsByIdArray,
} from '../api/api-service';
import {
  addBtnHeaderListener,
  addFormListenerHome,
  removeBtnHeaderListener,
  removeFormListenerHome,
} from '../base/listeners';
import { refs } from '../references/refs';
import { openModal, closeModal } from './handlers';

let firstRender = true;

function updateInterface(needModalUpdate = true) {
  let pagedArrayOfIds = [];
  const state = readState();

  if (state.isModalOpen && needModalUpdate) {
    if (state.modalFilmId === null) {
      renderTeamModal();
    } else {
      getFilmById(state.modalFilmId).then(renderFilmModal);
    }
    openModal();
    if (
      !firstRender &&
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
  checkReloadSite();
  removeBtnHeaderListener();
  removeFormListenerHome();

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
      addFormListenerHome();
      break;

    case PAGE_TYPE.LIB_WATCHED:
      renderHeader(MARKUP_HEADER_TYPE.BUTTONS);
      addBtnHeaderListener();
      pagedArrayOfIds = divideOnPages(readLocalStorage(LS_KEY_TYPE.WATCHED), 6);
      getFilmsByIdArray(pagedArrayOfIds[state.currentPage - 1]).then(data => {
        renderGallery(data);
        renderPagination(pagedArrayOfIds.length, state.currentPage);
      });
      break;

    case PAGE_TYPE.LIB_QUEUE:
      renderHeader(MARKUP_HEADER_TYPE.BUTTONS);
      addBtnHeaderListener();
      pagedArrayOfIds = divideOnPages(readLocalStorage(LS_KEY_TYPE.QUEUE), 6);
      getFilmsByIdArray(pagedArrayOfIds[state.currentPage - 1]).then(data => {
        renderGallery(data);
        renderPagination(pagedArrayOfIds.length, state.currentPage);
      });
      break;
  }
  firstRender = false;
}

export { updateInterface };
