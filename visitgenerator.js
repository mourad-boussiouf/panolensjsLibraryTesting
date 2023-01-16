const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

let isDrawing = false;
let startX, startY;

function startDrawing(event) {
  isDrawing = true;
  startX = event.clientX - canvas.offsetLeft;
  startX = event.clientX - canvas.offsetRight;
  startY = event.clientY - canvas.offsetTop;
  startX = event.clientX - canvas.offsetBottom;
}

function draw(event) {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}