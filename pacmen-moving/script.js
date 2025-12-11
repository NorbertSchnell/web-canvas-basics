const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const pacmen = new Set();
const radius = 40;

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();
requestAnimationFrame(onAnimationFrame);


for (let i = 0; i < 10; i++) {
  const t = 0.001 * performance.now();
  const x = radius + Math.random() * (canvas.width - 2 * radius);
  const y = radius + Math.random() * (canvas.height - 2 * radius);
  const angle = 0.5 * Math.PI * Math.floor(4 * Math.random());
  const velocity = 150 + 100 * Math.random();

  const pac = {
    x: x,
    y: y,
    angle: angle,
    velocity: velocity,
    start: t,
    t: t,
  }

  pacmen.add(pac);
}

/*************************************************************
 * canvas
 */
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onAnimationFrame() {
  const t = 0.001 * performance.now();

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let pac of pacmen) {
    let x = pac.x;
    let y = pac.y;
    let velocity = pac.velocity;
    const angle = pac.angle;
    const dT = t - pac.t;
    const vX = velocity * Math.cos(angle);
    const vY = velocity * Math.sin(angle);

    x += vX * dT;
    y += vY * dT;

    if (x < -radius) {
      x = canvas.width + radius;
    } else if (x > canvas.width + radius) {
      x = -radius;
    }

    if (y < -radius) {
      y = canvas.height + radius;
    } else if (y > canvas.height + radius) {
      y = -radius;
    }

    let opening = 8 * (t - pac.start) % 2;

    if (opening > 1) {
      opening = 2 - opening;
    }

    pac.x = x;
    pac.y = y;
    pac.t = t;

    context.globalAlpha = 0.666;
    context.fillStyle = '#aa0';
    context.strokeStyle = '#ff0';
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius, angle + opening * 1.2, angle - opening * 1.2);
    context.lineTo(x, y);
    context.fill();
    context.stroke();
  }

  requestAnimationFrame(onAnimationFrame);
}
