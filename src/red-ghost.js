import ActorDefinitions from './map-definitions/map-config';


export default function RedGhost(ghostCollisionStrategy, mapManager) {
  this.mapManager = mapManager;
  var initData = this.mapManager.getNextTripForGhost(ActorDefinitions.REDGHOST);
  this.position = initData.initaliGhostPosition;
  this.path = initData.path;
  this.ghostCollisionStrategy = ghostCollisionStrategy;
  this.newPositions = [];

  this.getDirection = (position) => {
    var firstPath = this.path.splice(0, 1);
    if (this.path.length == 0) {
      this.path = this.mapManager.getNextTripForGhost(ActorDefinitions.REDGHOST).path;
    }
    if (firstPath[0][0] == position.x) {
      if (firstPath[0][1] > position.y) return 40;
      else return 38;

    } else {
      if (firstPath[0][0] > position.x) return 39;
      else return 37;
    }
  }

  this.getNewPosition = (direction, destination) => {
    if (this.ghostCollisionStrategy.checkCollision(direction, this.position, destination)) {
        this.newPositions = this.ghostCollisionStrategy.getPendingPositions(direction, this.position, ActorDefinitions.REDGHOST, destination);
        this.position = this.newPositions[1].position;
    }
    return this.newPositions;
  };

  this.getPendingPositions = () => this.newPositions;

}
