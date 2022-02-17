import state from './state.js';

const scoreElem = document.querySelector('.info__score');
const lifeElem = document.querySelector('.info__life');

export function showScore() {
  const score = (state.getState().score + 10000).toString().slice(1);
  scoreElem.innerText = score;
}

export function showLife() {
  const life = state.getState().life;

  if (life <= 0) {
    lifeElem.innerText = '';
    return;
  }

  const liveStr = new Array(life).fill('🐤').join('');

  lifeElem.innerText = liveStr;
}

export function gameOver(timerId) {
  const live = state.getState().life;

  if (live <= 1) {
    clearTimeout(timerId);
    const eggs = document.querySelectorAll('.egg');

    eggs.forEach((item) => {
      item.style.animationPlayState = 'paused';
      item.remove();
    });

    console.log('Игра окончена');
  }
}

export function randomNumber() {
  const num = Math.floor(Math.random() * 4);
  return num;
}
