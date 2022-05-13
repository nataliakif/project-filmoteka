import { getGenres } from '../api/api-service';
import { refs } from '../references/refs';
import { updateInterface } from '../base/update';
import { readState, writeState } from '../base/state';

let activeGenreId = null;
let genreListShown = false;
async function onDropBtnClick(e) {
  if (!genreListShown) {
    genreListShown = true;
    const data = await getGenres();
    renderGenres(data.genres);
    refs.genresList[0].addEventListener('click', onGenresClick);
    if (activeGenreId) {
      for (let i = 0; i < refs.genresList[0].children.length; i++) {
        if (refs.genresList[0].children[i].dataset.id === activeGenreId) {
          refs.genresList[0].children[i].classList.add('active');
        }
      }
    }
    return;
  }
  if (refs.genresList[0]) {
    refs.genresList[0].removeEventListener('click', onGenresClick);
  }
  refs.genresDropdown.innerHTML = '';
  genreListShown = false;
}

function hideGenres() {
  if (refs.genresList[0]) {
    refs.genresList[0].removeEventListener('click', onGenresClick);
  }
  refs.genresDropdown.innerHTML = '';
  genreListShown = false;
}

function renderGenres(data) {
  const markup = data
    .map(genre => {
      return `<li class ='genres_item' data-id='${genre.id}'>${genre.name}</li>
      `;
    })
    .join('');
  refs.genresDropdown.innerHTML = `<ul class="genres_list" name="genres_list">` + markup + `</ul>`;
}

// refs.genresList.addEventListener('click', onGenresClick);

function onGenresClick(e) {
  const state = readState();
  state.currentPage = 1;
  writeState(state);

  if (e.target.classList.contains('active')) {
    activeGenreId = null;
    e.target.classList.remove('active');
    updateInterface();
    return;
  }
  for (let i = 0; i < refs.genresList[0].children.length; i++) {
    if (refs.genresList[0].children[i] !== e.target) {
      refs.genresList[0].children[i].classList.remove('active');
      activeGenreId = null;
    }
  }
  e.target.classList.add('active');
  const genreId = e.target.dataset.id;
  activeGenreId = genreId;
  updateInterface();
}

export { activeGenreId, onDropBtnClick, hideGenres };
