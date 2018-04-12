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

  this.CanMoveToPosition = (direction, destination) => {
    return this.pacmanMoveStrategy.CheckCollision(direction, this.playerPosition, destination)
  };

  this.GetNewPosition = (direction, destination) => {
      if(this.actions.hasOwnProperty(destination)) {
        this.actions[destination]();
      }
      this.newPositions = this.pacmanMoveStrategy.GetPendingPositions(direction, this.playerPosition, 2, destination);
      this.playerPosition = this.newPositions[1].position;
      return this.newPositions;
  };

  this.GetActorValue = function () {
    return ActorDefinitions.PLAYER;
  };

  this.GetPendingPositions = () => this.newPositions;
  this.GetLifes = () => this.lifes;
  this.GetPoints = () => this.points;
  this.ReduceLife = () => this.lifes = this.lifes -1;
  this.ResetPosition = () => this.playerPosition = Object.assign({}, this.initialPosition);

}
