import ControlRenderCards from './control_render_cards.js';

class InfiniteScrolling {
  constructor(parentСlass) {
    this.parentElem = document.querySelector(`.${parentСlass}`);

    this.element = document.createElement('div');
    this.addTarget();
  }

  _start() {
    const options = {
      /*  root: this.parentElem, */
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ControlRenderCards.renderNewСards();
        }
      });
    }, options);
    observer.observe(this.element);
  }

  addTarget() {
    this.element.style.width = '100%';
    this.element.style.height = '20px';
    this.element.className = 'scroll-target';
    this.parentElem.append(this.element);

    this._start();
  }
}

export default InfiniteScrolling;
