import ActorDefinitions from "../map-definitions/map-config";

export default function Player(pacmanMoveStrategy, playerPosition) {
  this.points = 0;
  this.lifes = 2;
  this.playerPosition = playerPosition;
  this.pacmanMoveStrategy = pacmanMoveStrategy;
  this.initialPosition = Object.assign({}, playerPosition);
  this.newPositions = [];

  this.actions = {
    101 : () => alert("GAME OVER Z PACMANA"),
    4: () =>   this.points++
  };

  this.canMoveToPosition = (direction, destination) => {
    return this.pacmanMoveStrategy.checkCollision(direction, this.playerPosition, destination)
  };

  this.getNewPosition = (direction, destination) => {
      if(this.actions.hasOwnProperty(destination)) this.actions[destination]();
      this.newPositions = this.pacmanMoveStrategy.getPendingPositions(direction, this.playerPosition, 2, destination);
      this.playerPosition = this.newPositions[1].position;
      return this.newPositions;
  };

  this.getActorValue = function () {
    return ActorDefinitions.PLAYER;
  }

  this.getPendingPositions = () => this.newPositions;
  this.getLifes = () => this.lifes;
  this.getPoints = () => this.points;
  this.reduceLife = () => this.lifes = this.lifes -1;
  this.resetPosition = () => this.playerPosition = Object.assign({}, this.initialPosition);

}
