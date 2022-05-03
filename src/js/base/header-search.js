import FilmApiService from '../api/api-service';
import filmCardTpl from '../templates/film-card.hbs';
const gallery = document.querySelector('.gallery')

const searchForm = document.querySelector('.js-header-form');

searchForm.addEventListener('input',formInput);
searchForm.addEventListener('submit',formSumbit);

const headerSearch = new FilmApiService();

function formInput(e){
    headerSearch.query = e.currentTarget.elements.input.value;
}

function formSumbit(e){
    e.preventDefault();
    searchForm.reset();
    return headerSearch.getBySearchQuery()
    .then(renderData)
    .catch(error=>{console.log(error)});
}

function renderData(results){
gallery.innerHTML = filmCardTpl(results);

}
