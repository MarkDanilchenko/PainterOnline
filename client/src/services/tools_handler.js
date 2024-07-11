class Tools {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.clearEventListeners();
	}

	clearEventListeners() {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
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
		this.coordX = event.pageX - this.canvas.offsetLeft;
		this.coordY = event.pageY - this.canvas.offsetTop;
		// Save the current images on the canvas.
		this.savedCanvas = this.canvas.toDataURL();
	}

	mouseMoveHandler(event) {
		if (this.mouseDown) {
			// Get end point from mouse position XY and calculate width and height of the rectangle.
			let currentCoordX = event.pageX - this.canvas.offsetLeft;
			let currentCoordY = event.pageY - this.canvas.offsetTop;
			let width = currentCoordX - this.coordX;
			let height = currentCoordY - this.coordY;
			this.draw(this.coordX, this.coordY, width, height);
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
			this.ctx.fillRect(x, y, width, height);
		};
	}
}

class Circle extends Tools {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}
}

class Eraser extends Tools {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}
}

class Line extends Tools {
	constructor(canvas) {
		super(canvas);
		this.listen();
	}
}

export { Tools, Brush, Rectangle, Circle, Eraser, Line };
