import FilmApiService from '../api/api-service';
import { renderGallery } from '../render/renderGallery';

const filmApiService = new FilmApiService();
filmApiService
  .insertGenresPopularCard()
  .then(renderGallery)
  .catch(error => {
    console.log(error);
  });
  


