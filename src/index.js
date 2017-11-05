import './index.css';
import level1 from './map-definitions/map';
import getItemPosition from './utils';
import MapRender from './map-render';
import PacmanCollisionStartegy from './collision-strategy';
var maze = new Pacman();

setUpKeyListeners();


function Pacman() {

  var map = level1;
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth - (window.innerWidth % map[0].length);
  canvas.height = window.innerHeight - (window.innerHeight % map.length);
  var ctx = canvas.getContext("2d");
  const cellWidth = canvas.width / map[0].length * 1.0;
  const cellHeight = canvas.height / map.length * 1.0;
  this.collistionStrategy = new PacmanCollisionStartegy(map[0].length, map.length);

  this.Main = function () {
    MapRender(ctx, cellWidth, cellHeight, map);
  }

  this.UpdatePlayer = function (direction) {
    const userPosition = getItemPosition(map, 2);
    if (this.collistionStrategy.checkCollision(direction, userPosition, map)) {
      this.collistionStrategy.updateMap(direction, map, userPosition);
      this.Main();
    }
  }
  var myVar = setInterval(myTimer, 1000);

  function myTimer() {
    console.log("ramapapma");
  }
}

function setUpKeyListeners() {
  document.addEventListener('keydown', (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      maze.UpdatePlayer(event.keyCode);
    }
  }, false);
}

window.maze = maze;
