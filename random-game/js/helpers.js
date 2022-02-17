import state from './state.js';
import GameResult from './game_result.js';
import Database from './database.js';

const scoreElem = document.querySelector('.info__score');
const lifeElem = document.querySelector('.info__life');

export function showScore() {
  const score = (state.getState().score + 10000).toString().slice(1);
  scoreElem.innerText = score;
}

export function showLife() {
  const life = state.getState().life;
  console.log('showLife', life);

  if (life <= 0) {
    lifeElem.innerText = '';
    return;
  }

  const liveStr = new Array(life).fill('🐤').join('');

  lifeElem.innerText = liveStr;
}

export function gameOver() {
  const live = state.getState().life;
  const score = state.getState().score;
  const winResult = state.getState().winResult;

  if (live < 1 || score === winResult) {
    const eggs = document.querySelectorAll('.egg');

    eggs.forEach((item) => {
      item.remove();
    });

    if (live < 1) new GameResult('lose', score);
    else new GameResult('win', score);
    Database.set(score);
    return true;
  }

  return false;
}
export function randomNumber() {
  const num = Math.floor(Math.random() * 4);
  return num;
}
