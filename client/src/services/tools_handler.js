class Tools {
	constructor(canvas, socket, sessionId) {
		this.socket = socket;
		this.sessionId = sessionId;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.clearEventListeners();
	}

	clearEventListeners() {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
	}

	setFillColor(color) {
		this.ctx.fillStyle = color;
	}

	setStrokeColor(color) {
		this.ctx.strokeStyle = color;
	}

	setLineWidth(width) {
		if (width < 1 || width > 50) return;
		this.ctx.lineWidth = width;
	}
}
class Brush extends Tools {
	constructor(canvas, socket, sessionId) {
		super(canvas, socket, sessionId);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(event) {
		this.mouseDown = false;
		this.socket.send(
			JSON.stringify({
				type: 'draw',
				id: this.sessionId,
				figureObject: {
					type: 'brush_finished',
				},
			})
		);
	}

	mouseDownHandler(event) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.ctx.moveTo(event.pageX - this.canvas.offsetLeft, event.pageY - this.canvas.offsetTop);
	}

	mouseMoveHandler(event) {
		if (this.mouseDown) {
			// So every mouse move we send a message to the server and the server will broadcast it to all connected clients.
			// Then the clients will draw on the canvas figure they received with the help of the Brush.draw(...) function in draw_handler.js,
			// which then call the static draw(ctx, x, y).
			this.socket.send(
				JSON.stringify({
					type: 'draw',
					id: this.sessionId,
					figureObject: {
						type: 'brush',
						x: event.pageX - this.canvas.offsetLeft,
						y: event.pageY - this.canvas.offsetTop,
					},
				})
			);
		}
	}

	static draw(ctx, x, y) {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
class Rectangle extends Tools {
	constructor(canvas, socket, sessionId) {
		super(canvas, socket, sessionId);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(event) {
		this.mouseDown = false;
		this.socket.send(
			JSON.stringify({
				type: 'draw',
				id: this.sessionId,
				figureObject: {
					type: 'rectangle',
					startX: this.startX,
					startY: this.startY,
					width: this.width,
					height: this.height,
				},
			})
		);
	}

	mouseDownHandler(event) {
		this.mouseDown = true;
		this.ctx.beginPath();
		// Get start point from mouse position XY.
		this.startX = event.pageX - this.canvas.offsetLeft;
		this.startY = event.pageY - this.canvas.offsetTop;
		// Save the current images on the canvas.
		this.savedCanvas = this.canvas.toDataURL();
	}

	mouseMoveHandler(event) {
		if (this.mouseDown) {
			// Get end point from mouse position XY and calculate width and height of the rectangle.
			let endX = event.pageX - this.canvas.offsetLeft;
			let endY = event.pageY - this.canvas.offsetTop;
			this.width = endX - this.startX;
			this.height = endY - this.startY;
			this.draw(this.startX, this.startY, this.width, this.height);
		}
	}

	draw(x, y, width, height) {
		// Save the current images of the canvas in object of class Image.
		const img = new Image();
		img.src = this.savedCanvas;
		img.onload = () => {
			// Clear the canvas.
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// Draw the saved images on the canvas.
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			// Draw a new rectangle on the canvas.
			this.ctx.beginPath();
			this.ctx.rect(x, y, width, height);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}

	static __draw(ctx, startX, startY, width, height) {
		ctx.beginPath();
		ctx.rect(startX, startY, width, height);
		ctx.fill();
		ctx.stroke();
	}
}
class Circle extends Tools {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(event) {
		this.mouseDown = false;
		this.ctx.closePath();
	}

	mouseDownHandler(event) {
		this.mouseDown = true;
		this.ctx.beginPath();
		// Get start point from mouse position XY.
		this.startX = event.pageX - this.canvas.offsetLeft;
		this.startY = event.pageY - this.canvas.offsetTop;
		// Save the current images on the canvas.
		this.savedCanvas = this.canvas.toDataURL();
	}

	mouseMoveHandler(event) {
		if (this.mouseDown) {
			// Get end point from mouse position XY and calculate radius(diagonal) of the circle.
			let endX = event.pageX - this.canvas.offsetLeft;
			let endY = event.pageY - this.canvas.offsetTop;
			let radius = Math.sqrt(Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2));
			this.draw(this.startX, this.startY, radius);
		}
	}

	draw(x, y, radius) {
		// Save the current images of the canvas in object of class Image.
		const img = new Image();
		img.src = this.savedCanvas;
		img.onload = () => {
			// Clear the canvas.
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// Draw the saved images on the canvas.
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			// Draw a new circle on the canvas.
			this.ctx.beginPath();
			this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
			this.ctx.fill();
			this.ctx.stroke();
		};
	}
}
class Eraser extends Tools {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(event) {
		this.mouseDown = false;
		this.ctx.closePath();
	}

	mouseDownHandler(event) {
		this.mouseDown = true;
		this.ctx.beginPath();
		this.ctx.moveTo(event.pageX - this.canvas.offsetLeft, event.pageY - this.canvas.offsetTop);
	}

	mouseMoveHandler(event) {
		if (this.mouseDown) {
			this.draw(event.pageX - this.canvas.offsetLeft, event.pageY - this.canvas.offsetTop);
		}
	}

	draw(x, y) {
		this.ctx.strokeStyle = 'white';
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
class Line extends Tools {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}

	listen() {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(event) {
		this.mouseDown = false;
		this.ctx.closePath();
	}

	mouseDownHandler(event) {
		this.mouseDown = true;
		this.ctx.beginPath();
		// Get start point from mouse position XY.
		this.startX = event.pageX - this.canvas.offsetLeft;
		this.startY = event.pageY - this.canvas.offsetTop;
		// Save the current images on the canvas.
		this.savedCanvas = this.canvas.toDataURL();
	}

	mouseMoveHandler(event) {
		if (this.mouseDown) {
			let endX = event.pageX - this.canvas.offsetLeft;
			let endY = event.pageY - this.canvas.offsetTop;
			this.draw(this.startX, this.startY, endX, endY);
		}
	}

	draw(x1, y1, x2, y2) {
		// Save the current images of the canvas in object of class Image.
		const img = new Image();
		img.src = this.savedCanvas;
		img.onload = () => {
			// Clear the canvas.
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// Draw the saved images on the canvas.
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
			// Draw a new line on the canvas.
			this.ctx.beginPath();
			this.ctx.moveTo(x1, y1);
			this.ctx.lineTo(x2, y2);
			this.ctx.stroke();
		};
	}
}

export { Tools, Brush, Rectangle, Circle, Eraser, Line };
