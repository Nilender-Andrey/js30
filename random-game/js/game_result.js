import state from './state.js';
import { showScore, showLife } from './helpers.js';

class GameResult {
  constructor(result, score) {
    this.result = result;
    this.score = score;

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
      this.element.remove();
      state.reset();
      showScore();
      showLife();
    }, 5000);
  }
}

export default GameResult;
