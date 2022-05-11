import { refs } from '../references/refs';
import {
  homeLinkClick,
  libTypeQueueBtnClick,
  libTypeWatchedBtnClick,
  myLibLinkClick,
  onFormSubmit,
  onGalleryClick,
  onCloseModalWindow,
  onOpenTeamModal,
} from './handlers';
import { onDropBtnClick } from '../render/renderGenres';

refs.homePageLink.addEventListener('click', homeLinkClick);
refs.myLibPageLink.addEventListener('click', myLibLinkClick);
refs.headerLogoLink.addEventListener('click', homeLinkClick);
refs.gallery.addEventListener('click', onGalleryClick);
refs.closeModalBtn.addEventListener('click', onCloseModalWindow);
refs.footerModalLink.addEventListener('click', onOpenTeamModal);
function addFormListenerHome() {
  refs.searchForm[0].addEventListener('submit', onFormSubmit);
  refs.genresDropdownBtn[0].addEventListener('click', onDropBtnClick);
}

function addFormListenersSearch() {
  refs.searchForm[0].addEventListener('submit', onFormSubmit);
}

function removeFormListenerHome() {
  if (!refs.searchForm[0]) {
    return;
  }
  refs.searchForm[0].removeEventListener('submit', onFormSubmit);
  if (!refs.genresDropdownBtn[0]) {
    return;
  }
  refs.genresDropdownBtn[0].removeEventListener('click', onDropBtnClick);
}

function addBtnHeaderListener() {
  refs.watchedBtn[0].addEventListener('click', libTypeWatchedBtnClick);
  refs.queueBtn[0].addEventListener('click', libTypeQueueBtnClick);
}

function removeBtnHeaderListener() {
  if (!refs.watchedBtn[0] || !refs.queueBtn[0]) {
    return;
  }
  refs.watchedBtn[0].removeEventListener('click', libTypeWatchedBtnClick);
  refs.queueBtn[0].removeEventListener('click', libTypeQueueBtnClick);
}
export {
  addFormListenerHome,
  removeFormListenerHome,
  addBtnHeaderListener,
  removeBtnHeaderListener,
  addFormListenersSearch,
};
