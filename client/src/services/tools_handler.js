class Tools {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.clearEventListeners();
		this.defaultStokeStyle();
	}

	clearEventListeners() {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
	}

	defaultStokeStyle() {
		this.ctx.strokeStyle = 'black';
	}
}
class Brush extends Tools {
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
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
class Rectangle extends Tools {
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
			// Get end point from mouse position XY and calculate width and height of the rectangle.
			let endX = event.pageX - this.canvas.offsetLeft;
			let endY = event.pageY - this.canvas.offsetTop;
			let width = endX - this.startX;
			let height = endY - this.startY;
			this.draw(this.startX, this.startY, width, height);
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
		};
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
		this.ctx.lineWidth = 1;
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
