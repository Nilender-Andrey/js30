import Egg from './egg.js';
import state from './state.js';
import { randomNumber, gameOver } from './helpers.js';
import { startGameBtm, resultGameBtm, infoGameBtm } from './control.js';
import { statistics } from './statistics.js';
import { gameInfo } from './info.js';
import {
  playSound,
  speedСalculation,
  frequencyСalculation,
  bonuses,
} from './helpers.js';
class Game {
  constructor() {
    this.timerId;
    this.intervalId;
    this._addListener();
  }

  _tick() {
    this.timerId = setTimeout(
      this._tick.bind(this),
      frequencyСalculation() * 1000,
    );
    bonuses();
    playSound('add_egg');
    new Egg(state.getState().variants[randomNumber()], speedСalculation());
  }

  _controlResultGame() {
    this.intervalId = setInterval(() => {
      if (gameOver()) {
        clearTimeout(this.timerId);
        clearInterval(this.intervalId);
        this.timerId = this.intervalId = null;
        state.setState({ gameStopped: true });
      }
    }, 10);
  }

  _addListener() {
    startGameBtm.addEventListener('click', this._startGame.bind(this));
  }

  _startGame() {
    playSound('start');
    statistics.remove();
    gameInfo.remove();
    startGameBtm.classList.add('settings__button--start--run');
    resultGameBtm.classList.add('settings__button--results--run');
    infoGameBtm.classList.add('settings__button--info--run');
    this._tick();
    this._controlResultGame();
  }
}

new Game();
