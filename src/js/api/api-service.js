
import axios from 'axios';
const BASE_URL ='https://api.themoviedb.org/3/';
 
export default class FilmsApiService{
        constructor() {
          this.apiKey = '03b99d578651e9a3ce5c6cc1a058aad2',
          this.query = '';
          this.page = 1;
        }

    async getBySearchQuery(){
        const response = await axios.get(`${BASE_URL}search/movie?api_key=${this.apiKey}&query=${this.query}&page=${this.page}`);
        return response.data;
        } 
    async getPopularFilms(){
        const response = await axios.get(`${BASE_URL}trending/movie/week?api_key=${this.apiKey}&page=${this.page}`);
        return response;     
        }
    async getGenres(){
        const response = await axios.get(`${BASE_URL}genre/movie/list?api_key=${this.apiKey}`)
        return response.genres;
    }
}
 
