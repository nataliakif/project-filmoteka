import {refs} from '../references/refs'

function renderGallery(data) {
  //функция которая принимает массив объектов, полученный от api (при чем не важно будут это тренды, либо поисковой запрос пользователя, либо бибилиотека)
  //ничего не возвращает   
    const markupFilmCard = data
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


export { renderGallery };
