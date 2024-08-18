class Tools {
  constructor(canvas, socket, sessionId) {
    this.socket = socket;
    this.sessionId = sessionId;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.lineCap = 'round';
    this.clearEventListeners();
  }

  clearEventListeners() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }

  setFillColor(color) {
    return this.ctx ? (this.ctx.fillStyle = color) : null;
  }

  setStrokeColor(color) {
    return this.ctx ? (this.ctx.strokeStyle = color) : null;
  }

  setLineWidth(width) {
    return this.ctx ? (this.ctx.lineWidth = width) : null;
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

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        type: 'draw',
        sessionId: this.sessionId,
        figureObject: {
          type: 'brush_finished'
        }
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
      this.socket.send(
        JSON.stringify({
          type: 'draw',
          sessionId: this.sessionId,
          figureObject: {
            type: 'brush',
            x: event.pageX - this.canvas.offsetLeft,
            y: event.pageY - this.canvas.offsetTop,
            strokeColor: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth
          }
        })
      );
    }
  }

  static draw(ctx, x, y, strokeColor, lineWidth) {
    // Save each client's ctx settings before changing it with a ctx settings of another client.
    // For example, if a current client draws a line with a width of 5, and another connected client draws a line with a width of 3,
    // the current client's line must continue to be drawn with a width of 5.
    const currentLineWidth = ctx.lineWidth;
    const currentStrokeStyle = ctx.strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    // Set the ctx settings to the previous ones.
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
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

  mouseUpHandler() {
    this.mouseDown = false;
    if (this.startX && this.startY && this.width && this.height) {
      this.socket.send(
        JSON.stringify({
          type: 'draw',
          sessionId: this.sessionId,
          figureObject: {
            type: 'rectangle',
            startX: this.startX,
            startY: this.startY,
            width: this.width,
            height: this.height,
            fillColor: this.ctx.fillStyle,
            strokeColor: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth
          }
        })
      );
      this.startX = 0;
      this.startY = 0;
      this.width = 0;
      this.height = 0;
    }

    return;
  }

  mouseDownHandler(event) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = event.pageX - this.canvas.offsetLeft;
    this.startY = event.pageY - this.canvas.offsetTop;
    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      const endX = event.pageX - this.canvas.offsetLeft;
      const endY = event.pageY - this.canvas.offsetTop;
      this.width = endX - this.startX;
      this.height = endY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x, y, width, height) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static draw(ctx, startX, startY, width, height, fillColor, strokeColor, lineWidth) {
    const currentFillStyle = ctx.fillStyle;
    const currentStrokeStyle = ctx.strokeStyle;
    const currentLineWidth = ctx.lineWidth;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.rect(startX, startY, width, height);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = currentFillStyle;
    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentLineWidth;
  }
}

class Circle extends Tools {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    if (this.startX && this.startY && this.radius) {
      this.socket.send(
        JSON.stringify({
          type: 'draw',
          sessionId: this.sessionId,
          figureObject: {
            type: 'circle',
            startX: this.startX,
            startY: this.startY,
            radius: this.radius,
            fillColor: this.ctx.fillStyle,
            strokeColor: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth
          }
        })
      );
      this.startX = 0;
      this.startY = 0;
      this.radius = 0;
    }

    return;
  }

  mouseDownHandler(event) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = event.pageX - this.canvas.offsetLeft;
    this.startY = event.pageY - this.canvas.offsetTop;
    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      const endX = event.pageX - this.canvas.offsetLeft;
      const endY = event.pageY - this.canvas.offsetTop;
      this.radius = Math.sqrt(Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2));
      this.draw(this.startX, this.startY, this.radius);
    }
  }

  draw(x, y, radius) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static draw(ctx, startX, startY, radius, fillColor, strokeColor, lineWidth) {
    const currentFillStyle = ctx.fillStyle;
    const currentStrokeStyle = ctx.strokeStyle;
    const currentLineWidth = ctx.lineWidth;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = currentFillStyle;
    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentLineWidth;
  }
}

class Eraser extends Tools {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        type: 'draw',
        sessionId: this.sessionId,
        figureObject: {
          type: 'eraser_finished'
        }
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
      this.socket.send(
        JSON.stringify({
          type: 'draw',
          sessionId: this.sessionId,
          figureObject: {
            type: 'eraser',
            x: event.pageX - this.canvas.offsetLeft,
            y: event.pageY - this.canvas.offsetTop,
            lineWidth: this.ctx.lineWidth
          }
        })
      );
    }
  }

  static draw(ctx, x, y, lineWidth) {
    const currentLineWidth = ctx.lineWidth;
    const currentStrokeStyle = ctx.strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'white';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
  }
}

class Line extends Tools {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    if (this.startX && this.startY && this.endX && this.endY) {
      this.socket.send(
        JSON.stringify({
          type: 'draw',
          sessionId: this.sessionId,
          figureObject: {
            type: 'line',
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
            strokeColor: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth
          }
        })
      );
      this.startX = 0;
      this.startY = 0;
      this.endX = 0;
      this.endY = 0;
    }

    return;
  }

  mouseDownHandler(event) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = event.pageX - this.canvas.offsetLeft;
    this.startY = event.pageY - this.canvas.offsetTop;
    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.endX = event.pageX - this.canvas.offsetLeft;
      this.endY = event.pageY - this.canvas.offsetTop;
      this.draw(this.startX, this.startY, this.endX, this.endY);
    }
  }

  draw(x1, y1, x2, y2) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    };
  }

  static draw(ctx, x1, y1, x2, y2, lineWidth, strokeColor) {
    const currentLineWidth = ctx.lineWidth;
    const currentStrokeStyle = ctx.strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentStrokeStyle;
  }
}

export { Tools, Brush, Rectangle, Circle, Eraser, Line };
