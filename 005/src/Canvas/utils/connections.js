import { DEFAULT_SHAPE, MARGIN, TEXT_DEFAULTS } from '../constants';
import { getShapeData } from './shapes';

export const drawConnections = ({ ctx, shapes = [], connections = [] }) => {
  if (!ctx) return;

  connections.map(connection => drawConnection({ ctx, shapes, connection }));
}

const drawConnection = ({ ctx, shapes = [], connection }) => {
  try {
    const {
      from: fromShapeIndex,
      to: toShapeIndex,
      fromTop = false,
      fromBottom = false,
      fromLeft = false,
      fromRight = false,
      toTop = false,
      toBottom = false,
      toLeft = false,
      toRight = false,
      color = 'black',
      width: lineWidth = 1,
      isStraightLine = false,
      isDashed = false,
      withArrow = true,
      ...rest
    } = connection;

    const fromShape = { ...DEFAULT_SHAPE, ...shapes[fromShapeIndex] };
    const toShape = { ...DEFAULT_SHAPE, ...shapes[toShapeIndex] };

    let lineStartX = fromShape.x;
    let lineStartY = fromShape.y;
    let lineEndX = toShape.x;
    let lineEndY = toShape.y;

    if (fromRight) {
      lineStartX += fromShape.w;
    } else if (!fromLeft) {
      lineStartX += fromShape.w / 2;
    }

    if (fromBottom) {
      lineStartY += fromShape.h;
    } else if (!fromTop) {
      lineStartY += fromShape.h / 2;
    }

    if (toRight) {
      lineEndX += toShape.w;
    } else if (!toLeft) {
      lineEndX += toShape.w / 2;
    }

    if (toBottom) {
      lineEndY += toShape.h;
    } else if (!toTop) {
      lineEndY += toShape.h / 2;
    }

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;

    const data = {
      ...TEXT_DEFAULTS,
      ...rest,
      lineStartX,
      lineStartY,
      lineEndX,
      lineEndY,
      fromTop,
      fromBottom,
      fromLeft,
      fromRight,
      toTop,
      toBottom,
      toLeft,
      toRight,
      color,
      fromShapeBounds: getShapeData(fromShape),
      toShapeBounds: getShapeData(toShape),
      lineBetweenX: (lineStartX + lineEndX) * 0.5,
      lineBetweenY: (lineStartY + lineEndY) * 0.5,
    }

    if (isDashed) {
      ctx.setLineDash([20, 5]);
    } else {
      ctx.setLineDash([]);
    }

    let currentXY = [lineStartX, lineStartY];

    if (!isStraightLine) {
      // "pivot" may not be the right word:
      currentXY = createPivotLinePath(ctx, data);
    }

    // Draw the final line to the end:
    drawLine(ctx, currentXY, [lineEndX, lineEndY], withArrow);

    drawTextIfNeeded(ctx, data);

  } catch(e) {
    console.warn("Error drawing connection:", e);
  }
}

// TODO This does NOT currently factor in "pivots" when calculating
// where to actually put the text:
const drawTextIfNeeded = (ctx, data) => {
  const {
    text,
    textSize,
    textColor,
    color,
    lineStartX,
    lineStartY,
    lineEndX,
    lineEndY,
    textXPercent,
    textYPercent
  } = data;

  if (text) {
    const textX = (lineStartX + lineEndX) * textXPercent;
    const textY = (lineStartY + lineEndY) * textYPercent;

    ctx.font = `${textSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillStyle = textColor || color;
    ctx.fillText(text, textX, textY);
  }
}

const createPivotLinePath = (ctx, data) => {
  const {
    lineStartX,
    lineStartY,
    // lineEndX,
    lineEndY,
    fromTop,
    fromBottom,
    // fromLeft,
    // fromRight,
    toTop,
    toBottom,
    toLeft,
    toRight,
    fromShapeBounds,
    toShapeBounds,
  } = data;

  let currentXY = [lineStartX, lineStartY];

  if (fromTop && toTop) {
    currentXY = goSlightyAboveHigher(ctx, currentXY, data);
    currentXY = goTowardsEndX(ctx, currentXY, data);
  }

  else if (fromTop && toBottom) {
    if (isCloseToOrBelow(fromShapeBounds.top, toShapeBounds.bottom)) {
      currentXY = goSlightlyUp(ctx, currentXY, data);
      currentXY = goBetweenStartEndX(ctx, currentXY, data);
      currentXY = goSlightyBelowEndY(ctx, currentXY, data);
      currentXY = goSlightlyBelowEnd(ctx, currentXY, data);
    } else {
      currentXY = goBetweenStartEndY(ctx, currentXY, data);
      currentXY = goTowardsEndX(ctx, currentXY, data);
    }
  }

  else if (fromTop && toLeft) {
    const isLeft = isCloseToOrLeft(lineStartX, toShapeBounds.left);
    const isBelow = isCloseToOrBelow(lineStartY, lineEndY);

    if (isBelow && !isLeft) {
      currentXY = goSlightlyUp(ctx, currentXY, data);
      currentXY = goBetweenStartEndX(ctx, currentXY, data);
      currentXY = goTowardsEndY(ctx, currentXY, data)
    } else if (isBelow || isLeft) {
      currentXY = goSlightyAboveHigher(ctx, currentXY, data);
      currentXY = goSlightlyBeyondMoreLeft(ctx, currentXY, data);
      currentXY = goTowardsEndY(ctx, currentXY, data)
    } else {
      currentXY = goTowardsEndY(ctx, currentXY, data);
    }
  }

  else if (fromTop && toRight) {
    // TODO
  }

  else if (fromBottom && toBottom) {
    currentXY = goSlightyBelowLower(ctx, currentXY, data);
    currentXY = goSlightlyBelowEnd(ctx, currentXY, data);
  }

  else if (fromBottom && toTop) {
    if (isCloseToOrBelow(fromShapeBounds.bottom, toShapeBounds.top)) {
      currentXY = goBetweenStartEndY(ctx, currentXY, data);
      currentXY = goTowardsEndX(ctx, currentXY, data);
    } else {
      currentXY = goSlightlyDown(ctx, currentXY, data);
      currentXY = goBetweenStartEndX(ctx, currentXY, data);
      currentXY = goSlightyAboveEndY(ctx, currentXY, data);
      currentXY = goTowardsEndX(ctx, currentXY, data);
    }
  }

  else if (fromBottom && toLeft) {
    // TODO
  }

  else if (fromBottom && toRight) {
    // TODO
  }

  else {
    currentXY = goTowardsEndY(ctx, currentXY, data);
  }

  return currentXY;
}

// "Actions":
const goSlightlyUp = (ctx, [x, y]) => {
  return drawLine(ctx, [x, y], [x, y - MARGIN]);
}

const goSlightlyDown = (ctx, [x, y]) => {
  return drawLine(ctx, [x, y], [x, y + MARGIN]);
}

/*
const goAlmostToEndX = (
  ctx,
  [x, y],
  { fromShapeBounds, toShapeBounds },
) => {
  const newX = isCloseToOrLeft(fromShapeBounds.centerX, toShapeBounds.centerX)
    ? toShapeBounds.right + MARGIN
    : toShapeBounds.left - MARGIN;

  return drawLine(ctx, [x, y], [newX, y]);
}

const goSlightlyBeyondEndX = (
  ctx,
  [x, y],
  { fromShapeBounds, toShapeBounds },
) => {
  const newX = isCloseToOrLeft(fromShapeBounds.centerX, toShapeBounds.centerX)
    ? toShapeBounds.left - MARGIN
    : toShapeBounds.right + MARGIN;

  return drawLine(ctx, [x, y] , [newX, y]);
}
*/

const goSlightlyBeyondMoreLeft = (
  ctx,
  [x, y],
  { fromShapeBounds, toShapeBounds },
) => {
  const newX = Math.min(fromShapeBounds.left, toShapeBounds.left) - MARGIN;

  return drawLine(ctx, [x, y], [newX, y]);
}

const goBetweenStartEndX = (ctx, [x, y], { lineBetweenX }) => {
  return drawLine(ctx, [x, y], [lineBetweenX, y])
}

const goBetweenStartEndY = (ctx, [x, y], { lineBetweenY }) => {
  return drawLine(ctx, [x, y], [x, lineBetweenY])
}

const goSlightyBelowEndY = (ctx, [x, y], { lineEndY }) => {
  return drawLine(ctx, [x, y], [x, lineEndY + MARGIN]);
}

const goSlightyAboveEndY = (ctx, [x, y], { lineEndY }) => {
  return drawLine(ctx, [x, y], [x, lineEndY - MARGIN]);
}

const goSlightlyBelowEnd = (ctx, [x, y], { lineEndX },) => {
  return drawLine(ctx, [x, y], [lineEndX, y]);
}

const goSlightyAboveHigher = (ctx, [x, y], { fromShapeBounds, toShapeBounds }) => {
  return drawLine(ctx, [x, y], [x, getHigher(fromShapeBounds.top, toShapeBounds.top) - MARGIN]);
}

const goSlightyBelowLower = (ctx, [x, y], { fromShapeBounds, toShapeBounds }) => {
  return drawLine(ctx, [x, y], [x, getLower(fromShapeBounds.bottom, toShapeBounds.bottom) + MARGIN]);
}

const goTowardsEndX = (ctx, [x, y], { lineEndX }) => {
  return drawLine(ctx, [x, y], [lineEndX, y]);
}

const goTowardsEndY = (ctx, [x, y], { lineEndY }) => {
  return drawLine(ctx, [x, y], [x, lineEndY]);
}

// Other helpers:
const drawLine = (ctx, from, to, withArrow = false, radius = 10) => {
  const [fromX, fromY] = from;
  let [toX = null, toY = null] = to;

  if (toX === null) toX = fromX;
  if (toY === null) toY = fromY;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  if (withArrow) {
    let angle = Math.atan2(toY - fromY, toX - fromX)
    toX -= radius * Math.cos(angle); toY -= radius * Math.sin(angle);

    ctx.moveTo(
      radius * Math.cos(angle) + toX,
      radius * Math.sin(angle) + toY
    );

    angle += (1.0/3.0) * (2 * Math.PI);

    ctx.lineTo(
      radius * Math.cos(angle) + toX,
      radius * Math.sin(angle) + toY
    );

    angle += (1.0/3.0) * (2 * Math.PI);

    ctx.lineTo(
      radius * Math.cos(angle) + toX,
      radius * Math.sin(angle) + toY
    );

    ctx.fill();
  }

  ctx.closePath();

  return [toX, toY];
}

const getHigher = (a, b) => a < b ? a : b;

const getLower = (a, b) => a > b ? a : b;

const isCloseTo = (a, b, deviation = 0) =>
  Math.floor(Math.abs(a - b)) <= deviation;
  // Math.floor(a - b) <= deviation;

const isCloseToOrAbove = (from, to, deviation = 0) => {
  if (to > from) return false;

  return from > to || isCloseTo(from, to, deviation);
}

const isCloseToOrBelow = (from, to, deviation = 0) => {
  if (to < from) return false;

  return from < to || isCloseTo(from, to, deviation);
}

const isCloseToOrLeft = (...args) => isCloseToOrAbove(...args);

// const isCloseToOrRight = (...args) => isCloseToOrBelow(...args);
