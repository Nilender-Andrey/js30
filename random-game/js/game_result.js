import state from './state.js';
import { showScore, showLife } from './helpers.js';
import { startGameBtm, resultGameBtm } from './control.js';

class GameResult {
  constructor(result, score) {
    this.result = result;
    this.score = score;
    this.timeShowResult = state.getState().timeShowResult;
    this.element = document.createElement('div');
    this.parent = document.querySelector('.screen');
    this.show();
  }

  show() {
    const view = `<div class="game-result game-result--${this.result}">
           <p class="game-result__result">You ${
             this.result === 'win' ? 'WIN' : 'LOSE'
           }!</p>
           <p class="game-result__score">${this.score}</p>
             </div>`;

    this.element.innerHTML = view;
    this.parent.append(this.element);

    setTimeout(() => {
      state.reset();
      showScore();
      showLife();
      startGameBtm.classList.remove('settings__button--start--run');
      resultGameBtm.classList.remove('settings__button--results--run');
      this.element.remove();
    }, this.timeShowResult);
  }
}

export default GameResult;
