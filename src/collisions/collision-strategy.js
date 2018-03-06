import ActorDefinitions from '../map-definitions/map-config';

var CollisionStrategy = (function () {
  "use strict";

  var priv = new WeakMap();

  var _ = function (instance) {
    return priv.get(instance);
  };

  function CollisionStrategyConstructor(mapInfo) {
    var privMembers = {
      mapWidth: mapInfo.width,
      mapHeight: mapInfo.height
    };
    priv.set(this, privMembers);
  }

  CollisionStrategyConstructor.prototype.mapUpdater = {
    37: (playerPosition, player, prevValue) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: prevValue ? prevValue : ActorDefinitions.EMPTY
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
    38: (playerPosition, player, prevValue) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: prevValue ? prevValue : ActorDefinitions.EMPTY
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
    39: (playerPosition, player, prevValue) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: prevValue ? prevValue : ActorDefinitions.EMPTY
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
    40: (playerPosition, player, prevValue) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: prevValue ? prevValue : ActorDefinitions.EMPTY
        },
        {
          position: {
            y: playerPosition.y + 1,
            x: playerPosition.x,
          },
          value: player
        }
      ]
    }
  };

  CollisionStrategyConstructor.prototype.checkCollision = function (direction, playerPosition, destination) {
    return this.destinationCheker()[direction](playerPosition, destination)
  };

  CollisionStrategyConstructor.prototype.getPendingPositions = function (direction, playerPosition, destination, destinationValue) {
    return this.mapUpdater[direction](playerPosition, destination, destinationValue);
  };

  CollisionStrategyConstructor.prototype.destinationCheker = function () {
    console.log(_(this).mapWidth);
    console.log(_(this).mapHeight);
    return {
      37: (playerPosition, destination) => ((playerPosition.x - 1 >= 0 && playerPosition.x - 1 < _(this).mapWidth) && destination != ActorDefinitions.WALL),
      39: (playerPosition, destination) => ((playerPosition.x + 1 >= 0 && playerPosition.x + 1 < _(this).mapWidth) && destination != ActorDefinitions.WALL),
      38: (playerPosition, destination) => ((playerPosition.y - 1 >= 0 && playerPosition.y - 1 < _(this).mapHeight) && destination != ActorDefinitions.WALL),
      40: (playerPosition, destination) => ((playerPosition.y + 1 >= 0 && playerPosition.y + 1 < _(this).mapHeight) && destination != ActorDefinitions.WALL)
    }
  };

  CollisionStrategyConstructor.prototype.checkFood = function (destination) {
    return destination == ActorDefinitions.FOOD;
  };

  return CollisionStrategyConstructor;

})();

export default CollisionStrategy;
