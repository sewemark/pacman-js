export default function Player(pacmanMoveStrategy, playerPosition) {
  this.points = 0;
  this.lifs = 1;
  this.playerPosition = playerPosition;
  this.initPosition = Object.assign({}, playerPosition);
  this.newPositions = [];
  this.pacmanMoveStrategy = pacmanMoveStrategy;

  this.getNewPosition = (direction, destination) => {
    if (this.pacmanMoveStrategy.checkCollision(direction, this.playerPosition, destination)) {
      if (this.pacmanMoveStrategy.checkFood(destination)) {
          this.points++;
      }
      if (this.pacmanMoveStrategy.checkLoose(destination)) {
          alert("GAME OVER Z PACMANA");
      }
      this.newPositions = this.pacmanMoveStrategy.getNewPositions(direction, this.playerPosition, 2);
      this.playerPosition = this.newPositions[1].position;
    }
    return this.playerPosition;
  };

  this.getNewPositions = () => this.newPositions;
  this.getLifes = () => this.lifs;
  this.getPoints = () => this.points;
  this.reduceLife = () => this.lifs--;
  this.resetPosition = () => {
    this.playerPosition = Object.assign({}, this.initPosition);
  };

}
