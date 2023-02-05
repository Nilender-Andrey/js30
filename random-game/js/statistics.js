import Database from './database.js';
import { playSound } from './helpers.js';
import { gameInfo } from './info.js';
import { resultGameBtm } from './control.js';

class Statistics {
  constructor() {
    this.parent = document.querySelector('.screen');
  }

  _show() {
    const view = `
      <p class="statistics__title">Last 10 game results:</p>
        <table class="statistics-table">
          ${this._addResults()}
        </table>
    `;

    this.element = document.createElement('div');
    this.element.className = 'statistics statistics--open';
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

  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  trigger() {
    gameInfo.remove();
    playSound('btn');
    this.element ? this.remove() : this._show();
  }
}

export const statistics = new Statistics();

resultGameBtm.addEventListener('click', statistics.trigger.bind(statistics));
