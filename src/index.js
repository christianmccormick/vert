import DIRECTIONS from './directions';
import { start, stop } from './core';
import { animate } from './animate';
import { getCoords } from './coords';
import { getDirection } from './direction';
import listeners from './listeners';

export {
  DIRECTIONS,
  start,
  stop,
  animate,
};

export { getCoords as coords };
export { getDirection as direction };

export const { x, y, xy } = listeners;
