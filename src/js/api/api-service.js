import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '03b99d578651e9a3ce5c6cc1a058aad2';

async function getBySearchQuery(query, page) {
  const response = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
  return response;
}
async function getPopularFilms(page) {
  const response = axios.get(`${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`);
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

async function getFilmsByIdArray(arrayOfIds) {
  const promises = arrayOfIds.map(async id => {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  });
  const data = await Promise.all(promises);
  return data;
}
async function getFilmByGenreId(id, page) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`,
  );
  return response;
}
export {
  getBySearchQuery,
  getPopularFilms,
  getFilmById,
  getGenres,
  getFilmsByIdArray,
  getFilmByGenreId,
};
