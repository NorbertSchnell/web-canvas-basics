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
}
