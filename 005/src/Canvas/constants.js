export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 900;

export const MARGIN = 64;

export const SHAPE_TYPE = {
  rectangle: 'RECTANGLE',
  rectangleRounded: 'RECTANGLE_ROUNDED',
  rectangleProcess: 'RECTANGLE_PROCESS',
  ellipse: 'ELLIPSE',
  triangle: 'TRIANGLE',
  diamond: 'DIAMOND',
  parallelogram: 'PARALLELOGRAM',
  hexagon: 'HEXAGON',
  cylinder: 'CYLINDER',
  x: 'X',
  note: 'NOTE',
  package: 'PACKAGE',
  entity: 'ENTITY',
  boundary: 'BOUNDARY',
  human: 'HUMAN',
}

export const DEFAULT_SHAPE_W = 100;
export const DEFAULT_SHAPE_H = 50;
export const DEFAULT_SHAPE_TEXT_XY_PERCENT = 0.5;
export const DEFAULT_SHAPE_TEXT_SIZE = 20;
export const DEFAULT_SHAPE_FILL = 'white';
export const DEFAULT_SHAPE_LINECOLOR = 'black';
export const DEFAULT_SHAPE_LINEWIDTH = 4;
export const SHAPE_TOP_HEADER_MIN_H = 16;

export const TEXT_DEFAULTS = {
  textXPercent: DEFAULT_SHAPE_TEXT_XY_PERCENT,
  textYPercent: DEFAULT_SHAPE_TEXT_XY_PERCENT,
  textColor: undefined, // defaults to "linecolor" (if shape) or "color" (if connection)
  textSize: DEFAULT_SHAPE_TEXT_SIZE,
}

export const DEFAULT_SHAPE = {
  type: SHAPE_TYPE.box,
  x: 0,
  y: 0,
  w: DEFAULT_SHAPE_W,
  h: DEFAULT_SHAPE_H,
  fillColor: DEFAULT_SHAPE_FILL,
  lineColor: DEFAULT_SHAPE_LINECOLOR,
  lineWidth: DEFAULT_SHAPE_LINEWIDTH,
  ...TEXT_DEFAULTS
};

/*
export const DEFAULT_SHAPES = [
  { x: 200, y: 320, w: 100, h: 50, fillColor: 'darkgreen', text: 'a' },
  { x: 100, y: 120, w: 200, h: 100, debugDrawOutline: true, text: "TEST", textYPercent: 1.2, type: SHAPE_TYPE.boundary },
  { x: 400, y: 517, w: 30, h: 75, fillColor: '#E75480' },
];

export const DEFAULT_CONNECTIONS = [
  {
    from: 0,
    to: 2,
    color: 'red',
    width: 5,
    // pivotPoint: 0.75,

    fromTop: true,
    // fromBottom: true,
    // fromLeft: true,
    // fromRight: true,

    // toTop: true,
    // toBottom: true,
    toLeft: true,
    // toRight: true,
    text: 'aaaa',
    isDashed: true,
  },
  {
    from: 0,
    to: 1,
    color: 'blue',
    width: 3,
    isStraightLine: true,

    fromTop: true,
    fromLeft: true,
    toBottom: true,
    toRight: true,
  },
];
*/

export const DEFAULT_SHAPES = [
  /*0*/ { x: 50, y: 50, w: 100, h: 200, text: "User", textYPercent: 1.1, type: SHAPE_TYPE.human },
  { x: 400, y: 100, w: 200, h: 100, text: "Wallet", type: SHAPE_TYPE.rectangleRounded, fillColor: '#FFAF28', lineWidth: 0 },
  { x: 750, y: 100, w: 200, h: 100, text: "Backend", type: SHAPE_TYPE.rectangleRounded, fillColor: '#FFAF28', lineWidth: 0 },

  /*3*/ { x: 475, y: 300, w: 50, h: 575, type: SHAPE_TYPE.rectangleRounded, fillColor: '#CED4DB', lineWidth: 0 },
  { x: 825, y: 300, w: 50, h: 575, type: SHAPE_TYPE.rectangleRounded, fillColor: '#CED4DB', lineWidth: 0 },

  /*5*/ { x: 95, y: 890, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 495, y: 890, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 845, y: 890, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },

  /*8*/ { x: 95, y: 350, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 475, y: 350, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 95, y: 400, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 475, y: 400, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },

  /*12*/ { x: 95, y: 475, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 825, y: 475, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 95, y: 525, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 825, y: 525, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },

  /*16*/ { x: 95, y: 625, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 475, y: 625, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 95, y: 700, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 475, y: 700, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },

  /*20*/ { x: 95, y: 775, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 825, y: 775, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 95, y: 850, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
  { x: 825, y: 850, w: 10, h: 10, type: SHAPE_TYPE.rectangle, fillColor: 'transparent', lineWidth: 0 },
]

export const DEFAULT_CONNECTIONS = [
  { from: 1, to: 3, fromBottom: true, toTop: true, isDashed: true },
  { from: 2, to: 4, fromBottom: true, toTop: true, isDashed: true },

  { from: 0, to: 5, toTop: true, isDashed: true, withArrow: false },
  { from: 3, to: 6, fromBottom: true, toTop: true, isDashed: true, withArrow: false },
  { from: 4, to: 7, fromBottom: true, toTop: true, isDashed: true, withArrow: false },

  { from: 8, to: 9, text: 'connect wallet', textYPercent: 0.53 },
  { from: 11, to: 10, isDashed: true },

  { from: 12, to: 13, text: 'get nonce', textYPercent: 0.52, textXPercent: 0.7 },
  { from: 15, to: 14, text: 'nonce', isDashed: true, textYPercent: 0.52, textXPercent: 0.7 },

  { from: 16, to: 17, text: 'sign message', textYPercent: 0.52 },
  { from: 19, to: 18, text: 'signature', isDashed: true, textYPercent: 0.52 },

  { from: 20, to: 21, text: 'verify message', textYPercent: 0.52, textXPercent: 0.7 },
  { from: 23, to: 22, text: 'access token', isDashed: true, textYPercent: 0.52, textXPercent: 0.7 },
];
