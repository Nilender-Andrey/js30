import { playSound } from './helpers.js';

const game = document.querySelector('.game');

export const startGameBtm = game.querySelector('.settings__button--start');
export const resultGameBtm = game.querySelector('.settings__button--results');
export const infoGameBtm = game.querySelector('.settings__button--info');

const controlButton = game.querySelectorAll('.control__button');
const wolfParts = game.querySelectorAll('.wolf-part');

function handlerClick(event) {
  const target = event.target;
  const targetAction = target.dataset.action;
  const targetDirection = target.dataset.direction;
  if (target.classList.contains('control__button')) {
    movement(targetDirection, targetAction);
  }
}

function handlerKeydown(event) {
  let data;
  switch (event.keyCode) {
    case 82:
      data = ['left', 'left-up'];

      break;
    case 70:
      data = ['left', 'left-down'];

      break;
    case 85:
      data = ['right', 'right-up'];

      break;
    case 72:
      data = ['right', 'right-down'];
      break;

    default:
      return;
  }
  movement(...data);
}

function movement(body, hands) {
  wolfParts.forEach((item) => {
    if (hands === item.dataset.action || body === item.dataset.direction) {
      item.classList.remove('none');
    } else item.classList.add('none');
  });
  activeButton(hands);
}

function activeButton(hands) {
  controlButton.forEach((btn) => {
    if (btn.dataset.action === hands) {
      btn.classList.add('control__button--active');
    } else btn.classList.remove('control__button--active');
  });
  playSound('btn');
}

game.addEventListener('mousedown', handlerClick);
document.addEventListener('keydown', handlerKeydown);
