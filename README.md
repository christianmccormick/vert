# vert (beta)

![npm](https://img.shields.io/npm/v/vert.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/vert.svg)

A minimal, super simple browser scroll library with a convenient set of easy-to-use listeners and animate methods. Vert is optimized using requestAnimationFrame and provides the ability to start/stop itself and remove listeners for added performance tuning.

Please note that this library is still in beta and small issues may arise. If you come across any bugs, please create a new issue and describe your problem in detail along with a sample of the code that causes the bug. Thanks and enjoy!

## Install

```
npm install vert --save
```

## Usage

If you are using webpack or another bundler, you can import the entire library at once or import individual methods and objects as needed. If not, you can require `dist/vert.js` and access methods and objects on the `vert` global. The following examples assume you are using the import all/global version of vert.

```
import * as vert from 'vert';

// OR

import { start as startVert } from 'vert';
```

Before setting up any listeners, vert must first be started.

```
vert.start();
```

Now any of the provided listeners can be created. The following is a simple xy listener (listens for scroll events on the x and y axes) that will print the coordinates and scroll direction to the console anytime the user scrolls.

```
vert.xy.any((coords, direction) => {
  console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
});
```

Other listeners include lesser than (lt), equals (eq), greater than (gt), and custom listeners. Documentation for these can be found below.

To speed up performance you can stop vert when you don't need it. Simply run the following to stop listening to scroll events.

```
vert.stop();
```

If you need to start vert back up, you can run `vert.start()` again to do so.

## Documentation

### Coordinates and Scroll Direction

You can use the `vert.coords()` method to obtain the current scroll position at any time. The scroll position will be return as an object with x and y properties.

```
vert.coords(); // => { x: 0, y: 125 }
```

The last scroll direction can be obtained with `vert.direction()`. It will be either `vert.DIRECTIONS.UP`, `vert.DIRECTIONS.DOWN`, `vert.DIRECTIONS.LEFT`, or `vert.DIRECTIONS.RIGHT`.

```
vert.direction(); // => 'LEFT'
```

### Listeners

There are a handful of scroll event listeners available on the x and y axes, and a small subset available for both axes (xy). Each listener will fire a callback providing the current coordinates and scroll direction. The following list will explain how each listener works, and which axes it can be used on.

To cancel an event listener, you must first store its return value to a variable. You can then call it to cancel the listener.

```
var xListener = vert.x.any(() => {});
xListener();
```

#### any

*Axes: x, y and xy*

Fires on any scroll event.

```
// vert.x.any((coords, direction) => {});
// vert.y.any((coords, direction) => {});
// vert.xy.any((coords, direction) => {});

vert.x.any((coords, direction) => {
  console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
});
```

#### lt

*Axes: x and y*

Fires when the scroll position is less than the given value.

```
// vert.x.lt([value], (coords, direction) => {});
// vert.y.lt([value], (coords, direction) => {});

vert.y.lt(500, (coords, direction) => {
  console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
});
```

#### eq

*Axes: x and y*

Fires when the scroll position is equal to the given value. It will fire regardless of scroll direction.

```
// vert.x.eq([value], (coords, direction) => {});
// vert.y.eq([value], (coords, direction) => {});

vert.x.eq(350, (coords, direction) => {
  console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
});
```

#### gt

*Axes: x and y*

Fires when the scroll position is greater than the given value.

```
// vert.x.gt([value], (coords, direction) => {});
// vert.y.gt([value], (coords, direction) => {});

vert.y.gt(755, (coords, direction) => {
  console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
});
```

#### between

*Axes: x and y*

Fires when the scroll position is between the given values.

```
// vert.x.between([value1], [value2], (coords, direction) => {});
// vert.y.between([value1], [value2], (coords, direction) => {});

vert.x.between(200, 800, (coords, direction) => {
  console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
});
```

#### custom

*Axes: x, y, and xy*

Fires when the callbacks provided pass true for their respective axes.

```
// vert.x.between([xCondition], (coords, direction) => {});
// vert.y.between([yCondition], (coords, direction) => {});
// vert.xy.between([xCondition], [yCondition], (coords, direction) => {});

vert.xy.custom(
  x => {
    return x > 100;
  },
  y => {
    return y < 500;
  },
  (coords, direction) => {
    console.log(`x: ${coords.x}, y: ${coords.y}, direction: ${direction}`);
  }
);
```

### Animate

You can animate the browser scroll position to any given coordinate on the x or y axis. Animating on both axes is currently not supported.

```
// vert.animate.x([value]);
// vert.animate.y([value]);

vert.animate.y(1000);
```

## Coming Soon

- [ ] xy animation support
- [ ] Cancellable animations (programmatic and on a new scroll event)
