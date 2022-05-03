import FilmApiService from '../api/api-service';
import filmCardTpl from '../templates/film-card.hbs';
import {refs} from '../references/refs'


const filmApiService = new FilmApiService();
filmApiService.getPopularFilms()
.then(renderData)
.catch(error=>{
    console.log(error);
});

function renderData(results){
    console.log(results)
 refs.gallery.insertAdjacentHTML('beforeend', filmCardTpl(results));
}