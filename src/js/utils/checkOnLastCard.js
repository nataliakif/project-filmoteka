import { readState, writeState } from '../base/state';
import { refs } from '../references/refs';

function checkOnLastCardInGallery() {
  console.log(refs.gallery.children.length);
  if (refs.gallery.children.length !== 1) {
    return;
  }
  const curState = readState();
  if (curState.currentPage > 1) {
    curState.currentPage -= 1;
    writeState(curState);
  }
}

export { checkOnLastCardInGallery };
