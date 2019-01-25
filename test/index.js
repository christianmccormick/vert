import chai from 'chai';

import {
  DIRECTIONS,
  coords,
  direction,
  start,
  stop,
  animate,
  x,
  y,
  xy,
} from '../src';

const { expect } = chai;

describe('DIRECTIONS', () => {
  it('should be an object with LEFT, RIGHT, UP, and DOWN defined', () => {
    expect(DIRECTIONS.LEFT).to.eq('LEFT');
    expect(DIRECTIONS.RIGHT).to.eq('RIGHT');
    expect(DIRECTIONS.UP).to.eq('UP');
    expect(DIRECTIONS.DOWN).to.eq('DOWN');
  });
});

describe('coords', () => {
  it('should return an object with x and y properties defaulting to 0', () => {
    expect(coords().x).to.eq(0);
    expect(coords().y).to.eq(0);
  });
});

describe('direction', () => {
  it('should return a value with a default of DIRECTION.DOWN', () => {
    expect(direction()).to.eq(DIRECTIONS.DOWN);
  });
});

describe('start', () => {
  it('should be a function', () => {
    expect(start).to.be.a.instanceOf(Function);
  });
});

describe('stop', () => {
  it('should be a function', () => {
    expect(stop).to.be.a.instanceOf(Function);
  });
});

describe('animate', () => {
  it('should be an object with x and y methods', () => {
    expect(animate.x).to.be.a.instanceOf(Function);
    expect(animate.y).to.be.a.instanceOf(Function);
  });
});

describe('x', () => {
  it('should be an object with any, lt, eq, gt, between, and custom methods', () => {
    expect(x.any).to.be.instanceOf(Function);
    expect(x.lt).to.be.instanceOf(Function);
    expect(x.eq).to.be.instanceOf(Function);
    expect(x.gt).to.be.instanceOf(Function);
    expect(x.between).to.be.instanceOf(Function);
    expect(x.custom).to.be.instanceOf(Function);
  });
});

describe('y', () => {
  it('should be an object with any, lt, eq, gt, between, and custom methods', () => {
    expect(y.any).to.be.instanceOf(Function);
    expect(y.lt).to.be.instanceOf(Function);
    expect(y.eq).to.be.instanceOf(Function);
    expect(y.gt).to.be.instanceOf(Function);
    expect(y.between).to.be.instanceOf(Function);
    expect(y.custom).to.be.instanceOf(Function);
  });
});


describe('xy', () => {
  it('should be an object with any and custom methods', () => {
    expect(xy.any).to.be.instanceOf(Function);
    expect(xy.custom).to.be.instanceOf(Function);
  });
});
