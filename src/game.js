import PacmanCollisionStartegy from './collision-strategy';
import GhostCollisionStartegy from './ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';

export default function Game(mapManager) {

  this.mapManager = mapManager;
  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.redGhost = new RedGhost(this.pacmanMoveStrategy, this.ghostCollisionStrategy, this.mapManager);
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(2));

  this.Start = function () {
    this.mapManager.render();
  }

  this.HandleUserInput = function (direction) {
    const position = this.mapManager.getItemPosition(2);
    common.apply(this, [this.player, direction, position]);
  }

  setInterval(UpdateGohosts.bind(this), 100);

  function UpdateGohosts() {
    const position = this.mapManager.getItemPosition(3);
    var direction = this.redGhost.getDirection(position)
    common.apply(this,[this.redGhost, direction, position]);
  }

  function common(player, direction, position) {
    const destination = this.mapManager.getDestinationPosition(direction, position);
    const temp = player.getNewPosition(direction, destination);
    if (temp.x != position.x || temp.y != position.y) {
      this.mapManager.updateMap(player.getNewPositions());
      this.Start();
    }
  }
}
