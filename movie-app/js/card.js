class Card {
  constructor({ title, poster, overview, rating }, parentСlass = 'main') {
    this.title = title;
    this.poster = poster;
    this.overview = overview;
    this.rating = rating;
    this.element = document.createElement('div');
    this.parent = document.querySelector(`.${parentСlass}`);

    this._render();
  }

  _render() {
    const card = `
     <img
          class="card__img"
          src="https://image.tmdb.org/t/p/w1280${this.poster}"
          alt="${this.title}"
        />

        <div class="card-info">
          <h2 class="card-info__title">${this.title}</h2>
          <span class="card-info__rating">${this.rating}</span>
        </div>

        <div class="card-description">
          <p class="card-description__title">Overview</p>
          <div class="card-description_wrap">
            <p class="card-description__text">
             ${this.overview}
            </p>
          </div>
        </div>
  `;

    this.element.className = 'card';
    this.element.innerHTML = card;

    this.parent
      ? this.parent.append(this.element)
      : console.error('Card display error');
  }
}

export default Card;
