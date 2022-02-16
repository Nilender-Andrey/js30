class State {
  constructor() {
    this.state = {
      score: 0,
      life: 2,
      variants: ['left--down', 'right--up', 'left--up', 'right--down'],
      frequency: 2,
      speed: 2,
    };
  }

  getState() {
    /*  console.log(this.state); */
    return this.state;
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
  }
}

const state = new State();

export default state;
