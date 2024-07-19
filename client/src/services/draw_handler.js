import { Brush, Circle, Eraser, Rectangle, Line } from './tools_handler.js';

const drawHandler = (msg, canvas) => {
	const figureObject = msg.figureObject;
	const ctx = canvas.getContext('2d');
	ctx.lineCap = 'round';
	switch (figureObject.type) {
		case 'brush':
			Brush.__draw(ctx, figureObject.x, figureObject.y, figureObject.strokeColor, figureObject.lineWidth);
			break;
		case 'rectangle':
			Rectangle.__draw(
				ctx,
				figureObject.startX,
				figureObject.startY,
				figureObject.width,
				figureObject.height,
				figureObject.fillColor,
				figureObject.strokeColor,
				figureObject.lineWidth
			);
			break;
		case 'circle':
			Circle.__draw(
				ctx,
				figureObject.startX,
				figureObject.startY,
				figureObject.radius,
				figureObject.fillColor,
				figureObject.strokeColor,
				figureObject.lineWidth
			);
			break;
		case 'eraser':
			Eraser.__draw(ctx, figureObject.x, figureObject.y, figureObject.lineWidth);
			break;
		case 'line':
			Line.__draw(
				ctx,
				figureObject.startX,
				figureObject.startY,
				figureObject.endX,
				figureObject.endY,
				figureObject.lineWidth,
				figureObject.strokeColor
			);
			break;
		case 'brush_finished':
		case 'rectangle_finished':
		case 'circle_finished':
		case 'eraser_finished':
		case 'line_finished':
			// This is neede to tell the server that the user has finished drawing and not to connect to separate drawing lines between other elements.
			ctx.beginPath();
			break;
		default:
			break;
	}
};

export { drawHandler };
