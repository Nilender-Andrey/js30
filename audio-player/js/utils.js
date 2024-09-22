export function getMinAndSecByDuration(duration) {
  const min = formatTime(Math.floor(duration / 60));
  const sec = formatTime(Math.floor(duration - min * 60));

  return `${min} : ${sec}`;
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

export function throttle(callback, timeout) {
  let timer = null;

  return function wrapper(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
