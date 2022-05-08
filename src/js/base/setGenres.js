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
// return data.results.map( film => ({
//         ...film,
//         genres: film.genre_ids
//         .map(id => genres.genres.filter(item => item.id === id))
//         .flat().map(item=> item.name)
//       }));
//       console.log(d)
//

export { setGenres };
