import { getGenres } from '../api/api-service';
import { refs } from '../references/refs';
import { updateInterface } from '../base/update';
import { readState, writeState } from '../base/state';

let activeGenreId = null;

function onDropBtnClick(e) {
  refs.genresDropdown.classList.toggle('show');
  refs.genresList.classList.toggle('show');
  getGenres().then(data => renderGenres(data.genres));
}

function hideGenres() {
  refs.genresList.classList.remove('show');
  refs.genresDropdown.classList.remove('show');
}

function renderGenres(data) {
  const markup = data
    .map(genre => {
      return `<li class ='genres_item' data-id='${genre.id}'>${genre.name}</li>
      `;
    })
    .join('');
  refs.genresList.innerHTML = markup;
}

refs.genresList.addEventListener('click', onGenresClick);

function onGenresClick(e) {
  if (e.target.nodeName !== 'LI') {
    refs.genresDropdown.classList.remove('show');
  }
  const state = readState();
  state.currentPage = 1;
  writeState(state);

  if (e.target.classList.contains('active')) {
    activeGenreId = null;
    e.target.classList.remove('active');
    updateInterface();
    return;
  }
  for (let i = 0; i < refs.genresList.children.length; i++) {
    if (refs.genresList.children[i] !== e.target) {
      refs.genresList.children[i].classList.remove('active');
      activeGenreId = null;
    }
  }
  e.target.classList.add('active');
  const genreId = e.target.dataset.id;
  activeGenreId = genreId;
  updateInterface();
}

export { activeGenreId, onDropBtnClick, hideGenres };
