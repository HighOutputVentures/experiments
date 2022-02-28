import {
  DEFAULT_SHAPE,
  SHAPE_TYPE,
  DEFAULT_SHAPE_FILL,
  DEFAULT_SHAPE_LINECOLOR,
  DEFAULT_SHAPE_LINEWIDTH,
  SHAPE_TOP_HEADER_MIN_H,
} from '../constants';

export const drawShapes = ({ ctx, shapes = [] }) => {
  if (!ctx) return;

  shapes.forEach(({
    type = SHAPE_TYPE.rectangle,
    fillColor = DEFAULT_SHAPE_FILL,
    lineColor = DEFAULT_SHAPE_LINECOLOR,
    lineWidth = DEFAULT_SHAPE_LINEWIDTH,
    debugDrawOutline = false,
    ...rest
  }) => {
    const data = getShapeBounds(rest);

    if (debugDrawOutline) drawDebugOutline(ctx, data);

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    switch (type) {
      case SHAPE_TYPE.human: drawHuman(ctx, data); break;
      case SHAPE_TYPE.rectangleRounded: drawRectangleRounded(ctx, data); break;
      case SHAPE_TYPE.rectangleProcess: drawRectangleProcess(ctx, data); break;
      case SHAPE_TYPE.ellipse: drawEllipse(ctx, data); break;
      case SHAPE_TYPE.triangle: drawTriangle(ctx, data); break;
      case SHAPE_TYPE.diamond: drawDiamond(ctx, data); break;
      case SHAPE_TYPE.parallelogram: drawParallelogram(ctx, data); break;
      case SHAPE_TYPE.hexagon: drawHexagon(ctx, data); break;
      case SHAPE_TYPE.cylinder: drawCylinder(ctx, data); break;
      case SHAPE_TYPE.x: drawX(ctx, data); break;
      case SHAPE_TYPE.note: drawNote(ctx, data); break;
      case SHAPE_TYPE.package: drawPackage(ctx, data); break;
      case SHAPE_TYPE.entity: drawEntity(ctx, data); break;
      case SHAPE_TYPE.boundary: drawBoundary(ctx, data); break;
      default: drawRectangle(ctx, data); break;
    }
  });
}

const drawRectangle = (ctx, data) => {
  const { left, top, w, h } = data;

  ctx.beginPath();

  ctx.rect(left, top, w, h);

  ctx.fill();
  ctx.stroke();
}

const drawDebugOutline = (ctx, data) => {
  const { left, top, w, h } = data;

  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 4;
  ctx.setLineDash([5, 3]);

  ctx.beginPath();

  ctx.strokeRect(left, top, w, h);

  ctx.setLineDash([]);
}

const drawRectangleRounded = (ctx, data) => {
  const { w, top, bottom, left, right } = data;
  const radius = w * 0.2;

  ctx.beginPath();

  ctx.moveTo(left, top + radius);
  ctx.arcTo(left, bottom, left + radius, bottom, radius);
  ctx.arcTo(right, bottom, right, bottom - radius, radius);
  ctx.arcTo(right, top, right - radius, top, radius);
  ctx.arcTo(left, top, left, top + radius, radius);

  ctx.fill();
  ctx.stroke();
}

const drawRectangleProcess = (ctx, data) => {
  drawRectangle(ctx, data);
  ctx.beginPath();

  const { top, bottom } = data;
  const left = data.left + data.w * 0.2;
  const right = data.right - data.w * 0.2;

  ctx.moveTo(left, top);
  ctx.lineTo(left, bottom);
  ctx.moveTo(right, top);
  ctx.lineTo(right, bottom);

  ctx.stroke();
}

const drawEllipse = (ctx, data) => {
  const { w, h, centerX, centerY, } = data;

  ctx.beginPath();

  ctx.ellipse(centerX, centerY, (w * 0.5), (h * 0.5), 0, 0, Math.PI * 2);

  ctx.fill();
  ctx.stroke();
}

const drawTriangle = (ctx, data) => {
  const { left, right, top, bottom, centerY } = data;

  ctx.beginPath();

  ctx.moveTo(right, centerY);
  ctx.lineTo(left, top);
  ctx.lineTo(left, bottom);
  ctx.lineTo(right, centerY);

  ctx.fill();
  ctx.stroke();
}

const drawDiamond = (ctx, data) => {
  const { left, right, top, bottom, centerX, centerY } = data;

  ctx.beginPath();

  ctx.moveTo(centerX, top);
  ctx.lineTo(right, centerY);
  ctx.lineTo(centerX, bottom);
  ctx.lineTo(left, centerY);
  ctx.lineTo(centerX, top);

  ctx.fill();
  ctx.stroke();
}

const drawHexagon = (ctx, data) => {
  const { left, right, top, bottom, centerY, w } = data;
  const almostLeft = left + (w * 0.2);
  const almostRight = right - (w * 0.2);

  ctx.beginPath();

  ctx.moveTo(almostLeft, top);
  ctx.lineTo(almostRight, top);
  ctx.lineTo(right, centerY);
  ctx.lineTo(almostRight, bottom);
  ctx.lineTo(almostLeft, bottom);
  ctx.lineTo(left, centerY);
  ctx.lineTo(almostLeft, top);

  ctx.fill();
  ctx.stroke();
}

const drawParallelogram = (ctx, data) => {
  const { left, right, top, bottom, w } = data;
  const almostLeft = left + (w * 0.2);
  const almostRight = right - (w * 0.2);

  ctx.beginPath();

  ctx.moveTo(almostLeft, top);
  ctx.lineTo(right, top);
  ctx.lineTo(almostRight, bottom);
  ctx.lineTo(left, bottom);
  ctx.lineTo(almostLeft, top);

  ctx.fill();
  ctx.stroke();
}

// TODO Bottom curve is not "smooth":
const drawCylinder = (ctx, data) => {
  const { left, right, top, bottom, centerX, w, h } = data;
  const almostTop = top + (h * 0.2);
  const almostBottom = bottom - (h * 0.2);

  ctx.beginPath();

  // Main part of cylinder:
  ctx.moveTo(left, almostTop);
  ctx.lineTo(left, almostBottom);
  ctx.quadraticCurveTo(centerX, bottom, right, almostBottom);
  ctx.lineTo(right, almostBottom);
  ctx.lineTo(right, almostTop);
  ctx.fill();

  ctx.ellipse(centerX, almostTop, (w * 0.5), (h * 0.1), 0, 0, Math.PI * 2);

  ctx.fill();
  ctx.stroke();
}

const drawX = (ctx, data) => {
  const { left, right, top, bottom, h, w } = data;

  const almostTop = top + (h * 0.1);
  const almostBottom = bottom - (h * 0.1);
  const almostLeft = left + (w * 0.1);
  const almostRight = right - (w * 0.1);

  ctx.beginPath();

  ctx.moveTo(almostLeft, almostTop);
  ctx.lineTo(almostRight, almostBottom);

  ctx.moveTo(almostRight, almostTop);
  ctx.lineTo(almostLeft, almostBottom);

  ctx.stroke();
}

const drawNote = (ctx, data) => {
  const { left, right, top, bottom, h, w } = data;

  const smallerGap = Math.min(w, h) * 0.2;
  const almostRight = right - smallerGap;
  const almostTop = top + smallerGap;

  ctx.beginPath();

  // Main rectangle:
  ctx.moveTo(left, top);
  ctx.lineTo(almostRight, top);
  ctx.lineTo(right, almostTop);
  ctx.lineTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.lineTo(left, top);

  ctx.fill();
  ctx.stroke();

  // Folded corner:
  ctx.lineTo(almostRight, top);
  ctx.lineTo(almostRight, almostTop);
  ctx.lineTo(right, almostTop);

  ctx.stroke();
}

const drawPackage = (ctx, data) => {
  const { w, h, top, bottom, left, right, centerX } = data;

  const radius = w * 0.05;
  const almostTop = top + Math.min(Math.max(SHAPE_TOP_HEADER_MIN_H, h * 0.1), h * 0.3);
  const pastCenterX1 = centerX + (w * 0.1);
  const pastCenterX2 = pastCenterX1 + (w * 0.05);
  const pastCenterX3 = pastCenterX2 + (w * 0.05);

  ctx.beginPath();

  // Main rectangle:
  ctx.moveTo(left, almostTop);
  ctx.arcTo(left, bottom, left + radius, bottom, radius);
  ctx.arcTo(right, bottom, right, bottom - radius, radius);
  ctx.arcTo(right, almostTop, right - radius, almostTop, radius);
  ctx.lineTo(left, almostTop);

  // Header at top:
  ctx.arcTo(left, top, left + radius, top, radius);
  ctx.lineTo(pastCenterX1, top);
  ctx.quadraticCurveTo(pastCenterX2, top, pastCenterX3, almostTop);

  ctx.fill();
  ctx.stroke();
}

const drawEntity = (ctx, data) => {
  const { left, right, bottom } = data;

  ctx.beginPath();

  ctx.moveTo(left, bottom);
  ctx.lineTo(right, bottom);

  ctx.fill();
  ctx.stroke();

  drawEllipse(ctx, data);
}

const drawBoundary = (ctx, data) => {
  const { top, bottom, left, centerY, w } = data;
  const almostLeft = left + (w * 0.1);

  ctx.beginPath();

  ctx.moveTo(left, top);
  ctx.lineTo(left, bottom);

  ctx.moveTo(left, centerY);
  ctx.lineTo(almostLeft, centerY);

  ctx.fill();
  ctx.stroke();

  // TODO Maybe another func just for resizing "data":
  drawEllipse(ctx, getShapeBounds({
    ...data,
    w: w - (w * 0.1),
    x: left + (w * 0.1),
  }));
}

const drawHuman = (ctx, data) => {
  const {
    w,
    h,
    top,
    bottom,
    left,
    right,
    centerX,
  } = data;

  const radius = Math.min(w, h) * 0.2;
  const headCenterY = top + radius;
  const headBottom = headCenterY + radius;
  const armStartY = top + (h * 0.5);
  const armEndY = armStartY + (h * 0.1);
  const crotchY = top + (h * 0.75);

  // body:
  ctx.beginPath();
  ctx.moveTo(centerX, headBottom);
  ctx.lineTo(centerX, crotchY);
  ctx.stroke();

  // arms:
  ctx.beginPath();
  ctx.moveTo(centerX, armStartY);
  ctx.lineTo(left, armEndY);
  ctx.moveTo(centerX, armStartY);
  ctx.lineTo(right, armEndY);
  ctx.stroke();

  // legs:
  ctx.beginPath();
  ctx.moveTo(centerX, crotchY);
  ctx.lineTo(left, bottom);
  ctx.moveTo(centerX, crotchY);
  ctx.lineTo(right, bottom);
  ctx.stroke();

  // head:
  ctx.beginPath();
  ctx.arc(centerX, headCenterY, radius, 0, Math.PI * 2);
  ctx.fill();
}

export const getShapeBounds = (rawShape) => {
  const shape = { ...DEFAULT_SHAPE, ...rawShape };

  return {
    ...shape,
    top: shape.y,
    bottom: shape.y + shape.h,
    left: shape.x,
    right: shape.x + shape.w,
    centerX: shape.x + (shape.w / 2),
    centerY: shape.y + (shape.h / 2),
  }
}
