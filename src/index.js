import './index.css';
import level1 from './map-definitions/map';
import MapRender from './map-render';
var maze = new Pacman();

function setUpKeyListeners() {

  document.addEventListener('keydown', (event) => {

    console.log(event);
    if (event.keyCode >= 37 && event.keyCode <= 40) {

      maze.UpdatePlayer(event.keyCode);
    }
  }, false);
}

setUpKeyListeners();

function Pacman() {

  var map = level1;

  function Main() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth - (window.innerWidth % map[0].length);
    canvas.height = window.innerHeight - (window.innerHeight % map.length);
    var ctx = canvas.getContext("2d");
    const cellWidth = canvas.width / map[0].length * 1.0;
    const cellHeight = canvas.height / map.length * 1.0;
    MapRender(ctx, cellWidth, cellHeight, map);
  }

  function UpdatePlayer(direction) {
    const index = isItemInArray(map, 2);
    if (index.index > 0)
      if (direction == 37 && (index.index - 1 > 0 && index.index - 1 < map[0].length)) {
        map[index.i][index.index] = 0;
        map[index.i][index.index - 1] = 2;
      }
    if (direction == 39 && (index.index + 1 > 0 && index.index + 1 < map[0].length)) {
      map[index.i][index.index] = 0;
      map[index.i][index.index + 1] = 2;
    }
    if (direction == 38 && (index.i - 1 > 0 && index.i - 1 < map.length)) {
      map[index.i][index.index] = 0;
      map[index.i - 1][index.index] = 2;
    }
    if (direction == 40 && (index.i + 1 > 0 && index.i + 1 < map.length)) {
      map[index.i][index.index] = 0;
      map[index.i + 1][index.index] = 2;
    }
    this.Main();
  }


  function isItemInArray(array, item) {
    console.log(item);
    for (var i = 0; i < array.length; i++) {
      // This if statement depends on the format of your array
      let index = array[i].findIndex(x => x == 2)
      if (index >= 0) {
        return {
          i: i,
          index: index
        }
      }
    }
    return {
      i: -1,
      index: -1
    } // Not found
  }

  return {
    UpdatePlayer: UpdatePlayer,
    Main: Main,
    items: map
  }

}
window.maze = maze;
