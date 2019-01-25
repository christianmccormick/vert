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
      const xConditionValid = xCondition && xCondition(getCoords().x);
      const yConditionValid = yCondition && yCondition(getCoords().y);

      // xy listeners
      if (xCondition && yCondition) {
        if (xConditionValid && yConditionValid) {
          callback(getCoords(), getDirection());
          // Prevent calling multiple callbacks for each valid condition
          return;
        }

        /**
         * Since this may be a custom xy listener with a condition for each axis,
         * check the scroll direction first. This ensures that scrolling on the x axis
         * will not trigger the y callback if it is false.
         */
        if (getDirection() === DIRECTIONS.LEFT || getDirection() === DIRECTIONS.RIGHT) {
          if (xConditionValid) {
            callback(getCoords(), getDirection());
          }
        }

        // Likewise, do the same check for the y axis
        if (getDirection() === DIRECTIONS.UP || getDirection() === DIRECTIONS.DOWN) {
          if (yConditionValid) {
            callback(getCoords(), getDirection());
          }
        }

        // Prevent further callbacks from being fired
        return;
      }

      if (xConditionValid) {
        callback(getCoords(), getDirection());
      }

      if (yConditionValid) {
        callback(getCoords(), getDirection());
      }
    },
  });

  return () => {
    activeListeners.splice(activeListeners.map(_listener => _listener.id).indexOf(id), 1);
  };
};
