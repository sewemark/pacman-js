export default function RedGhost(collisionMoveStrategy, ghostCollisionStrategy, mapManager) {
  var mode = "scatter";
  this.mapManager = mapManager;
  var initData = this.mapManager.getNextTripForGhost(3);
  this.position = initData.initaliGhostPosition;
  var destination = initData.destination;
  this.path = initData.path;
  this.ghostCollisionStrategy = ghostCollisionStrategy;
  this.collisionMoveStrategy = collisionMoveStrategy;

  this.newPositions = [];

  this.getDirection = (position) => {

    var firstPath = this.path.splice(0, 1);
    if (this.path.length == 0) {
      this.path = this.mapManager.getNextTripForGhost(3).path;
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
    if (this.collisionMoveStrategy.checkCollision(direction, this.position, destination)) {
      if (this.ghostCollisionStrategy.checkWin(destination)) {
          alert("GAME OVER");
      }
      this.newPositions = this.collisionMoveStrategy.getNewPositions(direction, this.position, 3);
      this.position = this.newPositions[1].position;
    }

    return this.newPositions;
  };

  this.getNewPositions = () => this.newPositions;


}
