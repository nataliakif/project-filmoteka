import { checkIdInLocalStorage, LS_KEY_TYPE } from '../utils/localStorage';
import { refs } from '../references/refs';
import { readState } from '../base/state';
import { onModalBtnWatchedClick, onModalBtnQueueClick } from '../base/handlers';

function renderFilmModal(data) {
  const { original_title, genres, poster_path, overview, popularity, vote_average, vote_count } =
    data.data;
  const genreStr = genres.map(genre => genre.name).join(', ');
  const markup = `
  <div class="modal_film_card">

        <div class="modal__wrapper">
       
          <div class="modal__image-wrapper">
              <img class="modal__image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${original_title}" height="531" />     
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
              <button name="modalBtnWatched" type="submit" class="modal__button watched checked">
                <span name="modalBtnWatchedTextField" class="add-button-watched-text">ADD TO WATCHED</span>
              </button>
              <button name="modalBtnQueue" type="submit" class="modal__button queue checked">
                <span name="modalBtnQueueTextField" class="add-button-queue-text">ADD TO QUEUE</span>
              </button>
            </div>
            <div class="modal__arrow">
               <span class="modal__arrow-image"></span>
              <span class="modal__arrow-image"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  refs.modalContent.innerHTML = markup;
  checkStorageStatusOfFilm();
  refs.modalBtnWatched[0].addEventListener('click', onModalBtnWatchedClick);
  refs.modalBtnQueue[0].addEventListener('click', onModalBtnQueueClick);
}

function checkStorageStatusOfFilm() {
  const filmId = readState().modalFilmId;
  let isInWatched = checkIdInLocalStorage(filmId, LS_KEY_TYPE.WATCHED);
  let isInQueue = checkIdInLocalStorage(filmId, LS_KEY_TYPE.QUEUE);
  const watchedBtnText = isInWatched ? 'REMOVE FROM WATCHED' : 'ADD TO WATCHED';
  const queueBtnText = isInQueue ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE';
  refs.modalBtnWatchedTextField[0].textContent = watchedBtnText;
  refs.modalBtnQueueTextField[0].textContent = queueBtnText;
  isInWatched
    ? refs.modalBtnWatched[0].classList.remove('checked')
    : refs.modalBtnWatched[0].classList.add('checked');
  isInQueue
    ? refs.modalBtnQueue[0].classList.remove('checked')
    : refs.modalBtnQueue[0].classList.add('checked');
}

export { renderFilmModal, checkStorageStatusOfFilm };
