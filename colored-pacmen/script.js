const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

window.addEventListener('resize', updateCanvasSize);
updateCanvasSize();

/*************************************************************
 * canvas
 */
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.lineWidth = 3;

  const radius = 50;

  for (let i = 0; i < 10; i++) {
    context.beginPath();

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, 1)`;

    const x = radius + Math.random() * (canvas.width - 2 * radius);
    const y = radius + Math.random() * (canvas.height - 2 * radius);
    context.moveTo(x, y);
    context.arc(x, y, radius, 0.1 * Math.PI, 1.9 * Math.PI);
    context.lineTo(x, y);

    context.fill();
    context.stroke();
  }
}

