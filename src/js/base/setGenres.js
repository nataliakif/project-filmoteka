function setGenres(data, genres) {
  for (let i = 0; i < data.results.length; i += 1) {
    data.results[i].genres = [];
    for (let j = 0; j < data.results[i].genre_ids.length; j += 1) {
      const idToChange = data.results[i].genre_ids[j];
      data.results[i].genres.push(genres.genres.find(({ id }) => id === idToChange));
    }
  }
  return data;
}
export { setGenres };
