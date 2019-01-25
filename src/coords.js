const currentCoords = {
  x: typeof window !== 'undefined' ? window.pageXOffset : 0,
  y: typeof window !== 'undefined' ? window.pageYOffset : 0,
};

export const setCoords = (x, y) => {
  currentCoords.x = x;
  currentCoords.y = y;
};

export const getCoords = () => currentCoords;
