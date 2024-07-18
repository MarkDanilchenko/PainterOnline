import { Brush, Rectangle } from './tools_handler.js';

const drawHandler = (msg, canvas) => {
	const figureObject = msg.figureObject;
	const ctx = canvas.getContext('2d');
	switch (figureObject.type) {
		case 'brush':
			Brush.draw(ctx, figureObject.x, figureObject.y, figureObject.strokeColor, figureObject.lineWidth);
			break;
		case 'brush_finished':
			// This is neede to tell the server that the user has finished drawing and not to connect to separate drawing lines between each other.
			ctx.beginPath();
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
			break;
		case 'eraser':
			break;
		case 'line':
			break;
		default:
			break;
	}
};

export { drawHandler };
