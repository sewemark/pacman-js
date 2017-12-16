import PacmanCollisionStartegy from './collisions/pacman-collision-strategy';
import GhostCollisionStartegy from './collisions/ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';

export default function Game(mapManager,spiritesManager) {

  this.mapManager = mapManager;
  this.spiritesManager = spiritesManager;
  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.redGhost = new RedGhost(this.ghostCollisionStrategy, this.mapManager);
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(2));

  this.Start = function () {
    this.mapManager.render();
  }

  this.HandleUserInput = function (direction) {
    const position = this.mapManager.getItemPosition(2);
    common.apply(this, [this.player, direction, position]);
    this.spiritesManager.updateSpirit(direction);
    if (this.mapManager.checkWin()) {
      alert('wygrales');
    }
  }

  setInterval(UpdateGohosts.bind(this), 100);

  function UpdateGohosts() {
    const position = this.mapManager.getItemPosition(3);
    var direction = this.redGhost.getDirection(position)
    common.apply(this, [this.redGhost, direction, position]);
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
