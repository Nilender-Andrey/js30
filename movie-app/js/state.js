class State {
  constructor() {
    this.state = {
      search: '',
      page: 1,
      total_pages: 1,
    };
  }

  getState() {
    return this.state;
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
  }
}

const state = new State();

export default state;
