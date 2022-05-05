import {refs} from '../references/refs'

function renderGallery(data) {
    //функция которая принимает массив объектов, полученный от api (при чем не важно будут это тренды, либо поисковой запрос пользователя, либо бибилиотека)
    //ничего не возвращает
    const markup = data
      .map(({ id, poster_path, title, genre_ids, release_date = '' }) => {
        if (genre_ids.length > 3){
          genre_ids = genre_ids.slice(0,2);
        }
        return `
            <li class="film-card" data-id=${id}>
            <img class="film-card__image" src='https://image.tmdb.org/t/p/w500/${poster_path}' alt="${title}"/>
            <div class="film-card__description">
                <h2 class="film-card__title">${title}</h2>
                 <p class="film-card__genre">${genre_ids.join(', ')} | ${release_date.substr(0,4,)}
                 </p>
            </div>
            </li>`;
      })
      .join('');
    refs.gallery.innerHTML = markup;
  }


export { renderGallery };
