const LS_KEY_TYPE = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};

// в localStorage храним массив id фильмов WATCHED и массив фильмов QEUE

function readLocalStorage(keyType) {
  //считывает массив фильмов в зависимости от typeKey (либо WATCHED либо QUEUE)
}

function addIdToLocalStorage(id, keyType) {
  //считывает массив фильмов в зависимости от typeKey (либо WATCHED либо QUEUE), добавляет в массив новый элемент и перезаписывает массив в LocalStorage
}

function checkIdInLocalStorage(id, keyType) {
  //функция для кнопок в модалке, для проверки добавлен ли этот id в localStorage
  //возвращает true/false
}

function removeIdFromLocalStorage(id, keyType) {
  //считывает массив фильмов в зависимости от typeKey (либо WATCHED либо QUEUE), удаляет из массива элемент с указанным id и перезаписывает массив в LocalStorage
}

export {
  LS_KEY_TYPE,
  readLocalStorage,
  addIdToLocalStorage,
  removeIdFromLocalStorage,
  checkIdInLocalStorage,
};
