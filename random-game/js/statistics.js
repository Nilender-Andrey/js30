import Database from './database.js';

class Statistics {
  constructor() {
    this.parent = document.querySelector('.screen');
  }

  _show() {
    const view = `
    <div class="statistics statistics--open">
      <p class="statistics__title">Last 10 game results:</p>
        <table class="statistics-table">
          ${this._addResults()}
        </table>
    </div>
    `;

    this.element = document.createElement('div');
    this.element.innerHTML = view;
    this.parent.append(this.element);
  }

  _addResults() {
    return Database.get()
      .map(
        (item) => `
      <tr>
        <td>${item}</td>
      </tr>`,
      )
      .join('');
  }

  _remove() {
    this.element.remove();
    this.element = null;
  }

  trigger() {
    this.element ? this._remove() : this._show();
  }
}

const statistics = new Statistics();

const resultBtn = document.querySelector('.settings__button--results');

resultBtn.addEventListener('click', statistics.trigger.bind(statistics));
