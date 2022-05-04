import FilmApiService from '../api/api-service';
import { refs } from '../references/refs';

const filmApiService = new FilmApiService();
filmApiService
  .getPopularFilms()
  .then(renderData)
  .catch(error => {
    console.log(error);
  });

function renderData(results) {
  console.log(results);
  gallery.insertAdjacentHTML('beforeend', filmCardTpl(results));
}

function renderData(response) {
  // console.log(response.data.results);
  const markupFilmCard = response.data.results
    .map(film => {
      return `
        <li class="film-card">
        <img class="film-card__image" src='https://image.tmdb.org/t/p/w500/${
          film.poster_path
        }' alt="${film.title}"/>
        <div class="film-card__description">
            <p class="film-card__title">${film.title}</p>
             <p class="film-card__genre">${film.genres} | ${film.release_date.substr(0, 4)}</p>
        </div>
        </li>`;
    })
    .join('');
  return refs.gallery.insertAdjacentHTML('beforeend', markupFilmCard);
}
