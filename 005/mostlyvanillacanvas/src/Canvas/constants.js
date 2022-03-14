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
  type: SHAPE_TYPE.rectangle,
  x: 0,
  y: 0,
  w: DEFAULT_SHAPE_W,
  h: DEFAULT_SHAPE_H,
  fillColor: DEFAULT_SHAPE_FILL,
  lineColor: DEFAULT_SHAPE_LINECOLOR,
  lineWidth: DEFAULT_SHAPE_LINEWIDTH,
  ...TEXT_DEFAULTS
};

export const DEFAULT_SHAPESx = [
  { x: 400, y: 320, w: 100, h: 50, fillColor: 'darkgreen', text: 'a' },
  { x: 100, y: 120, w: 200, h: 100, debugDrawOutline: true, text: "TEST", textYPercent: 1.2, type: SHAPE_TYPE.boundary },
  { x: 800, y: 517, w: 30, h: 75, fillColor: '#E75480' },
];

export const DEFAULT_CONNECTIONSx = [
  {
    fromShape: 0,
    toShape: 2,
    color: 'red',
    width: 5,
    endPercent: 0.75,

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
    fromShape: 0,
    toShape: 1,
    color: 'blue',
    width: 3,
    isStraightLine: true,

    fromLeft: true,
    toBottom: true,
    // endPercent: 1,
  },
];

export const DEFAULT_SHAPES = [
  { x: 50, y: 50, w: 100, h: 200, text: "User", textYPercent: 1.1, type: SHAPE_TYPE.human },

  { x: 400, y: 100, w: 200, h: 100, text: "Wallet", type: SHAPE_TYPE.rectangleRounded, fillColor: '#FFAF28', lineWidth: 0 },
  { x: 750, y: 100, w: 200, h: 100, text: "Backend", type: SHAPE_TYPE.rectangleRounded, fillColor: '#FFAF28', lineWidth: 0 },

  { x: 475, y: 300, w: 50, h: 575, type: SHAPE_TYPE.rectangleRounded, fillColor: '#CED4DB', lineWidth: 0 },
  { x: 825, y: 300, w: 50, h: 575, type: SHAPE_TYPE.rectangleRounded, fillColor: '#CED4DB', lineWidth: 0 },
]

export const DEFAULT_CONNECTIONS = [
  // Wallets to boxes:
  { fromShape: 1, toShape: 3, fromBottom: true, toTop: true, isDashed: true },
  { fromShape: 2, toShape: 4, fromBottom: true, toTop: true, isDashed: true },

  // User to bottom:
  { fromShape: 0, toCoords: [100, 900], toTop: true, isDashed: true, withArrow: false },

  // Boxes to bottom:
  { fromShape: 3, toCoords: [500, 900], fromBottom: true, toTop: true, isDashed: true, withArrow: false },
  { fromShape: 4, toCoords: [850, 900], fromBottom: true, toTop: true, isDashed: true, withArrow: false },

  // For the rest, refer to the "text":
  { fromCoords: [100, 350], toShape: 3, toLeft: true, endPercent: 0.1, text: 'connect wallet', textYPercent: 0.53, },
  { fromShape: 3, toCoords: [100, 400], fromLeft: true, startPercent: 0.175, isDashed: true },

  { fromCoords: [100, 480], toShape: 4, endPercent: 0.3, toLeft: true, text: 'get nonce', textYPercent: 0.52, textXPercent: 0.7 },
  { fromShape: 4, toCoords: [100, 530], fromLeft: true, startPercent: 0.4, text: 'nonce', isDashed: true, textYPercent: 0.52, textXPercent: 0.7 },

  { fromCoords: [100, 630], toShape: 3, toLeft: true, endPercent: 0.575, text: 'sign message', textYPercent: 0.52 },
  { fromShape: 3, toCoords: [100, 680], fromLeft: true, startPercent: 0.66, isDashed: true, text: 'signature', textYPercent: 0.52 },

  { fromCoords: [100, 780], toShape: 4, toLeft: true, endPercent: 0.835, text: 'verify message', textYPercent: 0.52, textXPercent: 0.7 },
  { fromShape: 4, toCoords: [100, 830], fromLeft: true, startPercent: 0.923, isDashed: true, text: 'access token', textXPercent: 0.7, textYPercent: 0.52 },
];
