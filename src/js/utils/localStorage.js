const LS_KEY_TYPE = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};

function readLocalStorage(keyType) {
  let arrayId = [];
  let result;
  try {
    result = JSON.parse(window.localStorage.getItem(keyType));
  } catch (e) {}
  if (result) {
    arrayId = result;
  }
  return arrayId;
}

function addIdToLocalStorage(id, keyType) {
  let arrayId = [];
  let result;
  try {
    result = JSON.parse(window.localStorage.getItem(keyType));
  } catch (e) {}
  if (result) {
    arrayId = result;
  }
  arrayId.push(id);
  window.localStorage.setItem(keyType, JSON.stringify(arrayId));
}

function checkIdInLocalStorage(id, keyType) {
  return readLocalStorage(keyType).includes(id);
}

function removeIdFromLocalStorage(id, keyType) {
  window.localStorage.setItem(
    keyType,
    JSON.stringify(readLocalStorage(keyType).filter(item => item !== id)),
  );
}

export {
  LS_KEY_TYPE,
  readLocalStorage,
  addIdToLocalStorage,
  removeIdFromLocalStorage,
  checkIdInLocalStorage,
};
