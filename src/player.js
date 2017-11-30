export default function Player(pacmanMoveStrategy, playerPosition) {
  this.points = 0;
  this.playerPosition = playerPosition;
  this.newPositions = [];
  this.pacmanMoveStrategy = pacmanMoveStrategy;

  this.getNewPosition = (direction, destination) => {
    if (this.pacmanMoveStrategy.checkCollision(direction, this.playerPosition, destination)) {
      if (this.pacmanMoveStrategy.checkFood(destination)) {
        this.points++;
      }
      this.newPositions = this.pacmanMoveStrategy.getNewPositions(direction, this.playerPosition, 2);
      this.playerPosition = this.newPositions[1].position;
    }
    return this.playerPosition;
  };

  this.getNewPositions = () => this.newPositions;




}
