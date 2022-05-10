export { readState, writeState, PAGE_TYPE };

const SS_KEY = 'state';
const LIB_ELEMENTS_PER_PAGE = 6;
const HOME_ELEMENTS_PER_PAGE = 20;
const PAGE_TYPE = {
  TRENDS: 'TRENDS_PAGE',
  SEARCH: 'SEARCH_PAGE',
  LIB_WATCHED: 'LIBRARY_PAGE_WATCHED',
  LIB_QUEUE: 'LIBRARY_PAGE_QUEUE',
};
//базовый state
const state = {
  pageType: PAGE_TYPE.TRENDS,
  currentPage: 1,
  search: '',
  isModalOpen: false,
  modalFilmId: null,
};

//функция, которая считывает state из session storage
//должна возвращать объект с данными, но если ничего нет то возвращает базовый state

function readState() {
  let savedState = null;
  try {
    savedState = sessionStorage.getItem(SS_KEY);
  } catch (error) {}
  return savedState === null ? state : JSON.parse(savedState);
}

//функция, которая перезаписывает переданный state в session storage
//ничего не возвращает

function writeState(state) {
  sessionStorage.setItem(SS_KEY, JSON.stringify(state));
}

export { LIB_ELEMENTS_PER_PAGE, HOME_ELEMENTS_PER_PAGE };
