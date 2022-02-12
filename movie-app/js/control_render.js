import getMovies from './get_movies.js';
import Card from './card.js';

class ControlRender {
  static async startRender() {
    const result = await getMovies();
    console.log(result);
  }

  static async reRender(request) {
    const result = await getMovies(request);
    console.log(result);
    if (result.length) {
      const card = result[0];
      const info = {
        title: card.original_title,
        poster: card.poster_path,
        overview: card.overview,
        rating: card.vote_average,
      };
      new Card(info);
    } else {
      console.log('Ни чего не найдено');
    }
  }
}

export default ControlRender;
