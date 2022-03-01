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

    ctx.beginPath();
    ctx.moveTo(lineStartX, lineStartY);

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

    if (!isStraightLine) {
      // "pivot" may not be the right word:
      createPivotLinePath(ctx, data);
    }

    // Draw the final line to the end:
    ctx.lineTo(lineEndX, lineEndY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

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

    console.log({ textColor, color });

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

  let currentXY = { currentX: lineStartX, currentY: lineStartY };

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
const goSlightlyUp = (ctx, { currentX, currentY }) => {
  return lineToAndReturnXY(ctx, currentX, currentY - MARGIN);
}

const goSlightlyDown = (ctx, { currentX, currentY }) => {
  return lineToAndReturnXY(ctx, currentX, currentY + MARGIN);
}

/*
const goAlmostToEndX = (
  ctx,
  { currentY },
  { fromShapeBounds, toShapeBounds },
) => {
  const newX = isCloseToOrLeft(fromShapeBounds.centerX, toShapeBounds.centerX)
    ? toShapeBounds.right + MARGIN
    : toShapeBounds.left - MARGIN;

  return lineToAndReturnXY(ctx, newX, currentY);
}

const goSlightlyBeyondEndX = (
  ctx,
  { currentY },
  { fromShapeBounds, toShapeBounds },
) => {
  const newX = isCloseToOrLeft(fromShapeBounds.centerX, toShapeBounds.centerX)
    ? toShapeBounds.left - MARGIN
    : toShapeBounds.right + MARGIN;

  return lineToAndReturnXY(ctx, newX, currentY);
}
*/

const goSlightlyBeyondMoreLeft = (
  ctx,
  { currentY },
  { fromShapeBounds, toShapeBounds },
) => {
  const newX = Math.min(fromShapeBounds.left, toShapeBounds.left) - MARGIN;

  return lineToAndReturnXY(ctx, newX, currentY);
}

const goBetweenStartEndX = (ctx, { currentY }, { lineBetweenX }) => {
  return lineToAndReturnXY(ctx, lineBetweenX, currentY)
}

const goBetweenStartEndY = (ctx, { currentX }, { lineBetweenY }) => {
  return lineToAndReturnXY(ctx, currentX, lineBetweenY)
}

const goSlightyBelowEndY = (ctx, { currentX }, { lineEndY }) => {
  return lineToAndReturnXY(ctx, currentX, lineEndY + MARGIN);
}

const goSlightyAboveEndY = (ctx, { currentX }, { lineEndY }) => {
  return lineToAndReturnXY(ctx, currentX, lineEndY - MARGIN);
}

const goSlightlyBelowEnd = (ctx, { currentY }, { lineEndX },) => {
  return lineToAndReturnXY(ctx, lineEndX, currentY);
}

const goSlightyAboveHigher = (ctx, { currentX }, { fromShapeBounds, toShapeBounds }) => {
  return lineToAndReturnXY(ctx, currentX, getHigher(fromShapeBounds.top, toShapeBounds.top) - MARGIN);
}

const goSlightyBelowLower = (ctx, { currentX }, { fromShapeBounds, toShapeBounds }) => {
  return lineToAndReturnXY(ctx, currentX, getLower(fromShapeBounds.bottom, toShapeBounds.bottom) + MARGIN);
}

const goTowardsEndX = (ctx, { currentY }, { lineEndX }) => {
  return lineToAndReturnXY(ctx, lineEndX, currentY);
}

const goTowardsEndY = (ctx, { currentX }, { lineEndY }) => {
  return lineToAndReturnXY(ctx, currentX, lineEndY);
}

// Other helpers:
const lineToAndReturnXY = (ctx, x, y) => {
  ctx.lineTo(x, y);
  return { currentX: x, currentY: y };
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
