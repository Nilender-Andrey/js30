class Cards {
  constructor() {
    this.key = 'biit57J7whBMM-QFBQ7uDLZbyiRWDWfZU1CQnpMS4rU';

    this.imagesElement = document.getElementById('images');
  }

  async getCards(keyword = '') {
    try {
      this.loading();

      let url = `https://api.unsplash.com/photos/random?count=20&client_id=${this.key}`;
      if (keyword) {
        url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=20&client_id=${this.key}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (Array.isArray(data) || (data.results && data.results.length)) {
        this.render(data.results || data);
      } else {
        this.imagesElement.innerHTML = `
<div class="error">
  По вашему запросу ни чего не найдено или сервер не ответил. Попробуйте позже.
</div>`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  loading() {
    const images = this.imagesElement.querySelectorAll('.image');

    if (images.length) {
      images.forEach((image) => {
        image.innerHTML = `<img src="./assets/svg/spinner.svg" alt="loading>"`;
      });
    } else {
      const imagesList = Array.from(Array(20), () => +Math.random().toFixed(1)).map((item) => {
        const className = item >= 0.5 ? 'image--size-colum' : 'image--size-row';

        return `
  <div class="image ${className} image--loading">
    <img src="assets/svg/spinner.svg" alt="loading">
  </div>`;
      });

      this.imagesElement.innerHTML = imagesList.join(' ');
    }
  }

  render(data) {
    console.log(data);

    const imagesList = data.map((item) => {
      const className = item.width > item.height ? 'image--size-colum' : 'image--size-row';

      return `
<div class="image ${className}">
  <img src="${item.urls.small}" alt="${item.alt_description}">
</div>`;
    });

    this.imagesElement.innerHTML = imagesList.join(' ');
  }
}

export default Cards;
