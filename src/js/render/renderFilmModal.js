import { checkIdInLocalStorage, LS_KEY_TYPE } from '../utils/localStorage';
import { refs } from '../references/refs';

function renderFilmModal(data) {
  const { original_title, genres, poster_path, overview, popularity, vote_average, vote_count } =
    data.data;
  const genreStr = genres.map(genre => genre.name).join(', ');
  const markup = `
  <div class="modal_film_card">
        <div class="modal__wrapper">
          <div class="modal__image-wrapper">
            <a class="js-teaser" href="#">
              <img class="modal__image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${original_title}" height="531" />
            </a>
          </div>
          <div class="modal__info-wrapper">
            <h2 class="modal__film-titel">${original_title}</h2>
            <table>
              <tr class="modal__param">
                <td class="modal__param-titel">Vote / Votes</td>
                <td class="modal__param-value">
                  <div class="modal__film-votes">
                    <span class="param__value-vote">${vote_average}</span> /
                    <span class="param__value-votes">${vote_count}</span>
                  </div>
                </td>
              </tr>
              <tr class="modal__param">
                <td class="modal__param-titel">Popularity</td>
                <td class="modal__param-value">${Math.round(popularity)}</td>
              </tr>
              <tr class="modal__param">
                <td class="modal__param-titel">Original Title</td>
                <td class="modal__param-value">${original_title}</td>
              </tr>
              <tr class="modal__param">
                <td class="modal__param-titel">Genre</td>
                <td class="modal__param-value">${genreStr}</td>
              </tr>
            </table>
            <span class="modal__film-owervier">ABOUT</span>
            <div class="film__owervier">
              <p class="modal__film-owervier-text">
                ${overview}
              </p>
            </div>
            <div class="modal__buttons">
              <button type="submit" class="modal__button watched">
                <span class="add-button-watched-text">ADD TO WATCHED</span>
              </button>
              <button type="submit" class="modal__button queue">
                <span class="add-button-queue-text">ADD TO QUEUE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  refs.modalContent.innerHTML = markup;
}

export { renderFilmModal };
