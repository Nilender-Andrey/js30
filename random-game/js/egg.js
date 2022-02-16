import state from './state.js';

class Egg {
  constructor(tray, animationDuration, btn) {
    this.tray = tray;
    console.log(this.tray);
    this.animationDuration = animationDuration;
    this.element = document.createElement('div');
    this.parent = document.querySelector(`.tray__egg-path--${this.tray}`);

    this._addEgg();
    this.isCatch();
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

  isCatch() {
    const controlButton = document.querySelectorAll('.control__button');
    setTimeout(() => {
      controlButton.forEach((btn) => {
        if (btn.classList.contains(`control__button--${this.tray}`)) {
          if (btn.classList.contains('control__button--active')) {
            state.setState({ score: state.getState().score + 1 });
          } else {
            state.setState({ life: state.getState().life - 1 });
          }
          this._remove();
        }
      });
    }, this.animationDuration * 1000);
  }
}

export default Egg;

/* const arr = ['left--down', 'right--up', 'left--up', 'right--down'];
let i = 0;
setInterval(() => {
  new egg(arr[i], 1);
  i++;
  if (i >= arr.length) i = 0;
}, 2000);
 */
