import { PAGE_TYPE, readState } from '../base/state';
import { homeMarkup, myLibMarkup } from '../templates/markupHeader';
const MARKUP_HEADER_TYPE = {
  FORM: 'form',
  BUTTONS: 'buttons',
};

function renderHeader(markupType) {
  const containerMarkup = document.querySelector('.js-container-markup');
  switch (markupType) {
    case MARKUP_HEADER_TYPE.FORM:
      containerMarkup.innerHTML = homeMarkup;
      return;

    case MARKUP_HEADER_TYPE.BUTTONS:
      containerMarkup.innerHTML = myLibMarkup;

      switch (readState().pageType) {
        case PAGE_TYPE.LIB_WATCHED:
          //Здесь на кнопку watched вешаю класс "isActive"- оранжевій current
          return;
        case PAGE_TYPE.LIB_QUEUE:
          //Здесь на кнопку QUEUE вешаю класс "isActive"- оранжевій current
          return;
      }
      break;
  }
}

export { renderHeader, MARKUP_HEADER_TYPE };
