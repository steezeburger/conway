// Conway Object Constructor
//  Creates new Conway's GoL object with length of
//  the square grid. Game controller
function Conway(length) {
  var conway = this;
  conway.stage = null;
  conway.alive = 1;
  conway.dead = 0;

  // always a square
  conway.width = conway.height = length;

  // Empty 2D array representing each cell
  //  cells[x][y] where x, y are coordinates of each cell in grid w/
  //  origin at the top left
  //  x increasing to the right
  //  y increasing downwards
  conway.cells = [];

  // initialize empty (dead) 2D array
  conway.init = function () {
    var i, j, cell;
    conway.cells = [];
    // empty array for each cell column (loops right through x-axis)
    for (i = 0; i < length; i++) {
      conway.cells[i] = [];
      // set each cell to dead (loops down through y-axis)
      for (j = 0; j < length; j++) {
        conway.cells[i][j] = conway.dead;
      }
    }
  }; // conway.init()

  // initialize initially
  // TODO: init on submission of gridSize form
  //  conway.init();

  // Draws grid to screen using easeljs
  //  Draws dead and live cells at different colors
  conway.draw = function () {
    var i, j, square;
    for (i = 0; i < length; i++) {
      for (j = 0; j < length; j++) {
        if (conway.cells[i][j] == conway.alive) {
          square = new createjs.Shape();
          square.graphics.beginFill('#00ff99')
            .drawRect(0, 0, 8, 8);
          square.x = i * 8;
          square.y = j * 8;
          conway.stage.addChild(square);
          console.log('square added at ' + i + ' ' + j);
        } else {
          square = new createjs.Shape();
          square.graphics.beginFill('black')
            .drawRect(0, 0, 8, 8);
          square.x = i * 8;
          square.y = j * 8;
          conway.stage.addChild(square);
          console.log('square added at ' + i + ' ' + j);
        }
      }
    }
    conway.stage.update();
  }; // conway.draw()
}

$(document).ready(function () {
  console.log('ready');
  
  // create new Conway object
  var gameController = new Conway(50);
  // initalize to all dead cells
  gameController.init();
  // create stage for easeljs
  gameController.stage = new createjs.Stage("gameController");
  // draw all dead squares to stage
  gameController.draw();

});
