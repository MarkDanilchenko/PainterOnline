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
	}
}

export { Tools, Brush, Rectangle };
