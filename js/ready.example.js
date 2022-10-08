console.log('La magia aquí');

const $canvas = document.getElementById('main-canvas');
const ctx = $canvas.getContext('2d');
let x = 256;

// Time
let t_0;
let t_from_start;
let t_last_frame;
let num_points = 24;

function init() {
  window.requestAnimationFrame(draw);
  t_0 = Date.now();
}

function draw() {
  t_from_start = Date.now() - t_0;

  ctx.fillStyle = '#242424';
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
  ctx.fillStyle = '#ee0000';
  ctx._plot(x, 256);
  x++;

  if (x > $canvas.width) x = 0;

  t_last_frame = Date.now();
  window.requestAnimationFrame(draw);
}

init();



