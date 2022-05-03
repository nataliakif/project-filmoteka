

const BASE_URL ='https://api.themoviedb.org/3/';
 
export default class FilmsApiService{
        constructor() {
          this.apiKey = '03b99d578651e9a3ce5c6cc1a058aad2',
          this.query = '';
          this.page = 1;
        }
    getPopularFilms(){
        return fetch(`${BASE_URL}search/movie?api_key=${this.apiKey}`)
        .then(response => response.json())
        .then(data => data.results)
        } 
  getPopularFilms(){
    return fetch(`${BASE_URL}trending/movie/week?api_key=${this.apiKey}&query=${this.query}`)
    .then(response => response.json())
    .then(data => data.results)
        
    }
      searchFilms (){
      return fetch(`${BASE_URL}search/movie?api_key=${this.apiKey}&query=${this.query}`)
      .then(response => response.json())
      .then(data=>data.results);
  }
}
