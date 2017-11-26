import PacmanCollisionStartegy from './collision-strategy';
import GhostCollisionStartegy from './ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';

export default function Game(mapManager) {

  this.mapManager = mapManager;
  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.redGhost = new RedGhost(this.mapManager.getNextTripForGhost(3));
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(2));

  this.Start = function () {
    this.mapManager.render();
  }

  this.HandleUserInput = function (direction) {
    const playerPosition = this.mapManager.getItemPosition(2);
    const destination = this.mapManager.getDestinationPosition(direction, playerPosition);
    const temp = this.player.getNewPosition(direction, destination);
    if ( temp.x != playerPosition.x || temp.y != playerPosition.y) {
      this.mapManager.updateMap(this.player.getNewPositions());
      this.Start();
    }
  }

  setInterval(UpdateGohosts.bind(this), 100);

  function UpdateGohosts() {
    if (this.redGhost.path.length == 0) {
      var path = this.mapManager.getNextTripForGhost(3).path;
      this.redGhost.path = path;
    }
    const ghostPostion = this.mapManager.getItemPosition(3);
    var direction = this.redGhost.getDirection(ghostPostion)

    const destination = this.mapManager.getDestinationPosition(direction, ghostPostion);

    if (this.pacmanMoveStrategy.checkCollision(direction, ghostPostion, destination)) {
      if (this.ghostCollisionStrategy.checkWin(destination)) {
        alert("GAME OVER");
      }
      //this.collistionStrategy.updateMap(direction, map, ghostPostion, 3);
      var positions = this.pacmanMoveStrategy.getNewPositions(direction, ghostPostion, 3);
      this.mapManager.updateMap(positions);
      this.Start();
    }
  }
}
