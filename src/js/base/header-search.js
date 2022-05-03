import FilmApiService from '../api/api-service';
import filmCardTpl from '../templates/film-card.hbs';
import {refs} from '../references/refs'

refs.searchForm.addEventListener('input',formInput);
refs.searchForm.addEventListener('submit',formSumbit);

const headerSearch = new FilmApiService();

function formInput(e){
    headerSearch.query = e.currentTarget.elements.input.value;
}

function formSumbit(e){
    e.preventDefault();
    refs.searchForm.reset();
    return headerSearch.getBySearchQuery()
    .then(renderData)
    .catch(error=>{console.log(error)});
}

function renderData(results){
    let arr = []
    results.map(res=>{
        if(res.poster_path !== null){
            arr.push(res)
            refs.gallery.innerHTML= filmCardTpl(arr);
        }
    });
}

