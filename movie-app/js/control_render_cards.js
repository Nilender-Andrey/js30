import getMovies from './get_movies.js';
import Card from './card.js';
import state from './state.js';
import InfiniteScrolling from './infinite_scrolling.js';

class ControlRenderCards {
  static async render(request, page) {
    const result = await getMovies(request, page);
    main.innerHTML = '';

    state.setState({ page: 1, total_pages: result.total_pages });

    const { results } = result;

    if (!results.length) {
      main.innerHTML = 'There are no movies matching your search';
      return;
    }

    results.forEach((card) => {
      new Card({
        title: card.original_title,
        poster: card.poster_path,
        overview: card.overview,
        rating: card.vote_average,
      }).addInside('main');
    });
    setTimeout(() => {
      new InfiniteScrolling('main');
    }, 2000);
  }

  static async renderNewСards() {
    console.log('InfiniteScrolling');
    state.setState({ page: state.getState().page + 1 });

    const { page, search, total_pages } = state.getState();

    if (page >= total_pages) return;

    const result = await getMovies(search, page);

    const { results } = result;

    results.forEach((card) => {
      new Card({
        title: card.original_title,
        poster: card.poster_path,
        overview: card.overview,
        rating: card.vote_average,
      }).addBefore('scroll-target');
    });
  }
}

export default ControlRenderCards;
