export const any = () => true;

export const lt = value => coord => coord < value;

export const eq = (value) => {
  let fired = false;
  return (coord) => {
    if (fired) {
      if (coord <= value) {
        fired = false;
        return true;
      }
      return false;
    }

    if (coord >= value) {
      fired = true;
      return fired;
    }

    return false;
  };
};

export const gt = value => coord => coord > value;

export const between = (value1, value2) => coord => coord > value1 && coord < value2;
