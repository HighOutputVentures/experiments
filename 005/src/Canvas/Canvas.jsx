import React, { useRef, useState, useEffect } from 'react';
import immutableUpdate from 'immutability-helper';

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DEFAULT_SHAPE,
  SHAPE_TYPE,
  DEFAULT_SHAPE_W,
  DEFAULT_SHAPE_H,
  DEFAULT_SHAPES,
  DEFAULT_CONNECTIONS,
} from './constants';
import { clearScreen } from './utils/screen';
import { drawShapes } from './utils/shapes';
import { drawConnections } from './utils/connections';
import { getMouseXY, getDragTargetIndexAndShapeOffsets } from './utils/mouse';

export const Canvas = () => {
  const canvas = useRef();

  const [ctx, setCtx] = useState(null);
  const [shapes, setShapes] = useState(DEFAULT_SHAPES);
  const [connections] = useState(DEFAULT_CONNECTIONS);
  const [dragTargetIndex, setDragTargetIndex] = useState(-1);
  const [dragTargetXOffset, setDragTargetXOffset] = useState(0);
  const [dragTargetYOffset, setDragTargetYOffset] = useState(0);

  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    setCtx(canvasEle.getContext("2d"));
  }, []);

  useEffect(() => {
    clearScreen({ ctx, canvas });
    // TODO Switch these two later,
    // having them like this for now for easier debugging:
    drawShapes({ ctx, shapes });
    drawConnections({ ctx, shapes, connections });
  }, [shapes, connections, ctx]);

  const addShape = (data = {}) => {
    console.log(typeof data);
    if (typeof data === 'string') {
      setShapes([...shapes, { ...DEFAULT_SHAPE, type: data }]);
    } else {
      setShapes([...shapes, { ...DEFAULT_SHAPE, ...data }]);
    }
  }

  const handleMouseDown = event => {
    const [dragTargetIndex, shapeXOffset, shapeYOffset] = getDragTargetIndexAndShapeOffsets({ event, canvas, shapes });

    if (dragTargetIndex >= 0) {
      setDragTargetXOffset(shapeXOffset);
      setDragTargetYOffset(shapeYOffset);
      setDragTargetIndex(dragTargetIndex);
    }
  }

  const handleMouseUp = e => {
    setDragTargetIndex(-1);
  }

  const handleMouseMove = event => {
    if (dragTargetIndex < 0) return;

    const [x, y] = getMouseXY({ event, canvas });
    const {
      w: shapeW = DEFAULT_SHAPE_W,
      h: shapeH = DEFAULT_SHAPE_H,
    } = shapes[dragTargetIndex];

    const newShapeX = Math.min(
      canvas.current.clientLeft + canvas.current.clientWidth - shapeW,
      Math.max(canvas.current.clientLeft, x - dragTargetXOffset)
    );

    const newShapeY = Math.min(
      canvas.current.clientTop + canvas.current.clientHeight - shapeH,
      Math.max(canvas.current.clientTop, y - dragTargetYOffset)
    );

    const newShapes = immutableUpdate(shapes, {
      [dragTargetIndex]: {
        x: { $set: newShapeX },
        y: { $set: newShapeY },
      },
    });

    setShapes(newShapes);
  }

  return (
    <div style={{ display: 'flex' }}>
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvas}
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
        padding: 16,
      }}>
        <button onClick={() => addShape()}>Rectangle</button>
        <button onClick={() => addShape(SHAPE_TYPE.human)}>User</button>
        <button onClick={() => addShape(SHAPE_TYPE.rectangleRounded)}>Rounded Rectangle</button>
        <button onClick={() => addShape(SHAPE_TYPE.rectangleProcess)}>Process</button>
        <button onClick={() => addShape(SHAPE_TYPE.ellipse)}>Ellipse</button>
        <button onClick={() => addShape(SHAPE_TYPE.triangle)}>Triangle</button>
        <button onClick={() => addShape(SHAPE_TYPE.diamond)}>Diamond</button>
        <button onClick={() => addShape(SHAPE_TYPE.parallelogram)}>Parallelogram</button>
        <button onClick={() => addShape(SHAPE_TYPE.hexagon)}>Hexagon</button>
        <button onClick={() => addShape(SHAPE_TYPE.cylinder)}>Cylinder</button>
        <button onClick={() => addShape(SHAPE_TYPE.x)}>x</button>
        <button onClick={() => addShape(SHAPE_TYPE.note)}>Note</button>
        <button onClick={() => addShape(SHAPE_TYPE.entity)}>Entity</button>
        <button onClick={() => addShape(SHAPE_TYPE.boundary)}>Boundary</button>
        <button onClick={() => addShape(SHAPE_TYPE.package)}>Package</button>
      </div>
    </div>
  );
}

export default Canvas;
