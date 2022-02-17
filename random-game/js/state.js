class State {
  constructor() {
    this.state;
    this.reset();
  }

  getState() {
    return this.state;
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
  }

  reset() {
    this.state = {
      score: 0,
      life: 3,
      variants: ['left--down', 'right--up', 'left--up', 'right--down'],
      frequency: 2,
      speed: 2,
      timerId: null,
      winResult: 10,
      stopGame: false,
    };
  }
}

const state = new State();

export default state;
