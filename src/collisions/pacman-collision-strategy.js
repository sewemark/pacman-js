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

  return PacmanCollisionStartegyConstructor;

})();

export default PacmanCollisionStartegy;
