import ActorDefinitions from '../map-definitions/map-config';
import CollisionStrategy from './collision-strategy';

var GhostCollisionStartegy = (function () {
  "use strict";
  var priv = new WeakMap();

  var _ = function (instance) {
    return priv.get(instance);
  }

  function GhostCollisionStartegyConstructor(mapInfo) {
      priv.set(this, {mapWidth:mapInfo.width, mapHeight: mapInfo.height});
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
          value: (prevValue == ActorDefinitions.FOOD || ActorDefinitions.GHOSTS.indexOf(prevValue) >= 0 )  ? prevValue : ActorDefinitions.EMPTY
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
          value: (prevValue == ActorDefinitions.FOOD || ActorDefinitions.GHOSTS.indexOf(prevValue) >= 0 ) ? prevValue : ActorDefinitions.EMPTY
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
          value: (prevValue == ActorDefinitions.FOOD || ActorDefinitions.GHOSTS.indexOf(prevValue) >= 0 ) ? prevValue : ActorDefinitions.EMPTY
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
          value: (prevValue == ActorDefinitions.FOOD || ActorDefinitions.GHOSTS.indexOf(prevValue) >= 0 ) ? prevValue : ActorDefinitions.EMPTY
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
