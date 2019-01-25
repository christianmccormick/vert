import DIRECTIONS from './directions';

let direction = DIRECTIONS.DOWN;

export const setDirection = (newDirection) => {
  direction = newDirection;
};

export const getDirection = () => direction;
