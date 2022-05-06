import { refs } from '../references/refs';
import {
  homeLinkClick,
  libTypeQueueBtnClick,
  libTypeWatchedBtnClick,
  myLibLinkClick,
  onFormSubmit,
} from './handlers';

refs.homePageLink.addEventListener('click', homeLinkClick);
refs.myLibPageLink.addEventListener('click', myLibLinkClick);
refs.headerLogoLink.addEventListener('click', homeLinkClick);
// refs.searchForm.addEventListener('submit', onFormSubmit);

function addFormListenerHome() {
  refs.searchForm[0].addEventListener('submit', onFormSubmit);
}

function removeFormListenerHome() {
  if (!refs.searchForm[0]) {
    return;
  }
  refs.searchForm[0].removeEventListener('submit', onFormSubmit);
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
};
