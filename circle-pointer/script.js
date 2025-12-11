const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const circleRadius = 40;

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

document.body.addEventListener('pointerdown', onPointerDown);
document.body.addEventListener('pointermove', onPointerMove);
document.body.addEventListener('pointerup', onPointerUp);
document.body.addEventListener('pointercancel', onPointerUp);
// document.body.addEventListener('pointerout', onPointerUp);

requestAnimationFrame(onAnimationFrame);

/*************************************************************
 * pointer events
 */
const pointers = new Map();

function onPointerDown(e) {
  const id = e.pointerId;
  const x = e.clientX;
  const y = e.clientY;

  const pointer = {
    id: id,
    x: x,
    y: y,
  }

  pointers.set(id, pointer);
}

function onPointerMove(e) {
  const id = e.pointerId;
  const pointer = pointers.get(id);

  if (pointer) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }
}

function onPointerUp(e) {
  const id = e.pointerId;
  const pointer = pointers.get(id);

  if (pointer) {
    pointers.delete(id);
  }
}

/*************************************************************
 * canvas
 */
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onAnimationFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let [id, pointer] of pointers) {
    const x = pointer.x
    const y = pointer.y

    context.globalAlpha = 0.666;
    context.fillStyle = '#f00';
    context.beginPath();
    context.arc(x, y, circleRadius, 0, 2 * Math.PI);
    context.fill();
  }

  requestAnimationFrame(onAnimationFrame);
}
