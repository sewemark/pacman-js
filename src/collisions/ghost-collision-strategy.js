import ActorDefinitions from '../map-definitions/map-config';
import CollisionStrategy from './collision-strategy';

var GhostCollisionStartegy = (function () {
  "use strict";
  var priv = new WeakMap();
  var _ = function (instance) {
    return priv.get(instance);
  }

  function GhostCollisionStartegyConstructor(mapHeight, mapWidth) {
      priv.set(this, {mapWidth:mapWidth, mapHeight: mapHeight});
      CollisionStrategy.apply(this, arguments);
  }
  GhostCollisionStartegyConstructor.prototype = Object.create(CollisionStrategy.prototype);
  GhostCollisionStartegyConstructor.prototype.checkWin = function (destination) {
    return destination == ActorDefinitions.PLAYER;
  }

  GhostCollisionStartegyConstructor.prototype.mapUpdater = {
    37: (playerPosition, player, prevValue) => {
      return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: prevValue == ActorDefinitions.FOOD ? prevValue : ActorDefinitions.EMPTY
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
          value: prevValue == ActorDefinitions.FOOD ? prevValue : ActorDefinitions.EMPTY
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
          value: prevValue == ActorDefinitions.FOOD ? prevValue : ActorDefinitions.EMPTY
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
          value: prevValue == ActorDefinitions.FOOD ? prevValue : ActorDefinitions.EMPTY
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
  }


  return GhostCollisionStartegyConstructor;
})();

export default GhostCollisionStartegy;
