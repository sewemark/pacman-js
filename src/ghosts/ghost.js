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
      GHOST: ActorDefinitions.EMPTY,
      mode: 'bad'
    };
    priv.set(this, privMembers);

  }

  GhostConstructor.prototype.CheckCollisionWithOther = function (destination) {
    return _(this).ghostCollisionStrategy.CheckCollisionWithOther(destination);
  };

  GhostConstructor.prototype.GetNextGhostPath = function (position) {
      return getNextTrip.call(this);

      function getNextTrip() {
        let c = _(this).path;

        if(!c || (c.length ==0 || _(this).path.length ==1)){
          let a = _(this).path;
          let b = a;
        }
        var firstPath = _(this).path.splice(0, 1);
        if(!firstPath || !firstPath[0]) {
          console.log(firstPath);

          return undefined;
        }
        while (firstPath && firstPath[0][0] === position.x && firstPath[0][1] === position.y) {
          firstPath = _(this).path.splice(0, 1);
        }
        return firstPath;
      }
  };

  GhostConstructor.prototype.CheckIfNoMoreMoves = function() {
    return _(this).path.length <= 2;
  };

  GhostConstructor.prototype.SetPath = function (newPath) {
    _(this).path = newPath;
  };

  GhostConstructor.prototype.GetDirection = function (firstPath, position) {
    let direction;
    if (firstPath[0] === position.x) {
      if (firstPath[1] > position.y) direction = 40;
      else direction = 38;
    } else {
      if (firstPath[0] > position.x) direction = 39;
      else direction = 37;
    }

    return direction

  };

  GhostConstructor.prototype.ResestPosition = function () {
    _(this).path.splice(0, _(this).path.length);

  };

  GhostConstructor.prototype.CheckCollision = function (direction, position, destination) {
    if (!_(this).ghostCollisionStrategy.CheckCollision(direction, position, destination)) {
      _(this).path.splice(0, _(this).path.length);
      return false;
    }
    return true;
  };

  GhostConstructor.prototype.GetNewPosition = function (direction, destination) {
    if (_(this).ghostCollisionStrategy.CheckCollision(direction, _(this).position, destination)) {
      _(this).newPositions = _(this).ghostCollisionStrategy.GetPendingPositions(direction, _(this).position, _(this).GHOST, destination, this);
      _(this).position = _(this).newPositions[1].position;
    }
    return _(this).newPositions;
  };

  GhostConstructor.prototype.GetPendingPositions = function () {
    return _(this).newPositions;
  };

  GhostConstructor.prototype.GetActorValue = function () {
    return _(this).GHOST;
  };

  GhostConstructor.prototype.IsEasyMode = function () {
    return _(this).mode === "easy";
  };

  GhostConstructor.prototype.ReverseMode = function () {
    if( _(this).mode === "bad") {
      _(this).mode = "easy";
    }
    else {
      _(this).mode = "easy";
    }
  }

  return GhostConstructor;

})();

export default Ghost;
