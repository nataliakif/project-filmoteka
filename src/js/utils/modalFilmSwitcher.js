import {
  HOME_ELEMENTS_PER_PAGE,
  LIB_ELEMENTS_PER_PAGE,
  PAGE_TYPE,
  readState,
  writeState,
} from '../base/state';
import { updateInterface } from '../base/update';
import { refs } from '../references/refs';
import { pagination } from '../render/renderPagination';
import { getPopularFilms, getBySearchQuery } from '../api/api-service';
import { scrollToTop } from '../base/scrollToTop';
import { LS_KEY_TYPE, readLocalStorage } from '../utils/localStorage';
import { divideOnPages } from '../utils/divideOnPages';
import { activeGenreId } from '../render/renderGenres';

async function switchToNextFilmInGallery() {
  let needToUpdateGallery = false;
  const state = readState();
  const arrayFilmIdsShown = [...refs.gallery.children].map(item => item.dataset.id);
  const currentFilmIndex = arrayFilmIdsShown.indexOf(String(state.modalFilmId));
  if (currentFilmIndex + 1 === refs.gallery.children.length) {
    const isNextPage = pagination._currentPage < pagination._options.totalItems;
    if (isNextPage) {
      state.currentPage = pagination._currentPage + 1;
      needToUpdateGallery = true;
      scrollToTop();
      let newModalId = null;
      switch (state.pageType) {
        case PAGE_TYPE.TRENDS:
          if (activeGenreId) {
            state.modalFilmId = (
              await getFilmByGenreId(activeGenreId, state.currentPage)
            ).data.results[0].id;
          } else {
            state.modalFilmId = (await getPopularFilms(state.currentPage)).data.results[0].id;
          }
          break;
        case PAGE_TYPE.SEARCH:
          state.modalFilmId = (
            await getBySearchQuery(state.search, state.currentPage)
          ).data.results[0].id;
          break;
        case PAGE_TYPE.LIB_WATCHED:
          newModalId = (state.modalFilmId = divideOnPages(
            readLocalStorage(LS_KEY_TYPE.WATCHED),
            LIB_ELEMENTS_PER_PAGE,
          )[state.currentPage - 1])[0];
          state.modalFilmId = newModalId ? newModalId : state.modalFilmId;
          break;
        case PAGE_TYPE.LIB_QUEUE:
          newModalId = (state.modalFilmId = divideOnPages(
            readLocalStorage(LS_KEY_TYPE.QUEUE),
            LIB_ELEMENTS_PER_PAGE,
          )[state.currentPage - 1])[0];
          state.modalFilmId = newModalId ? newModalId : state.modalFilmId;
          break;
      }
    }
  } else {
    state.modalFilmId = arrayFilmIdsShown[currentFilmIndex + 1];
  }
  writeState(state);
  updateInterface(true, needToUpdateGallery);
}

async function switchToPrevFilmInGallery() {
  let needToUpdateGallery = false;
  const state = readState();
  const arrayFilmIdsShown = [...refs.gallery.children].map(item => item.dataset.id);
  const currentFilmIndex = arrayFilmIdsShown.indexOf(String(state.modalFilmId));
  if (currentFilmIndex === 0) {
    const isPrevPage = pagination._currentPage > 1;
    if (isPrevPage) {
      state.currentPage = pagination._currentPage - 1;
      needToUpdateGallery = true;
      scrollToTop();
      switch (state.pageType) {
        case PAGE_TYPE.TRENDS:
          state.modalFilmId = (await getPopularFilms(state.currentPage)).data.results[
            HOME_ELEMENTS_PER_PAGE - 1
          ].id;
          break;
        case PAGE_TYPE.SEARCH:
          state.modalFilmId = (
            await getBySearchQuery(state.search, state.currentPage)
          ).data.results[HOME_ELEMENTS_PER_PAGE - 1].id;
          break;
        case PAGE_TYPE.LIB_WATCHED:
          state.modalFilmId = (state.modalFilmId = divideOnPages(
            readLocalStorage(LS_KEY_TYPE.WATCHED),
            LIB_ELEMENTS_PER_PAGE,
          )[state.currentPage - 1])[LIB_ELEMENTS_PER_PAGE - 1];
          break;
        case PAGE_TYPE.LIB_QUEUE:
          state.modalFilmId = (state.modalFilmId = divideOnPages(
            readLocalStorage(LS_KEY_TYPE.QUEUE),
            LIB_ELEMENTS_PER_PAGE,
          )[state.currentPage - 1])[LIB_ELEMENTS_PER_PAGE - 1];
          break;
      }
    }
  } else {
    if (currentFilmIndex === -1) {
      state.modalFilmId = arrayFilmIdsShown[arrayFilmIdsShown.length - 1];
    } else {
      state.modalFilmId = arrayFilmIdsShown[currentFilmIndex - 1];
    }
  }
  writeState(state);
  updateInterface(true, needToUpdateGallery);
}

function checkSwitchToPrevFilmAvailable() {
  let canSwitchToPrevDisabled = false;
  const state = readState();
  const arrayFilmIdsShown = [...refs.gallery.children].map(item => item.dataset.id);
  const currentFilmIndex = arrayFilmIdsShown.indexOf(String(state.modalFilmId));
  if (currentFilmIndex === 0) {
    const isPrevPage = pagination._currentPage > 1;
    if (!isPrevPage) {
      canSwitchToPrevDisabled = true;
    }
  }
  return canSwitchToPrevDisabled;
}

function setModalSwitchBtnAvailability() {
  const disablePrev = checkSwitchToPrevFilmAvailable();
  const disableNext = checkSwitchToNextFilmAvailable();
  refs.modalBtnPrev[0].disabled = disablePrev;
  refs.modalBtnNext[0].disabled = disableNext;
  if (disablePrev) {
    refs.modalBtnPrev[0].style.display = 'none';
  }
  if (disableNext) {
    refs.modalBtnNext[0].style.display = 'none';
  }
}

function checkSwitchToNextFilmAvailable() {
  let canSwitchToNextDisabled = false;
  const state = readState();
  const arrayFilmIdsShown = [...refs.gallery.children].map(item => item.dataset.id);
  const currentFilmIndex = arrayFilmIdsShown.indexOf(String(state.modalFilmId));
  if (currentFilmIndex === refs.gallery.children.length - 1) {
    const isNextPage = pagination._currentPage < pagination._options.totalItems;
    if (!isNextPage) {
      canSwitchToNextDisabled = true;
    }
  }
  return canSwitchToNextDisabled;
}

export {
  switchToNextFilmInGallery,
  switchToPrevFilmInGallery,
  checkSwitchToPrevFilmAvailable,
  checkSwitchToNextFilmAvailable,
  setModalSwitchBtnAvailability,
};
