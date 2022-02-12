class Search {
  constructor(parentСlass) {
    this.element = document.createElement('div');
    this._render(parentСlass);

    this.searchInput = this.element.querySelector('.search__input');

    this.iconBtnСlear = this.element.querySelector('.search-icon_clear');
    this.iconBtnMagnifier = this.element.querySelector(
      '.search-icon_magnifier',
    );

    this.searchInput.addEventListener('input', this._handlerInput.bind(this));
    this.searchInput.addEventListener('keydown', this._handlerClick.bind(this));
    this.element
      .querySelector('.search__btn')
      .addEventListener('click', this._handlerClick.bind(this));

    this.clearInput = false;
    this.value = '';
  }

  _handlerInput() {
    if (this.clearInput) {
      this._conditionСlear();
    }
  }

  _handlerClick(event) {
    if (
      (event.keyCode === 13 && this.searchInput.value) ||
      event.currentTarget.classList.contains('search__btn')
    ) {
      if (this.clearInput) {
        this.searchInput.value = '';

        this._conditionСlear();
      } else {
        this._conditionSearch();
        console.log('this.clearInput');
      }
    }
  }

  _conditionСlear() {
    this.iconBtnСlear.classList.add('none');
    this.iconBtnMagnifier.classList.remove('none');

    this.clearInput = false;
  }

  _conditionSearch() {
    this.iconBtnСlear.classList.remove('none');
    this.iconBtnMagnifier.classList.add('none');

    this.clearInput = true;
  }

  _render(parentСlass) {
    const search = `
    <input
      class="search__input"
      type="text"
      placeholder="Search"
      autocomplete="off"
    />
    <button class="search__btn">
      <svg class="search-icon_magnifier">
        <use
          xlink:href="./assets/svg/search_sprite.svg#magnifier"
        ></use></svg
      ><svg class="search-icon_clear none">
        <use xlink:href="./assets/svg/search_sprite.svg#clear"></use>
      </svg>
    </button>
  `;

    const header = document.querySelector(`.${parentСlass}`);
    this.element.className = 'search';
    this.element.innerHTML = search;
    header.append(this.element);
  }
}

const search = new Search('header');
