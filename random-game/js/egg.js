import state from './state.js';
import { showScore, showLife } from './helpers.js';

const controlButton = document.querySelectorAll('.control__button');
class Egg {
  constructor(tray, animationDuration, btn) {
    this.tray = tray;
    console.log(tray, animationDuration);
    this.animationDuration = animationDuration;
    this.element = document.createElement('div');
    this.parent = document.querySelector(`.tray__egg-path--${this.tray}`);

    this._addEgg();
    this._isCatch();
  }

  _addEgg() {
    this.element.className = `egg egg--${
      this.tray === 'left--up' || this.tray === 'left--down' ? 'left' : 'right'
    }`;
    this.element.style.animationDuration = `${this.animationDuration}s`;
    this.parent.append(this.element);
  }

  _remove() {
    this.element.remove();
  }

  _isCatch() {
    setTimeout(() => {
      controlButton.forEach((btn) => {
        if (btn.classList.contains(`control__button--${this.tray}`)) {
          if (btn.classList.contains('control__button--active')) {
            state.setState({ score: state.getState().score + 1 });
            showScore();
          } else {
            if (!state.getState().stopGame) {
              state.setState({ life: state.getState().life - 1 });
              showLife();
            }
          }
        }
      });
      this._remove();
    }, this.animationDuration * 1000 + 20);
  }
}

export default Egg;
