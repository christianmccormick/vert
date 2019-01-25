import { getCoords } from './coords';

const activeAnimations = [];

const easeInOutQuad = (t) => {
  if (t < 0.5) {
    return 2 * t * t;
  }
  return -1 + (4 - 2 * t) * t;
};

const animateOnAxis = (axis, value) => {
  let start;
  let duration = 1000;

  const initialValue = getCoords()[axis];
  let valueWithinBounds = value;

  let axisDimension = 0;
  if (axis === 'x') {
    axisDimension = document.body.scrollWidth - document.documentElement.clientWidth;
  } else if (axis === 'y') {
    axisDimension = document.body.scrollHeight - document.documentElement.clientHeight;
  }

  if (value > axisDimension) {
    valueWithinBounds = axisDimension;
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

export const animate = {
  x: value => animateOnAxis('x', value),
  y: value => animateOnAxis('y', value),
};

export const animations = () => activeAnimations;
