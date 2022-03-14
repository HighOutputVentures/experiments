import { DEFAULT_SHAPE_W, DEFAULT_SHAPE_H } from '../constants';

export const getMouseXY = ({ event, canvas }) => {
  if (!event || !canvas) {
    if (!event) console.error(`"event" is false!`);
    if (!canvas) console.error(`"canvas" is false!`);

    return { x: 0, y: 0 }; // just in case
  }

  const x = parseInt(event.nativeEvent.offsetX - canvas.current.clientLeft);
  const y = parseInt(event.nativeEvent.offsetY - canvas.current.clientTop);

  return [x, y];
}

export const getDragTargetIndexAndShapeOffsets = ({ event, canvas, shapes = [] }) => {
  const [mouseX, mouseY] = getMouseXY({ event, canvas });

  for (let i = 0; i < shapes.length; i++) {
    const {
      x: shapeX = 0,
      y: shapeY = 0,
      w: shapeW = DEFAULT_SHAPE_W,
      h: shapeH = DEFAULT_SHAPE_H,
    } = shapes[i];

    if (mouseX >= shapeX && mouseX <= shapeX + shapeW && mouseY >= shapeY && mouseY <= shapeY + shapeH) {
      return [i, mouseX - shapeX, mouseY - shapeY];
    }
  }

  return [-1];
}
