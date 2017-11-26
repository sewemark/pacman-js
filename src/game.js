import PacmanCollisionStartegy from './collision-strategy';
import GhostCollisionStartegy from './ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';

export default function Game(mapManager) {

  this.mapManager = mapManager;
  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.redGhost = new RedGhost(this.mapManager.getNextTripForGhost(3));
  this.player = new Player();

  this.Start = function () {
    this.mapManager.render();
  }

  this.HandleUserInput = function (direction) {
    const playerPosition = this.mapManager.getItemPosition(2);
    const destination = this.mapManager.getDestinationPosition(direction, playerPosition);
    if (this.pacmanMoveStrategy.checkCollision(direction, playerPosition, destination)) {
      if (this.pacmanMoveStrategy.checkFood(destination)) {
        this.player.points++;
      }
      var positions = this.pacmanMoveStrategy.getNewPositions(direction, playerPosition, 2);
      this.mapManager.updateMap(positions);
      this.Start();
    }
  }

  setInterval(UpdateGohosts.bind(this), 100);

  function UpdateGohosts() {
     if (this.redGhost.path.length == 0) {
       console.log("ADDDING");
         var path = this.mapManager.getNextTripForGhost(3).path;
         this.redGhost.path =path;
     }
     const ghostPostion = this.mapManager.getItemPosition(3);
     var direction = this.redGhost.getDirection(ghostPostion)

     const destination = this.mapManager.getDestinationPosition(direction, ghostPostion);

     if (this.pacmanMoveStrategy.checkCollision(direction, ghostPostion, destination)) {
       if(this.ghostCollisionStrategy.checkWin(destination)){
            alert("GAME OVER");
       }
      //this.collistionStrategy.updateMap(direction, map, ghostPostion, 3);
      var positions = this.pacmanMoveStrategy.getNewPositions(direction, ghostPostion, 3);
      this.mapManager.updateMap(positions);
       this.Start();
     }
   }
}
