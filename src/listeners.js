import { addListener } from './core';
import {
  any,
  lt,
  eq,
  gt,
  between,
} from './conditions';

export default {
  x: {
    any: callback => addListener(any, null, callback),
    lt: (value, callback) => addListener(lt(value), null, callback),
    eq: (value, callback) => addListener(eq(value), null, callback),
    gt: (value, callback) => addListener(gt(value), null, callback),
    between: (value1, value2, callback) => addListener(between(value1, value2), null, callback),
    custom: (condition, callback) => addListener(condition, null, callback),
  },
  y: {
    any: callback => addListener(null, any, callback),
    lt: (value, callback) => addListener(null, lt(value), callback),
    eq: (value, callback) => addListener(null, eq(value), callback),
    gt: (value, callback) => addListener(null, gt(value), callback),
    between: (value1, value2, callback) => addListener(null, between(value1, value2), callback),
    custom: (condition, callback) => addListener(null, condition, callback),
  },
  xy: {
    any: callback => addListener(any, any, callback),
    custom: (condition1, condition2, callback) => addListener(condition1, condition2, callback),
  }
};
