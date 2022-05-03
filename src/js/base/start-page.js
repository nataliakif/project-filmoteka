import FilmApiService from '../api/api-service';
import filmCardTpl from '../templates/film-card.hbs';


const gallery = document.querySelector('.gallery');
const filmApiService = new FilmApiService();
filmApiService.getPopularFilms()
.then(renderData)
.catch(error=>{
    console.log(error);
});;

function renderData(results){
    console.log(results)
 gallery.insertAdjacentHTML('beforeend', filmCardTpl(results));
}