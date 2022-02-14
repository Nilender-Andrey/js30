const key = 'b8ae69e7332d1d174409f1530f5a4e12';

async function getMovies(keyword = '', page = 1) {
  let url = 'https://api.themoviedb.org/3/';
  url += keyword ? 'search' : 'discover';
  url += '/movie';
  url += keyword ? `?query=${keyword}` : `?sort_by=popularity.desc`;
  url += `&api_key=${key}`;
  url += `&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getMovies;
