import { setCoords, getCoords } from './coords';
import { setDirection, getDirection } from './direction';
import DIRECTIONS from './directions';
import { animations } from './animate';

let requestAnimationFrameId = null;

let lastX = null;
let lastY = null;

const activeListeners = [];

const tick = function tick(timestamp) {
  let xDiff = false;
  let yDiff = false;

  animations().forEach((_animation, i) => _animation(timestamp, i));

  setCoords(window.pageXOffset, window.pageYOffset);

  if (getCoords().x < lastX) {
    xDiff = true;
    setDirection(DIRECTIONS.LEFT);
  } else if (getCoords().x > lastX) {
    xDiff = true;
    setDirection(DIRECTIONS.RIGHT);
  }

  if (getCoords().y < lastY) {
    yDiff = true;
    setDirection(DIRECTIONS.UP);
  } else if (getCoords().y > lastY) {
    yDiff = true;
    setDirection(DIRECTIONS.DOWN);
  }

  activeListeners.forEach((listener) => {
    if ((xDiff && listener.xCondition) || (yDiff && listener.yCondition)) {
      listener.callback();
    }
  });

  lastX = getCoords().x;
  lastY = getCoords().y;

  requestAnimationFrameId = window.requestAnimationFrame(tick);
};

export const start = () => {
  requestAnimationFrameId = window.requestAnimationFrame(tick);
};
export const stop = () => window.cancelAnimationFrame(requestAnimationFrameId);

export const addListener = (xCondition, yCondition, callback) => {
  const id = Date.now();

  activeListeners.push({
    id,
    xCondition,
    yCondition,
    callback: () => {
      if (xCondition && xCondition(getCoords().x)) {
        callback(getCoords(), getDirection());
      }

      if (yCondition && yCondition(getCoords().y)) {
        callback(getCoords(), getDirection());
      }
    },
  });

  return () => {
    activeListeners.splice(activeListeners.map(_listener => _listener.id).indexOf(id), 1);
  };
};