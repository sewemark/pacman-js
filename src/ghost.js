import ActorDefinitions from './map-definitions/map-config';

var Ghost =  (function () {
  "use strict"
   var protectedMembers;

   function GhostConstructor(ghostCollisionStrategy, mapManager, members) {
    protectedMembers = members || {
      mapManager:mapManager,
      initData:{},
      position: undefined,
      path: undefined,
      ghostCollisionStrategy: ghostCollisionStrategy,
      newPositions: []
    }
  }

  GhostConstructor.prototype.getDirection = (position) => {
    var firstPath = protectedMembers.path.splice(0, 1);

    if (protectedMembers.path.length == 0) {
      protectedMembers.path = protectedMembers.mapManager.getNextTripForGhost(ActorDefinitions.REDGHOST).path;
    }
    if (firstPath[0][0] == position.x) {
      if (firstPath[0][1] > position.y) return 40;
      else return 38;

    } else {
      if (firstPath[0][0] > position.x) return 39;
      else return 37;
    }
  };

  GhostConstructor.prototype.getNewPosition = (direction, destination) => {
    if (protectedMembers.ghostCollisionStrategy.checkCollision(direction, protectedMembers.position, destination)) {
        protectedMembers.newPositions = protectedMembers.ghostCollisionStrategy.getPendingPositions(direction, protectedMembers.position, ActorDefinitions.REDGHOST, destination);
        protectedMembers.position = protectedMembers.newPositions[1].position;
    }
    return protectedMembers.newPositions;
  };

  GhostConstructor.prototype.getPendingPositions = () => protectedMembers.newPositions;

  return GhostConstructor;

})();

export  default  Ghost;
