import PF from 'pathfinding';
import ActorDefinitions from './map-definitions/map-config';

export default function MapManager(map, ctx, cellWidth, cellHeight, spiritsManager) {
  this.map = map;
  this.cellHeight = cellHeight;
  this.cellWidth = cellWidth;
  this.ctx = ctx;
  this.grid = new PF.Grid(this.map, [0, 2, 3, 4]);
  this.finder = new PF.AStarFinder();
  this.spiritsManager = spiritsManager;
  this.frame =0;
  this.render = function () {
    for (let i = 0; i < this.map[0].length; i++) {
      for (let j = 0; j < this.map.length; j++) {
        if (this.map[j][i] == 1) {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 0) {
          this.ctx.fillStyle = "white";
          this.ctx.fillRect(Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 4) {
          this.ctx.fillStyle = "white";
          this.ctx.fillRect(Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          this.ctx.fillStyle = "green";
          this.ctx.fillRect(Math.floor((i * this.cellWidth)) + Math.floor(this.cellWidth * 0.25), Math.floor((j * this.cellHeight)) + Math.floor(this.cellHeight * 0.25), Math.floor(this.cellWidth / 2), Math.floor(this.cellHeight / 2));
        } else if (this.map[j][i] == 2) {
          this.ctx.fillStyle = "yellow";
          //var playerSprites = document.createElement("img");
          //playerSprites.src = this.getPacmanSpirit();
          this.ctx.drawImage(this.spiritsManager.getSpirit(2), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          //this.ctx.fillRect(Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 3) {
          this.ctx.fillStyle = "red";
          this.ctx.fillRect(Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        }
      }
    }

  }

  this.generateRandomPoint = function () {
    var yRandom = Math.floor((Math.random() * this.map.length) + 1);
    var xRandom = Math.floor((Math.random() * this.map[0].length) + 1);
    while (!this.map[yRandom] || [0, 4].indexOf(this.map[yRandom][xRandom]) < 0) {
      yRandom = Math.floor((Math.random() * this.map.length));
      xRandom = Math.floor((Math.random() * this.map[0].length));
    }
    return {
      y: yRandom,
      x: xRandom
    }
  }

  this.getItemPosition = function (item) {
    for (var i = 0; i < this.map.length; i++) {
      let index = this.map[i].findIndex(x => x == item)
      if (index >= 0) {
        return {
          y: i,
          x: index
        }
      }
    }
    return {
      y: -1,
      x: -1
    }
  }

  this.getDestinationPosition = function (direction, playerPosition) {
    return this.destinationCheker[direction](playerPosition)
  }

  this.updateMap = function (positions) {
    positions.forEach(item => {
      this.map[item.position.y][item.position.x] = item.value;
    });
  }

  this.destinationCheker = {
    37: (playerPosition) => this.map[playerPosition.y][playerPosition.x - 1],
    39: (playerPosition) => this.map[playerPosition.y][playerPosition.x + 1],
    38: (playerPosition) => this.map[playerPosition.y - 1][playerPosition.x],
    40: (playerPosition) => this.map[playerPosition.y + 1][playerPosition.x],
  };

  this.getNextTripForGhost = function (ghost) {
    this.grid = new PF.Grid(this.map, [0, 2, 3, 4]);
    var init = this.generateRandomPoint();
    var initaliGhostPosition = this.getItemPosition(ghost);

    while (init.x === initaliGhostPosition.x && init.y === initaliGhostPosition.y) {
      init = this.generateRandomPoint();
      initaliGhostPosition = this.getItemPosition(ghost);
    }

    var path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    while (path.length == 0) {
      path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    }

    return {
      init: init,
      initaliGhostPosition: initaliGhostPosition,
      path: path
    }
  }

  this.getLevelWidth = function () {
    return this.map[0].length;
  }

  this.getLevelHeight = function () {
    return this.map.length;
  }

  this.checkWin = function() {
      return this.map.findIndex(x => {
          return x.indexOf(ActorDefinitions.FOOD) >=0;
      }) < 0;

  }
}
