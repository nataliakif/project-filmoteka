import { refs } from '../references/refs';
import { PAGE_TYPE, readState } from '../base/state';
import images from '../../images/plug/*.png';
import { isInteger } from 'lodash';
import poster from '../../images/plug/noposter.jpg';
function renderGallery(data) {
  //функция которая принимает массив объектов, полученный от api (при чем не важно будут это тренды, либо поисковой запрос пользователя, либо бибилиотека)
  //ничего не возвращает
  if (data === null || data.length === 0) {
    const plugMarkup = `
      <img src="${images['noresult']}" alt="Nothing was found" width="240px" class="plug_image">
      <h2 class="plug_title">Opps! There is nothing to show you</h2>
      <p class="plug_text">Maybe you forgot to bring popcorn?</p>`;
    refs.gallery.innerHTML = '';
    refs.plug.innerHTML = plugMarkup;
    return;
  }
  const markup = data
    .map(({ id, poster_path, title, genres, vote_average, release_date = '' }) => {
      if (genres.length > 2) {
        genres = genres.slice(0, 2);
      }
      if (isInteger(vote_average)) {
        vote_average = vote_average + '.0';
      }
      const posterPath = !poster_path ? poster : `https://image.tmdb.org/t/p/w500${poster_path}`;
      const genreStr = genres.map(genre => genre.name).join(', ');
      if (readState().pageType === PAGE_TYPE.TRENDS) {
        return `
        <li class="gallery__item" data-id="${id}">
        <a href="">
          <div class="wrapper">
            <img class="gallery__image" src="${posterPath}" alt="${title}" />
          </div>
          <div class="description">
            <h2 class="gallery__title">${title}</h2>
            <p class="gallery__genre">${genreStr} | ${release_date.substr(0, 4)}</p>
          </div>
        </a>
      </li>`;
      }

      return `
      <li class="gallery__item" data-id="${id}">
  <a href="">
    <div class="wrapper">
      <img class="gallery__image" src="${posterPath}" alt="${title}" />
    </div>
    <div class="description">
      <h2 class="gallery__title">${title}</h2>
      <p class="gallery__genre">${genreStr} | ${release_date.substr(
        0,
        4,
      )}<span class="film-card__raiting">${vote_average}</span>
      </p>
    </div>
  </a>
</li>`;
    })
    .join('');
  refs.plug.innerHTML = '';
  refs.gallery.innerHTML = markup;
}
export { renderGallery };
