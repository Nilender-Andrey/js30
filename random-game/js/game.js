import Egg from './egg.js';
import state from './state.js';
import { randomNumber, gameOver } from './helpers.js';

class Game {
  constructor() {
    this.timerId;
    this.tick();
    this.infoScore = document.querySelector('.info__score');
  }

  tick() {
    if (state.getState().life <= 1) {
      gameOver(this.timerId);
      return;
    }
    this.timerId = setTimeout(
      () => this.tick(),
      state.getState().frequency * 1000,
    );
    console.log('tick');

    new Egg(state.getState().variants[randomNumber()], state.getState().speed);
  }
}

new Game();
