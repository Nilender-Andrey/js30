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

    if (live < 1) {
      playSound('lose');
      new GameResult('lose', score);
    } else {
      playSound('win');
      new GameResult('win', score);
    }
    Database.set(score);
    return true;
  }

  return false;
}
export function randomNumber() {
  const num = Math.floor(Math.random() * 4);
  return num;
}

export function playSound(filename) {
  const sound = new Audio(`./assets/audio/${filename}.mp3`);
  sound.play();
}

export function speedСalculation() {
  const { score, baseSpeed } = state.getState();
  let res = baseSpeed - (baseSpeed * score === 0 ? 1 : score) / 100;
  res = res < 1.5 ? 1.5 : res;
  console.log('скорость', res);
  return res;
}

export function frequencyСalculation() {
  const { score, frequency } = state.getState();
  let res = frequency - (frequency * score === 0 ? 1 : score) / 100;
  console.log('частота', res);
  res = res < 0.5 ? 0.5 : res;
  return res;
}
