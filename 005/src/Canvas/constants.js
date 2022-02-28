export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;

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
export const DEFAULT_SHAPE_FILL = 'white';
export const DEFAULT_SHAPE_LINECOLOR = 'black';
export const DEFAULT_SHAPE_LINEWIDTH = 4;
export const SHAPE_TOP_HEADER_MIN_H = 16;

export const DEFAULT_SHAPE = {
  type: SHAPE_TYPE.box,
  x: 0,
  y: 0,
  w: DEFAULT_SHAPE_W,
  h: DEFAULT_SHAPE_H,
  fillColor: DEFAULT_SHAPE_FILL,
  lineColor: DEFAULT_SHAPE_LINECOLOR,
  lineWidth: DEFAULT_SHAPE_LINEWIDTH,
};

export const DEFAULT_SHAPEES = [
  { x: 200, y: 320, w: 100, h: 50, fillColor: 'darkgreen' },
  { x: 100, y: 120, w: 200, h: 100, debugDrawOutline: true, type: SHAPE_TYPE.boundary },
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
