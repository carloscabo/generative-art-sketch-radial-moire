CanvasRenderingContext2D.prototype._circle = function (x, y, r) {
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI * 2, true);
  this.closePath();
  this.stroke();
  return this; //return the context
} // Circle

CanvasRenderingContext2D.prototype._plot = function (x, y, r = 2) {
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI * 2, true);
  this.closePath();
  this.fill();
  return this; //return the context
} // Circle

// CanvasRenderingContext2D.prototype._clear = function (w, h) {
//   this.clearRect(0, 0, w, h);
// } // Clear

CanvasRenderingContext2D.prototype._roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  this.fill();
  return this; //return the context
}

CanvasRenderingContext2D.prototype._line = function (x1, y1, x2, y2) {
  this.beginPath();
  this.moveTo(x1,y1);
  this.lineTo(x2,y2);
  this.closePath();
  this.stroke();
  return this; //return the context
} // Line

// _poly [x,y, x,y, x,y.....];
CanvasRenderingContext2D.prototype._poly = function (points, closed = true) {
  this.beginPath();
  ctx.moveTo(points[0], points[1]);
  for(  let i = 2; i < points.length - 1; i += 2 ) {
    this.lineTo( points[i] , points[i+1]);
  }
  if (closed) this.closePath();
  return this; //return the context
} // Poly



// Style helpers

// fillStyle
Object.defineProperty(CanvasRenderingContext2D.prototype, 'fS', {
  get: function() {
    return this.fillStyle;
  },
  set: function(color) {
    this.fillStyle = color;
  }
});

// strokeStyle
Object.defineProperty(CanvasRenderingContext2D.prototype, 'sS', {
  get: function() {
    return this.strokeStyle;
  },
  set: function(color) {
    this.strokeStyle = color;
  }
});

// lineWidth
Object.defineProperty(CanvasRenderingContext2D.prototype, 'lW', {
  get: function() {
    return this.lineWidth;
  },
  set: function(w) {
    this.lineWidth = w;
  }
});