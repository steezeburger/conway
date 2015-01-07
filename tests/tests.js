// New Conway obj
var testObj = new Conway(10);
var testCells = testObj.newEmptyArray();

QUnit.test("get neighbor count at start", function (assert) {
  // Initial empty array
  testCells = testObj.newEmptyArray();

  assert.equal(testObj.getNeighborCount(testCells, 0, 0), 0, "Zero neighbors at 0,0");
  assert.equal(testObj.getNeighborCount(testCells, 5, 5), 0, "Zero neighbors at 5,5");
  assert.equal(testObj.getNeighborCount(testCells, 9, 9), 0, "Zero neighbors at 9,9");
});


QUnit.test("get neighbor count when all live", function (assert) {
  // set all alive and test again
  for (i = 0; i < testObj.width; i++) {
    for (j = 0; j < testObj.height; j++) {
      testCells[i][j] = testObj.alive;
    }
  }

  assert.equal(testObj.getNeighborCount(testCells, 0, 0), 8, "Eight neighbors at 0,0");
  // TODO: Add other common initial arrays e.g. glider gun, etc
  assert.equal(testObj.getNeighborCount(testCells, 5, 5), 8, "Eight neighbors at 5,5");
  assert.equal(testObj.getNeighborCount(testCells, 9, 9), 8, "Eight neighbors at 9,9");
});

QUnit.test("get neighbor count", function(assert) {
  testCells = testObj.newEmptyArray();
  // Sets all cells touching 5,5 to alive
  testCells[4][4] = testObj.alive
  testCells[4][5] = testObj.alive
  testCells[4][6] = testObj.alive
  testCells[5][4] = testObj.alive
  testCells[5][6] = testObj.alive
  testCells[6][4] = testObj.alive
  testCells[6][5] = testObj.alive
  testCells[6][6] = testObj.alive

  assert.equal(testObj.getNeighborCount(testCells, 5, 5), 8, "Eight neighbors at 5,5");
  assert.equal(testObj.getNeighborCount(testCells, 3, 3), 1, "One neighbor at 3,3");
  assert.equal(testObj.getNeighborCount(testCells, 7, 6), 2, "Two neighbors at 7,6");
});

QUnit.test("create or destroy", function(assert) {
  // Will use grid made from "get neighbor count" test
  assert.equal(testObj.createOrDestroy(testCells, 0, 0), 0, "Cell 0,0 stays dead");
  assert.equal(testObj.createOrDestroy(testCells, 5, 5), 0, "Cell 5,5 dies due to overpopulation");
  assert.equal(testObj.createOrDestroy(testCells, 5, 7), 1, "Cell 5,7 will regenerate");
  assert.equal(testObj.createOrDestroy(testCells, 4, 6), 1, "Cell 4,6 will stay alive");

});
