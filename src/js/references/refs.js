const refs = {
  headerContainer: document.querySelector('header'),
  searchForm: document.getElementsByClassName('js-header-form'),
  gallery: document.querySelector('.gallery'),
  homePageLink: document.querySelector('.js-header-nav__home'),
  myLibPageLink: document.querySelector('.js-header-nav__myLib'),
  headerLogoLink: document.querySelector('.header-logo__link'),
  watchedBtn: document.getElementsByName('watched-btn'),
  queueBtn: document.getElementsByName('queue-btn'),
  modal: document.querySelector('[data-modal]'),
  modalContent: document.querySelector('#modal-content'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  footerModalLink: document.querySelector('#footer-modal-link'),
  scrollLock: document.querySelector('[data-modal-scroll-lock]'),
  scrolltop: document.querySelector('.scrolltop'),
  rootElement: document.documentElement,
};

export { refs };
