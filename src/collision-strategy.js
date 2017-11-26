export default function PacmanCollisionStartegy(mapHeight, mapWidth) {

  this.mapHeight = mapHeight;
  this.mapWidth = mapWidth;
  this.map = new Array();

  this.destinationCheker = {
    37: (playerPosition,destination) => (playerPosition.x - 1 >= 0 || playerPosition.x - 1 < mapWidth) && destination != 1,
    39: (playerPosition,destination) => (playerPosition.x + 1 >= 0 || playerPosition.x + 1 < mapWidth) && destination != 1,
    38: (playerPosition,destination) => (playerPosition.y - 1 >= 0 || playerPosition.y - 1 < mapHeight) && destination != 1,
    40: (playerPosition,destination) => (playerPosition.y + 1 >= 0 || playerPosition.y + 1 < mapHeight) && destination != 1
  };

  this.mapUpdater = {
    37: (playerPosition, player) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: 0
        },
        {
          position: {
            y: playerPosition.y,
            x: playerPosition.x - 1
          },
          value: player
        }
      ]
    },
    38: (playerPosition, player) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: 0
        },
        {
          position: {
            y: playerPosition.y - 1,
            x: playerPosition.x
          },
          value: player
        }
      ]
    },
    39: (playerPosition, player) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: 0
        },
        {
          position: {
            y: playerPosition.y,
            x: playerPosition.x + 1
          },
          value: player
        }
      ]
    },
    40: (playerPosition, player) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: 0
        },
        {
          position: {
            y: playerPosition.y + 1,
            x: playerPosition.x,
          },
          value: player
        }
      ]
    },

  }

  this.checkCollision = function (direction, playerPosition, destination) {
    return this.destinationCheker[direction](playerPosition, destination);

  }

  this.getNewPositions = function (direction, playerPosition, destination) {
   return this.mapUpdater[direction](playerPosition,destination);
  }

  this.checkFood = function (destination) {
    return destination == 4;
  }


};
