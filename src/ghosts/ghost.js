import ActorDefinitions from '../map-definitions/map-config';

var Ghost = (function () {

  var priv = new WeakMap();

  var _ = function (inst) {
    return priv.get(inst);
  };

  function GhostConstructor(ghostCollisionStrategy, mapManager, protectedMembers) {
    const data = {};
    const privMembers = protectedMembers || {
      mapManager: mapManager,
      initData: data,
      position: data.initaliGhostPosition,
      path: data.path,
      ghostCollisionStrategy: ghostCollisionStrategy,
      newPositions: [],
      GHOST: ActorDefinitions.EMPTY
    };
    priv.set(this, privMembers);

  }

  GhostConstructor.prototype.checkCollisionWithOther = function (destination) {
    return _(this).ghostCollisionStrategy.checkCollisionWithOther(destination);
  };


  GhostConstructor.prototype.getNextGhostPath = function (position) {
      return getNextTrip.call(this)

      function getNextTrip() {
        var firstPath = _(this).path.splice(0, 1);
        while (firstPath[0][0] == position.x && firstPath[0][1] == position.y) {
          firstPath = _(this).path.splice(0, 1);
        }
        return firstPath;
      }
  };

  GhostConstructor.prototype.checkIfNoMoreMoves = function() {
    return _(this).path.length == 0
  };

  GhostConstructor.prototype.setPath = function (newPath) {
    _(this).path = newPath;
  };

  GhostConstructor.prototype.getDirection = function (firstPath, position) {
    let direction;
    if (firstPath[0] == position.x) {
      if (firstPath[1] > position.y) direction = 40;
      else direction = 38;
    } else {
      if (firstPath[0] > position.x) direction = 39;
      else direction = 37;
    }

    return direction

  };

  GhostConstructor.prototype.resestPosition = function () {
    _(this).path.splice(0, _(this).path.length);

  };

  GhostConstructor.prototype.checkCollision = function (direction, position, destination) {
    if (!_(this).ghostCollisionStrategy.checkCollision(direction, position, destination)) {
      _(this).path.splice(0, _(this).path.length);
      return false;
    }
    return true;
  };

  GhostConstructor.prototype.getNewPosition = function (direction, destination) {
    if (_(this).ghostCollisionStrategy.checkCollision(direction, _(this).position, destination)) {
      _(this).newPositions = _(this).ghostCollisionStrategy.getPendingPositions(direction, _(this).position, _(this).GHOST, destination);
      _(this).position = _(this).newPositions[1].position;
    }
    return _(this).newPositions;
  };

  GhostConstructor.prototype.getPendingPositions = function () {
    return _(this).newPositions;
  };

  GhostConstructor.prototype.getActorValue = function () {
    return _(this).GHOST;
  };

  return GhostConstructor;

})();

export default Ghost;
