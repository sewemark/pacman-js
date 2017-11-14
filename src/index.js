import './index.css';
import level1 from './map-definitions/map';
import getItemPosition from './utils';
import MapRender from './map-render';
import PacmanCollisionStartegy from './collision-strategy';
import GhostCollisionStartegy from './ghost-collision-strategy';
import RedGhost from './red-ghost';
import PF from 'pathfinding';
var maze = new Pacman();

setUpKeyListeners();

function Pacman() {

  var map = level1;
  this.points=0;
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth - (window.innerWidth % map[0].length);
  canvas.height = window.innerHeight - (window.innerHeight % map.length);
  var ctx = canvas.getContext("2d");
  const cellWidth = canvas.width / map[0].length * 1.0;
  const cellHeight = canvas.height / map.length * 1.0;

  this.collistionStrategy = new PacmanCollisionStartegy(map[0].length, map.length);
  this.ghostCollisionStrategy = new GhostCollisionStartegy(map[0].length, map.length);
  var grid = new PF.Grid(level1);
  var finder = new PF.AStarFinder();
  var init = generateRandomPoint(map);
  var initaliGhostPosition = getItemPosition(map, 3);
  var path = finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, grid);
  this.RedGhost = new RedGhost(initaliGhostPosition, init, path);

  this.Main = function () {
    MapRender(ctx, cellWidth, cellHeight, map);
  }

  this.UpdatePlayer = function (direction) {
    const userPosition = getItemPosition(map, 2);
    if (this.collistionStrategy.checkCollision(direction, userPosition, map)) {
      if(this.collistionStrategy.checkFood(direction, userPosition, map)){
        this.points++;
        console.log("Rampampampam");
        console.log(this.points);
      }
      this.map  = this.collistionStrategy.updateMap(direction, map, userPosition, 2);
      this.Main();
    }
  }
  var myVar = setInterval(UpdateGohosts.bind(this), 1000);

  function UpdateGohosts() {
    const ghostPostion = getItemPosition(map, 3);
    if (this.RedGhost.path.length == 0) {
      var grid = new PF.Grid(level1);
      var init = generateRandomPoint(map);
      var path = finder.findPath(ghostPostion.x, ghostPostion.y, init.x, init.y, grid);
      this.RedGhost.path = path;
    }
    var direction = this.RedGhost.getDirection(ghostPostion)
    if (this.collistionStrategy.checkCollision(direction, ghostPostion, map)) {
      if(this.ghostCollisionStrategy.checkWin(direction, ghostPostion, map)){
           alert("GAME OVER");
      }
      this.collistionStrategy.updateMap(direction, map, ghostPostion, 3);
      this.Main();
    }
  }
}

function generateRandomPoint(map) {
  var yRandom = Math.floor((Math.random() * map.length) + 1);
  var xRandom = Math.floor((Math.random() * map[0].length) + 1);
  while (map[yRandom][xRandom] != 0) {
    yRandom = Math.floor((Math.random() * map.length) + 1);
    xRandom = Math.floor((Math.random() * map[0].length) + 1);
  }
  return {
    y: yRandom,
    x: xRandom
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
