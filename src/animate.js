import { getCoords } from './coords';

const activeAnimations = [];

const easeInOutQuad = (t) => {
  if (t < 0.5) {
    return 2 * t * t;
  }
  return -1 + (4 - 2 * t) * t;
};

export const animate = (value) => {
  let start;
  let duration = 1000;

  const initialValue = getCoords().y;
  let valueWithinBounds = value;

  if (value > document.body.scrollHeight - document.documentElement.clientHeight) {
    valueWithinBounds = document.body.scrollHeight - document.documentElement.clientHeight;
  } else if (value < 0) {
    valueWithinBounds = 0;
  }

  activeAnimations.push((timestamp, i) => {
    if (!start) {
      start = timestamp;
      duration += timestamp;
    }

    const time = (timestamp - start) / (duration - start);

    if (time <= 1 && time >= 0) {
      window.scrollTo(0, initialValue + (valueWithinBounds - initialValue) * easeInOutQuad(time));
    } else {
      activeAnimations.splice(i, 1);
    }
  });
};

export const animations = () => activeAnimations;
