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

function readState() {
  //функция, которая считывает state из session storage

  //должна возвращать объект с данными, но если ничего нет то возвращает базовый state
  return state;
}

function writeState(state) {
  //функция, которая перезаписывает переданный state в session storage
  //ничего не возвращает
}

export { readState, writeState, PAGE_TYPE };
