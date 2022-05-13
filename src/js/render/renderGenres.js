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
          refs.genresList[0].children[i].irstElementChild.classList.add('active');
        }
      }
    }
    return;
  }
  hideGenres();
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
      return `<li class="genres_item" data-id="${genre.id}">
      <a href="" class="genres_link"> ${genre.name}</a>
    </li>
      `;
    })
    .join('');
  refs.genresDropdown.innerHTML = `<ul class="genres_list" name="genres_list">` + markup + `</ul>`;
}

function onGenresClick(e) {
  e.preventDefault();
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
    console.log(refs.genresList[0].children[i] !== e.target.parentNode);
    if (refs.genresList[0].children[i] !== e.target.parentNode) {
      refs.genresList[0].children[i].firstElementChild.classList.remove('active');

      activeGenreId = null;
    }
  }
  e.target.classList.add('active');
  const genreId = e.target.parentNode.dataset.id;
  activeGenreId = genreId;
  updateInterface();
}

export { activeGenreId, onDropBtnClick, hideGenres };
