//
var canvas = document.getElementById('main').getContext('2d');
// 
var cells = [];

canvas.strokeStyle = '#CDDC39';
canvas.fillStyle = '536DFE';


function init() {
  
  for (var i = 0; i < 64; i++) {
    cells[i] = [];
    for (var j = 0; j < 64; j++) {
      cells[i][j] = 0;
    }
  }


  // updates the canvas based on
  updateCanvas();
  
}