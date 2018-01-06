import ActorDefinitions from './../map-definitions/map-config';
import CollisionStrategy from './collision-strategy';

var PacmanCollisionStartegy = (function () {
  "use strict";
  var priv = new WeakMap();
  var _ = function (instance) {
    return priv.get(instance);
  }

  function PacmanCollisionStartegyConstructor(mapHeight, mapWidth) {
      priv.set(this, {mapWidth:mapWidth, mapHeight: mapHeight});
      CollisionStrategy.apply(this, arguments);
  }

  PacmanCollisionStartegyConstructor.prototype = Object.create(CollisionStrategy.prototype);

  PacmanCollisionStartegyConstructor.prototype.checkFood = function (destination) {
    return destination == ActorDefinitions.FOOD;
  }

  PacmanCollisionStartegyConstructor.prototype.checkLoose = function (destination) {
    return ActorDefinitions.GHOSTS.findIndex(d=> d === destination) >= 0;
  }

  PacmanCollisionStartegyConstructor.prototype.mapUpdater = {
    37: (playerPosition, player, destinationValue) => {
      return [{
        position: {
          y: playerPosition.y,
          x: playerPosition.x
        },
        value: ActorDefinitions.EMPTY
      },
        {
          position: {
            y: playerPosition.y,
            x: playerPosition.x - 1
          },
          value: ActorDefinitions.GHOSTS.indexOf(destinationValue)>=0 ? destinationValue : player
        }
      ]
    },
    38: (playerPosition, player, destinationValue) => {
      return [{
        position: {
          y: playerPosition.y,
          x: playerPosition.x
        },
        value: ActorDefinitions.EMPTY
      },
        {
          position: {
            y: playerPosition.y - 1,
            x: playerPosition.x
          },
          value: ActorDefinitions.GHOSTS.indexOf(destinationValue)>=0 ? destinationValue : player
        }
      ]
    },
    39: (playerPosition, player, destinationValue) => {
      return [{
        position: {
          y: playerPosition.y,
          x: playerPosition.x
        },
        value: ActorDefinitions.EMPTY
      },
        {
          position: {
            y: playerPosition.y,
            x: playerPosition.x + 1
          },
          value: ActorDefinitions.GHOSTS.indexOf(destinationValue)>=0 ? destinationValue : player
        }
      ]
    },
    40: (playerPosition, player, destinationValue) => {
      return [{
        position: {
          y: playerPosition.y,
          x: playerPosition.x
        },
        value: ActorDefinitions.EMPTY
      },
        {
          position: {
            y: playerPosition.y + 1,
            x: playerPosition.x,
          },
          value: ActorDefinitions.GHOSTS.indexOf(destinationValue)>=0 ? destinationValue : player
        }
      ]
    }
  }
  return PacmanCollisionStartegyConstructor;

})();

export default PacmanCollisionStartegy;
