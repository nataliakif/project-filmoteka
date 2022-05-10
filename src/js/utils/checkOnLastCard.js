import { LIB_ELEMENTS_PER_PAGE, readState, writeState } from '../base/state';
import { refs } from '../references/refs';
import { divideOnPages } from './divideOnPages';
import { readLocalStorage } from '../utils/localStorage';

function checkOnLastCardInGallery() {
  if (refs.gallery.children.length !== 1) {
    return;
  }
  const state = readState();
  if (state.currentPage > 1) {
    state.currentPage -= 1;
    writeState(state);
  }
}

function checkOnFullGallery(localStorageType) {
  if (refs.gallery.children.length !== 6) {
    return;
  }
  const state = readState();
  const pagedArrayOfIds = divideOnPages(readLocalStorage(localStorageType), LIB_ELEMENTS_PER_PAGE);
  if (pagedArrayOfIds.length > state.currentPage) {
    state.currentPage += 1;
    writeState(state);
  }
}

export { checkOnLastCardInGallery, checkOnFullGallery };
