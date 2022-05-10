import { getGenres} from '../api/api-service';
import { refs } from '../references/refs';
import { updateInterface } from '../base/update';

let activeGenreId = null;

function onDropBtnClick(e) {
  refs.dropdownGenres.classList.toggle('show');
  getGenres().then(data => renderGenres(data.genres));
}
function renderGenres(data) {
  const markup = data
    .map(genre => {
      return `<li class ='genres_item' data-id='${genre.id}'>${genre.name}</li>
      `;
    })
    .join('');
  refs.dropdownGenres.innerHTML = markup;
}

refs.dropdownGenres.addEventListener('click', onGenresClick);
function onGenresClick(e) {
  const genreId = e.target.dataset.id;
  activeGenreId = genreId;
  updateInterface();
  
}
console.log(activeGenreId)
export { activeGenreId, onDropBtnClick };
