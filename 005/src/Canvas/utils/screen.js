export const clearScreen = ({ ctx, canvas }) => {
  if (!ctx || !canvas) return;

  const top = 0;
  const left = 0;
  const width = canvas.current.clientWidth;
  const height = canvas.current.clientHeight;

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.setLineDash([]);
  ctx.clearRect(top, left, width, height);
  ctx.rect(top, left, width, height);

  ctx.fill();
  ctx.stroke();
}
