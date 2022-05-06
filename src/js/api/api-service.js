import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '03b99d578651e9a3ce5c6cc1a058aad2';

async function getBySearchQuery(query, page) {
  const response = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  // .then(response => {
  //   return getGenres().then(genresList => {
  //     return response.data.results.map( film => ({
  //       ...film,
  //       genres: film.genre_ids
  //       .map(id => genresList.filter(el => el.id === id))
  //       .flat().map(el=> el.name)
  //     }));
  //   });
  //   });

  return response;
}
async function getPopularFilms(page) {
  const response = axios.get(`${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`);
  // .then(response => {
  // return getGenres().then(genresList => {
  //   return response.data.results.map( film => ({
  //     ...film,
  //     genres: film.genre_ids
  //     .map(id => genresList.filter(item => item.id === id))
  //     .flat().map(item=> item.name)
  //   }));
  // })}
  // );
  return response;
}
async function getGenres() {
  const response = await axios.get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
  return response.data;
}
async function getFilmById(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return response;
}

export { getBySearchQuery, getPopularFilms, getFilmById, getGenres };
