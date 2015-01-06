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

  // Methods

  // Initially initialize empty (dead) 2D array initially
  // TODO: Add other common initial arrays e.g. glider gun, etc
  conway.newEmptyArray = function () {
    var i, j;
    var cells = [];
    // empty array for each cell column (loops right through x-axis)
    for (i = 0; i < conway.width; i++) {
      cells[i] = [];
      // set each cell to dead (loops down through y-axis)
      for (j = 0; j < conway.height; j++) {
        cells[i][j] = conway.dead;
      }
    }
    return cells;
  }; // conway.newEmptyArray()


  // Draws grid to screen using easeljs (side effects only)
  //  Draws dead and live cells w/ different colors
  conway.draw = function (cellsArray) {
    var i, j;
    var square = [];
    for (i = 0; i < length; i++) {
      for (j = 0; j < length; j++) {
        //  Creates new easeljs square at coordinates
        //   corresponding to current location in array.
        //  Adds child shapes to easeljs stage
        if (cellsArray[i][j] == conway.alive) {
          square.push([]);
          square[i][j] = new createjs.Shape();
          square[i][j].graphics.beginFill('#00ff99')
            .beginStroke("#999999")
            .drawRect(0, 0, 10, 10);
          square[i][j].x = i * 10;
          square[i][j].y = j * 10;
          conway.stage.addChild(square[i][j]);
          // calls toggleCellAt on click
          square[i][j].addEventListener("click", conway.toggleCellAt(i, j, square[i][j]));
        } else {
          square.push([]);
          square[i][j] = new createjs.Shape();
          square[i][j].graphics.beginFill('#666666')
            .beginStroke("#999999")
            .drawRect(0, 0, 10, 10);
          square[i][j].x = i * 10;
          square[i][j].y = j * 10;
          conway.stage.addChild(square[i][j]);
          square[i][j].addEventListener("click", conway.toggleCellAt(cellsArray, i, j, square[i][j]));
        }
      }
    }
    // Updates easeljs stage
    conway.stage.update();
    console.log('grid drawn');
  }; // conway.draw()

  // Toggle cell's life state and color using closures
  //  to save indices of the iterations (side effects only)
  conway.toggleCellAt = function (cellsArray, x, y, square) {
    return function () {
      if (cellsArray[x][y] === conway.alive) {
        // Toggle to dead and black if alive before
        cellsArray[x][y] = conway.dead;
        square.graphics.clear();
        square = new createjs.Shape();
        square.graphics.beginFill('#666666')
          .beginStroke("#999999")
          .drawRect(0, 0, 10, 10);
        square.x = x * 10;
        square.y = y * 10;
        square.addEventListener("click", conway.toggleCellAt(cellsArray, x, y, square));
        conway.stage.addChild(square);
        conway.stage.update();
      } else {
        // Toggle to alive and bright if dead before
        cellsArray[x][y] = conway.alive;
        square.graphics.clear();
        square = new createjs.Shape();
        square.graphics.beginFill('#00ff99')
          .beginStroke("#999999")
          .drawRect(0, 0, 10, 10);
        square.x = x * 10;
        square.y = y * 10;
        square.addEventListener("click", conway.toggleCellAt(cellsArray, x, y, square));
        conway.stage.addChild(square);
        conway.stage.update();
      }
    };
  }; // conway.toggleCellAt()


  // Returns number of live neighbors of cell at x, y
  // TODO: Take edges into account
  conway.getNeighborCount = function (cellsArray, x, y) {
    // Start count at 0
    var count = (cellsArray[x][y] == conway.alive) ? -1 : 0;
    // Adds to count if any of the surrounding cells are alive
    // TODO: Toroidal wrapping. If at an edge, wrap around and check that square
    // [x - 1][y - 1]  [x][y - 1]  [x + 1][y - 1]
    // [x - 1][y]      [x][y]      [x + 1][y]
    // [x - 1][y + 1]  [x][y + 1]  [x + 1][y + 1]

    // Traverses surrounding squares. Check if alive
    for (var w = -1; w <= 1; w++) {
      for (var h = -1; h <= 1; h++) {
        if (cellsArray[(conway.width + (x + w)) % conway.width][(conway.height + (y + h)) % conway.height] == conway.alive) {
          count++;
        }
      }
    }

    console.log('count is: ' + count, x, y);
    return count;
  }; // conway.getNeighborCount()

  // Returns 1 if square gets to live, returns 0 if square will die
  conway.createOrDestroy = function (cellsArray, x, y) {
    // Dies if alive && N<2 || N>3
    // if alive
    if (cellsArray[x][y]) {
      // if live neighbors < 2
      if (conway.getNeighborCount(cellsArray, x, y) < 2) {
        return 0;
      }
      // if live neighbors > 3
      if (conway.getNeighborCount(cellsArray, x, y) > 3) {
        return 0;
      } else { // Stay alive
        return 1;
      }
    }
    // if dead and exactly 3 neighbors, regenerate
    if (!cellsArray[x][y] && (conway.getNeighborCount(cellsArray, x, y) === 3)) {
      return 1;
    } else { // Stay dead
      return 0;
    }
  }; // conway.createOrDestroy()

  // Updates conway.cells array
  conway.updateAll = function (cellsArray) {
    console.log(cellsArray);
    var i, j;
    var newCellArray = [];
    // Traverses every square and sets it alive or dead based on GoL rules
    for (i = 0; i < conway.width; i++) {
      newCellArray.push([]);
      for (j = 0; j < conway.height; j++) {
        if (conway.createOrDestroy(cellsArray, i, j)) {
          newCellArray[i][j] = conway.alive;
        } else {
          newCellArray[i][j] = conway.dead;
        }
      }
    }
    console.log('updated grid');
    //    console.log(newCellArray);
    return newCellArray;
  }; // conway.updateAll()

} // Conway

$(document).ready(function () {
  console.log('ready');

  // Create new Conway object
  var gameController = new Conway(10);
  // Initalize to all dead cells
  var cells = gameController.newEmptyArray();
  // Create stage for easeljs
  gameController.stage = new createjs.Stage("gameController");
  // Draw all empty squares to stage
  gameController.draw(cells);

  //

  $('#startButton').click(function () {
    cells = gameController.updateAll(cells);
    gameController.draw(cells);
  });

});
