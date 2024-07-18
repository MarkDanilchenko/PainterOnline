import { Brush, Rectangle } from './tools_handler.js';

const drawHandler = (msg, canvas) => {
	const figureObject = msg.figureObject;
	const ctx = canvas.getContext('2d');
	switch (figureObject.type) {
		case 'brush':
			Brush.draw(ctx, figureObject.x, figureObject.y);
			break;
		case 'brush_finished':
			ctx.beginPath();
			break;
		case 'rectangle':
			Rectangle.__draw(ctx, figureObject.startX, figureObject.startY, figureObject.width, figureObject.height);
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
