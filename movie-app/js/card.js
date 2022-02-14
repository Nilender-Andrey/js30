class Card {
  constructor({ title, poster, overview, rating }) {
    this.title = title;
    this.poster = poster;
    this.overview = overview;
    this.rating = rating;
    this.element = document.createElement('div');

    this._create();
  }

  _create() {
    const card = `
          ${
            this.poster
              ? `<img
            class="card__img"
            src="https://image.tmdb.org/t/p/w1280${this.poster}"
            alt="${this.title}"
          />`
              : `<img
              class="card__img"
              src="../assets/img/no_img.jpg"
              alt="no image" style="object-fit:contain"            
            />`
          }
    

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

    return this.element;
  }

  addInside(parentСlass) {
    this.parent = document.querySelector(`.${parentСlass}`);
    this.parent
      ? this.parent.append(this.element)
      : console.error('Card display error');
  }

  addBefore(neighborСlass) {
    this.neighbor = document.querySelector(`.${neighborСlass}`);
    this.neighbor
      ? this.neighbor.before(this.element)
      : console.error('Card display error');
  }
}

export default Card;
