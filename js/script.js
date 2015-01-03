// Conway Object Constructor
//  Creates new Conway's GoL object with length of
//  the square grid.
// Game controller
function Conway(length) {
  var conway = this;

  //
  conway.stage = null;
  conway.alive = 1;
  conway.dead = 0;

  // Always a square
  conway.width = conway.height = length;

  // Empty 2D array representing each cell
  //  cells[x][y] where x, y are coordinates of each cell in grid w/
  //  origin at the top left
  //  x increasing to the right
  //  y increasing downwards
  conway.cells = [];

  // Methods

  // Initially iinitialize empty (dead) 2D array initially
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


  // Draws grid to screen using easeljs
  //  Draws dead and live cells w/ different colors
  conway.draw = function () {
    var i, j;
    var square = [];
    for (i = 0; i < length; i++) {
      for (j = 0; j < length; j++) {
        //  Creates new easeljs square at coordinates
        //  corresponding to current location in array.
        //  Adds child shape to easeljs stage
        if (conway.cells[i][j] == conway.alive) {
          square.push([]);
          square[i][j] = new createjs.Shape();
          square[i][j].graphics.beginFill('#00ff99')
            .beginStroke("#999999")
            .drawRect(0, 0, 10, 10);
          square[i][j].x = i * 10;
          square[i][j].y = j * 10;
          conway.stage.addChild(square[i][j]);
          square[i][j].addEventListener("click", conway.toggleCellAt(i, j, square[i][j]));
        } else {
          square.push([]);
          square[i][j] = new createjs.Shape();
          square[i][j].graphics.beginFill('black')
            .beginStroke("#999999")
            .drawRect(0, 0, 10, 10);
          square[i][j].x = i * 10;
          square[i][j].y = j * 10;
          conway.stage.addChild(square[i][j]);
          square[i][j].addEventListener("click", conway.toggleCellAt(i, j, square[i][j]));
        }
      }
    }
    // Updates easeljs stage
    conway.stage.update();
  }; // conway.draw()

  conway.toggleCellAt = function (x, y, square) {
    return function () {
      console.log("you clicked " + x + ' ' + y);
      // Toggle cell's life state and color
      if (conway.cells[x][y] === conway.alive) {
        console.log('toggled dead');
        // Toggle to dead and black
        conway.cells[x][y] = conway.dead;
        square.graphics.clear();
        square = new createjs.Shape();
        square.graphics.beginFill('#black')
          .beginStroke("#999999")
          .drawRect(0, 0, 10, 10);
        square.x = x * 10;
        square.y = y * 10;
        square.addEventListener("click", conway.toggleCellAt(x, y, square));
        conway.stage.addChild(square);
        conway.stage.update();
      } else {
        console.log('toggled bright');
        // Toggle to alive and bright
        conway.cells[x][y] = conway.alive;
        square.graphics.clear();
        square = new createjs.Shape();
        square.graphics.beginFill('#00ff99')
          .beginStroke("#999999")
          .drawRect(0, 0, 10, 10);
        square.x = x * 10;
        square.y = y * 10;
        square.addEventListener("click", conway.toggleCellAt(x, y, square));
        conway.stage.addChild(square);
        conway.stage.update();
      }
    }
  }; // conway.addCellAt()

} // Conway

$(document).ready(function () {
  console.log('ready');

  // Create new Conway object
  var gameController = new Conway(50);
  // Initalize to all dead cells
  gameController.init();
  // Create stage for easeljs
  gameController.stage = new createjs.Stage("gameController");
  // Draw all squares to stage
  gameController.draw();

});
