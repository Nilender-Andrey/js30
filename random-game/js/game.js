import Egg from './egg.js';
import state from './state.js';

class Game {
  constructor() {
    this._gameEngine();
    this.interval;
    state.setState({ life: 2, frequency: 2, speed: 2 });
  }

  _gameEngine() {
    this.interval = setInterval(() => {
      console.log(state.getState().life);
      if (state.getState().life <= 0) {
        document.querySelectorAll('.egg').forEach((item) => item.remove());

        clearInterval(this.interval);
        console.log('Игра окончена');
      } else {
        new Egg(
          state.getState().variants[this._randomNumber()],
          state.getState().speed,
        );
      }
    }, state.getState().frequency * 1000);
  }

  _randomNumber() {
    Math.floor(Math.random() * 4);

    return Math.floor(Math.random() * 4);
  }
}

let game = new Game();
/* clearInterval(game.interval); */
