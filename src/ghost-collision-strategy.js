export default function GhostCollisionStartegy(mapHeight, mapWidth) {

  this.mapHeight = mapHeight;
  this.mapWidth = mapWidth;
  this.map = new Array();

  this.destinationCheker = {
    37: (playerPosition) => (playerPosition.x - 1 >= 0 || playerPosition.x - 1 < mapWidth) && this.map[playerPosition.y][playerPosition.x-1] != 1,
    39: (playerPosition) => (playerPosition.x + 1 >= 0 || playerPosition.x + 1 < mapWidth)  && this.map[playerPosition.y][playerPosition.x +1] != 1,
    38: (playerPosition) => (playerPosition.y - 1 >= 0 || playerPosition.y - 1 < mapHeight) && this.map[playerPosition.y-1][playerPosition.x] != 1,
    40: (playerPosition) => (playerPosition.y + 1 >= 0 || playerPosition.y + 1 < mapHeight) && this.map[playerPosition.y +1][playerPosition.x] != 1
  };

  this.mapUpdater = {
    37: (map, playerPosition, player) => {
      map[playerPosition.y][playerPosition.x] = 0;
      map[playerPosition.y][playerPosition.x - 1] = player;
    },
    39: (map,playerPosition, player) => {
      map[playerPosition.y][playerPosition.x] = 0;
      map[playerPosition.y][playerPosition.x + 1] = player;
    },
    38: (map,playerPosition, player) => {
      map[playerPosition.y][playerPosition.x] = 0;
      map[playerPosition.y - 1][playerPosition.x] = player;
    },
    40: (map, playerPosition, player) => {
      map[playerPosition.y][playerPosition.x] = 0;
      map[playerPosition.y + 1][playerPosition.x] = player;
    },
  }

  this.checkCollision= function(destinationDirection, playerPosition, map) {
    this.map = map;
   return this.destinationCheker[destinationDirection](playerPosition);

  }

  this.updateMap = function(destinationDirection, map, playerPosition, player) {
    return this.mapUpdater[destinationDirection](map, playerPosition, player);

  }

  this.checkWin = function (destination) {
    return destination == 2;
  }

  this.win = {
    37: (playerPosition) =>  this.map[playerPosition.y][playerPosition.x-1] ==2,
    39: (playerPosition) =>  this.map[playerPosition.y][playerPosition.x +1] == 2,
    38: (playerPosition) =>  this.map[playerPosition.y-1][playerPosition.x] == 2,
    40: (playerPosition) =>  this.map[playerPosition.y +1][playerPosition.x] == 1
  };


};
