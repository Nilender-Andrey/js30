const config = {
  score: 0,
  life: 3,
  variants: ['left--down', 'right--up', 'left--up', 'right--down'],
  frequency: 1.5,
  baseSpeed: 2.5,
  timerId: null,
  winResult: 1000,
  gameStopped: false,
  timeShowResult: 2500,
};

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
    this.state = { ...config };
  }
}

const state = new State();

export default state;
