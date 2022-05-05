import FilmApiService from '../api/api-service';
<<<<<<< Updated upstream
import {refs} from '../references/refs'
=======
import {refs} from '../references/refs';
import {updateInterface} from './update';

>>>>>>> Stashed changes


<<<<<<< Updated upstream
const headerSearch = new FilmApiService();

function formInput(e){
    headerSearch.query = e.currentTarget.elements.input.value;
}

function formSumbit(e){
    e.preventDefault();
    refs.searchForm.reset();
    refs.gallery.innerHTML = '';
    return headerSearch.getBySearchQuery()
    .then(renderData)
    .catch(error=>{console.log(error)});
}

    function renderData(data){
        console.log(data.results);
        const markupFilmCard = data.results.map((film) => {
            return `
                <li class="film-card">
                    <img class="film-card__image" src='https://image.tmdb.org/t/p/w500/${film.poster_path}' alt="${film.title}"/>
                    <div class="film-card__description">
                        <p class="film-card__title">${film.title}</p>
                         <p class="film-card__genre">${film.genres} | ${film.release_date.substr(0, 4)}</p>
                    </div>
                </li>`
              })
              .join('');
              return refs.gallery.insertAdjacentHTML('beforeend', markupFilmCard);
            }


=======
>>>>>>> Stashed changes
