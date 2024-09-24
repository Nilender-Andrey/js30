class Search {
  constructor(callback) {
    this.element = document.getElementById('search');
    this.searchInput = this.element.querySelector('.search__input');
    this.iconBtnClear = this.element.querySelector('.search-icon_clear');
    this.iconBtnSearch = this.element.querySelector('.search-icon_search');
    this.searchInput.focus();
    this.searchInput.addEventListener('input', this._handlerInput.bind(this));
    this.searchInput.addEventListener('keydown', this._handlerClick.bind(this));
    this.element.querySelector('.search__btn').addEventListener('click', this._handlerClick.bind(this));

    this.clearInput = false;
    this.callback = callback;
  }

  _handlerInput() {
    if (this.clearInput) {
      this._conditionClear();
    }
  }

  _handlerClick(event) {
    if (event.keyCode === 13 || event.currentTarget.classList.contains('search__btn')) {
      if (this.clearInput) {
        this.searchInput.value = '';

        this._conditionClear();
      } else {
        this._conditionSearch();

        this.callback(this.searchInput.value);
        this._ScrollTop();
      }

      if (!this.searchInput.value) this._conditionClear();
    }
  }

  _ScrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  _conditionClear() {
    this.iconBtnClear.classList.add('none');
    this.iconBtnSearch.classList.remove('none');

    this.clearInput = false;
  }

  _conditionSearch() {
    this.iconBtnClear.classList.remove('none');
    this.iconBtnSearch.classList.add('none');

    this.clearInput = true;
  }
}

export default Search;
