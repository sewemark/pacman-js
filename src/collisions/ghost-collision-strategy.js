import ActorDefinitions from '../map-definitions/map-config';
import CollisionStrategy from './collision-strategy';

var GhostCollisionStartegy = (function () {
  "use strict";

  var priv = new WeakMap();

  var _ = function (instance) {
    return priv.get(instance);
  }

  function GhostCollisionStartegyConstructor(mapInfo) {

    priv.set(this, {
      mapWidth: mapInfo.width, mapHeight: mapInfo.height,
      cache: new Array()
    });
    CollisionStrategy.apply(this, arguments);
  }

  GhostCollisionStartegyConstructor.prototype = Object.create(CollisionStrategy.prototype);

  GhostCollisionStartegyConstructor.prototype.CheckWin = function (destination) {
    return destination === ActorDefinitions.PLAYER;
  };

  GhostCollisionStartegyConstructor.prototype.CheckCollisionWithOther = function (destination) {
    return ActorDefinitions.GHOSTS.indexOf(destination) >= 0;
  };

  GhostCollisionStartegyConstructor.prototype.GetPendingPositions = function (direction, playerPosition, destination, destinationValue, ghost) {
    return this.mapUpdater()[direction](playerPosition, destination, destinationValue, ghost);
  };

  GhostCollisionStartegyConstructor.prototype.mapUpdater = function () {
    return {
      37: (playerPosition, player, prevValue) => {
        if (prevValue === ActorDefinitions.FOOD ) {
          _(this).cache.push({y: playerPosition.y, x: playerPosition.x - 1});
        }
        const index = _(this).cache.findIndex(x => x.x === playerPosition.x && x.y == playerPosition.y);
        const oldValue = index >= 0 ? _(this).cache.splice(index, 1) : undefined;

        return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: oldValue ? ActorDefinitions.FOOD : ActorDefinitions.EMPTY
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
        if (prevValue === ActorDefinitions.FOOD ) {
          _(this).cache.push({y: playerPosition.y - 1, x: playerPosition.x});
        }
        const index = _(this).cache.findIndex(x => x.x === playerPosition.x && x.y == playerPosition.y);
        const oldValue = index >= 0 ? _(this).cache.splice(index, 1) : undefined;
        return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: oldValue ? ActorDefinitions.FOOD : ActorDefinitions.EMPTY
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
        if (prevValue === ActorDefinitions.FOOD ) {
          _(this).cache.push({y: playerPosition.y, x: playerPosition.x + 1});
        }
        const index = _(this).cache.findIndex(x => x.x === playerPosition.x && x.y == playerPosition.y);
        const oldValue = index >= 0 ? _(this).cache.splice(index, 1) : undefined;
        return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: oldValue ? ActorDefinitions.FOOD : ActorDefinitions.EMPTY
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
        if (prevValue === ActorDefinitions.FOOD ) {
          _(this).cache.push({y: playerPosition.y + 1, x: playerPosition.x,});
        }
        const index = _(this).cache.findIndex(x => x.x === playerPosition.x && x.y === playerPosition.y);
        const oldValue = index >= 0 ? _(this).cache.splice(index, 1) : undefined;
        return [{
          position: {
            y: playerPosition.y,
            x: playerPosition.x
          },
          value: oldValue ? ActorDefinitions.FOOD : ActorDefinitions.EMPTY
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
  };

  return GhostCollisionStartegyConstructor;
})();

export default GhostCollisionStartegy;
