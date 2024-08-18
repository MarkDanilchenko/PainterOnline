import { Brush, Circle, Eraser, Line, Rectangle } from './tools_handler.js';

const drawHandler = (response, canvas) => {
  const figureObject = response.figureObject;
  const ctx = canvas.getContext('2d');

  switch (figureObject.type) {
    case 'brush':
      Brush.draw(ctx, figureObject.x, figureObject.y, figureObject.strokeColor, figureObject.lineWidth);
      break;
    case 'rectangle':
      Rectangle.draw(
        ctx,
        figureObject.startX,
        figureObject.startY,
        figureObject.width,
        figureObject.height,
        figureObject.fillColor,
        figureObject.strokeColor,
        figureObject.lineWidth
      );
      ctx.beginPath();
      break;
    case 'circle':
      Circle.draw(
        ctx,
        figureObject.startX,
        figureObject.startY,
        figureObject.radius,
        figureObject.fillColor,
        figureObject.strokeColor,
        figureObject.lineWidth
      );
      ctx.beginPath();
      break;
    case 'eraser':
      Eraser.draw(ctx, figureObject.x, figureObject.y, figureObject.lineWidth);
      break;
    case 'line':
      Line.draw(
        ctx,
        figureObject.startX,
        figureObject.startY,
        figureObject.endX,
        figureObject.endY,
        figureObject.lineWidth,
        figureObject.strokeColor
      );
      ctx.beginPath();
      break;
    case 'brush_finished':
    case 'eraser_finished':
      ctx.beginPath();
      break;
    default:
      break;
  }
};

export default drawHandler;
