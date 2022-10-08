/*
  Fast and dirty proof of concept by Carlos Cabo (@putuko)
  Please
*/
console.log('La magia aquí');

const $canvas = document.getElementById('main-canvas');
const ctx = $canvas.getContext('2d');
const pane = new Tweakpane.Pane();
const sunflower_idx = ['A', 'B', 'C'];

const PARAMS = {
  composition_mode: 'source-over',
  A: {
    visible: true,
    num_petals: 144,
    inner_radius: 0.2,
    outer_radius: 0.8,
    rotation_speed: 10,
    traslation_radius: 50,
    traslation_speed: 1.0,
    color: '#ee0000c0',
  },
  B: {
    visible: true,
    num_petals: 144,
    inner_radius: 0.2,
    outer_radius: 0.8,
    rotation_speed: 20,
    traslation_radius: 50,
    traslation_speed: 0.75,
    color: '#00ee00c0',
  },
  C: {
    visible: true,
    num_petals: 144,
    inner_radius: 0.2,
    outer_radius: 0.8,
    rotation_speed: 30,
    traslation_radius: 50,
    traslation_speed: 0.5,
    color: '#0000eec0',
  },

};

// Time
let t_0;
let t_from_start;
let t_last_frame;

function init() {
  window.requestAnimationFrame(draw);

  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;

  t_0 = Date.now() / 1000;
  ctx.translate($canvas.width / 2, $canvas.height / 2);

  pane.addInput(
    PARAMS, 'composition_mode',
    {options: {source_over: 'source-over', lighter: 'lighter', xor: 'xor', screen: 'screen', luminosity: 'luminosity'}}
  ).on('change', (ev) => {
    ctx.globalCompositeOperation = ev.value;
  });

  const panels = {};
  for (let i = 0; i < sunflower_idx.length; i++) {
    const letter = sunflower_idx[i];
    panels[letter] = pane.addFolder({
      title:`Sunflower ${letter}`,
      expanded: true,
    });
    panels[letter].addInput(PARAMS[letter], 'visible');
    panels[letter].addInput(
      PARAMS[letter], 'num_petals',
      {min: 3, max: 512, step: 1}
    );
    panels[letter].addInput(
      PARAMS[letter], 'inner_radius',
      {min: 0.0, max: 2.0}
    );
    panels[letter].addInput(
      PARAMS[letter], 'outer_radius',
      {min: 0.0, max: 2.0}
    );
    panels[letter].addInput(
      PARAMS[letter], 'rotation_speed',
      {min: 1, max: 50, step: 1}
    );
    panels[letter].addInput(
      PARAMS[letter], 'traslation_radius',
      {min: 0, max: $canvas.width / 2, step: 1}
    );
    panels[letter].addInput(
      PARAMS[letter], 'traslation_speed',
      {min: 0, max: 10.0}
    );
    panels[letter].addInput(PARAMS[letter], 'color');
  }

  ctx.globalCompositeOperation = PARAMS.composition_mode;

  draw();
}

function draw() {
  t_from_start = (Date.now() / 1000) - t_0;

  ctx.clearRect(-$canvas.width/2, -$canvas.height/2, $canvas.width, $canvas.height);

  ctx.fillStyle = '#242424';
  ctx.fillRect(-$canvas.width/2, -$canvas.height/2, $canvas.width, $canvas.height);
  // ctx.fillStyle = '#ee0000';
  // ctx._plot(x, 256);

  for (let i = 0; i < sunflower_idx.length; i++) {
    const idx = sunflower_idx[i];
    if (PARAMS[idx].visible) {
      ctx.save();
      ctx.fS = PARAMS[idx].color;
      ctx.translate(Math.sin(t_from_start * PARAMS[idx].traslation_speed) * PARAMS[idx].traslation_radius, Math.cos(t_from_start * PARAMS[idx].traslation_speed) * PARAMS[idx].traslation_radius);
      ctx.rotate(t_from_start / PARAMS[idx].rotation_speed);
      sunflower(
        0, 0,
        $canvas.height * 0.5 * PARAMS[idx].inner_radius,
        $canvas.height * 0.5 * PARAMS[idx].outer_radius,
        PARAMS[idx].num_petals
      );
      ctx.restore();
    }
  }

  t_last_frame = Date.now();
  window.requestAnimationFrame(draw);
}

function sunflower(x, y, inner_radius, outer_radius, petals_count ) {
  const p_inner_width = Math.PI / (petals_count * 2.50);
  const p_outer_width = Math.PI / (petals_count * 2.50);

  for (let i = 0; i < petals_count; i++) {

    const theta = ((Math.PI*2) / petals_count);
    const angle = (theta * i);

    ctx._poly([
      x + inner_radius * Math.cos(angle + p_inner_width), y + inner_radius * Math.sin(angle + p_inner_width),
      x + inner_radius * Math.cos(angle - p_inner_width), y + inner_radius * Math.sin(angle - p_inner_width),
      x + outer_radius * Math.cos(angle - p_outer_width), y + outer_radius * Math.sin(angle - p_outer_width),
      x + outer_radius * Math.cos(angle + p_outer_width), y + outer_radius * Math.sin(angle + p_outer_width)
    ]);
    ctx.fill();
  }
}

init();



