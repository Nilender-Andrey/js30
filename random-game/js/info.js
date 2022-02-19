import { playSound } from './helpers.js';
import { infoGameBtm } from './control.js';
import { statistics } from './statistics.js';

class GameInfo {
  constructor() {
    this.parent = document.querySelector('.screen');
  }

  _show() {
    const view = `
      <p class="game-info__title">Info:</p>
      
      <ol class="game-info__list">
      <li>You need 1000 points to win</li>
      <li>By scoring 100, 200, 300, ... points you will restore life to the maximum</li>
      </ol>
     
      <p class="game-info__title">Good luck and enjoy the game!</p>
        `;

    this.element = document.createElement('div');
    this.element.className = 'game-info game-info--open';
    this.element.innerHTML = view;
    this.parent.append(this.element);
  }

  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  trigger() {
    statistics.remove();
    playSound('btn');
    this.element ? this.remove() : this._show();
  }
}

export const gameInfo = new GameInfo();

infoGameBtm.addEventListener('click', gameInfo.trigger.bind(gameInfo));
