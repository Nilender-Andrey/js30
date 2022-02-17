import Egg from './egg.js';
import state from './state.js';
import { randomNumber, gameOver } from './helpers.js';

class Game {
  constructor() {
    this.timerId;
    this.intervalId;
    this.tick();
    this._controlResultGame();
    this.infoScore = document.querySelector('.info__score');
  }

  tick() {
    this.timerId = setTimeout(
      () => this.tick(),
      state.getState().frequency * 1000,
    );

    new Egg(state.getState().variants[randomNumber()], state.getState().speed);
  }

  _controlResultGame() {
    this.intervalId = setInterval(() => {
      if (gameOver()) {
        clearTimeout(this.timerId);
        clearInterval(this.intervalId);
        state.setState({ stopGame: true });
      }
    }, 10);
  }
}

new Game();
