import ActorDefinitions from './map-definitions/map-config';

var Ghost =  (function () {


  var priv = new WeakMap();

  var  _ = function (inst) {
    return priv.get(inst);
  }

   function GhostConstructor(ghostCollisionStrategy, mapManager, protectedMembers) {
     var data = {};
     var privMembers = protectedMembers||  {
       mapManager: mapManager,
       initData: data,
       position: data.initaliGhostPosition,
       path: data.path,
       ghostCollisionStrategy: ghostCollisionStrategy,
       newPositions: [],
       GHOST: ActorDefinitions.EMPTY
     }
     priv.set(this, protectedMembers);

  }
  GhostConstructor.prototype.sayName = function(){
  }
  GhostConstructor.prototype.getDirection = function(position)  {
    var firstPath = _(this).path.splice(0, 1);

    if (_(this).path.length == 0) {
      do {
        _(this).path = _(this).mapManager.getNextTripForGhost(_(this).GHOST).path;
      } while (_(this).path.length ==0);


      firstPath = _(this).path.splice(0, 1);

      while(firstPath[0][0] == position.x &&
            firstPath[0][1] == position.y)
      {
        firstPath = _(this).path.splice(0, 1);
      }
    }
    if (firstPath[0][0] == position.x) {
      if (firstPath[0][1] > position.y) return 40;
      else return 38;

    } else {
      if (firstPath[0][0] > position.x) return 39;
      else return 37;
    }
  };

  GhostConstructor.prototype.getNewPosition = function(direction, destination)  {
    if (_(this).ghostCollisionStrategy.checkCollision(direction, _(this).position, destination)) {
      _(this).newPositions = _(this).ghostCollisionStrategy.getPendingPositions(direction, _(this).position, _(this).GHOST, destination);
      _(this).position = _(this).newPositions[1].position;
    } else {
     /* _(this).path = _(this).path.splice(0, _(this).path.length);
      do {
        _(this).path = _(this).mapManager.getNextTripForGhost(_(this).GHOST).path;
      } while (_(this).path.length ==0)
      this.getNewPosition((direction,destination));
*/
    }
    return _(this).newPositions;
  };

  GhostConstructor.prototype.getPendingPositions = function() {
    return _(this).newPositions;
  }

  return GhostConstructor;

})();

export  default  Ghost;
