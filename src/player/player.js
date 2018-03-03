export default function Player(pacmanMoveStrategy, playerPosition) {
  this.points = 0;
  this.lifes = 2;
  this.playerPosition = playerPosition;
  this.pacmanMoveStrategy = pacmanMoveStrategy;
  this.initialPosition = Object.assign({}, playerPosition);
  this.newPositions = [];

  this.getNewPosition = (direction, destination) => {
    if (this.pacmanMoveStrategy.checkCollision(direction, this.playerPosition, destination)) {
      if (this.pacmanMoveStrategy.checkFood(destination)) {
          this.points++;
      }

      //TODO przenies to sprawdzanie wyzej
      if (this.pacmanMoveStrategy.checkLoose(destination)) {
          alert("GAME OVER Z PACMANA");
      }
      this.newPositions = this.pacmanMoveStrategy.getPendingPositions(direction, this.playerPosition, 2, destination);
      this.playerPosition = this.newPositions[1].position;
    }
    return this.newPositions[1].position;
  };
  this.getPendingPositions = () => this.newPositions;
  this.getLifes = () => this.lifes;
  this.getPoints = () => this.points;
  this.reduceLife = () => this.lifes = this.lifes -1;
  this.resetPosition = () => this.playerPosition = Object.assign({}, this.initialPosition);

}
