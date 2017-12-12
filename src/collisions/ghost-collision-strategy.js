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


  return GhostCollisionStartegyConstructor;
})();

export default GhostCollisionStartegy;
