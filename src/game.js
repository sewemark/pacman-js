import PacmanCollisionStartegy from './collisions/pacman-collision-strategy';
import GhostCollisionStartegy from './collisions/ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';

import EventEmitter from 'events';

export default function Game(mapManager, spiritesManager, uiInterfaceAdapter) {

  this.mapManager = mapManager;
  this.spiritesManager = spiritesManager;
  this.uiInterfaceAdapter = uiInterfaceAdapter;
  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.redGhost = new RedGhost(this.ghostCollisionStrategy, this.mapManager);
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(2));
  this.ghostIntervalId;
  this.Start = function () {
    this.mapManager.render();
    this.uiInterfaceAdapter.updateUserInfo({
      playerPoints:this.player.getPoints(),
      playerLifes: this.player.getLifes()
    });
  }

  this.renderUI = function () {


  }

  this.HandleUserInput = function (direction) {
    if( this.player.getLifes() == 0 )
      return;
    const position = this.mapManager.getItemPosition(2);
    if(position.x == -1 && position.y == -1)
    {
      return;
    }
    common.apply(this, [this.player, direction, position]);
    this.spiritesManager.updateSpirit(direction);
    if (this.mapManager.checkWin()) {
      alert('wygrales');
    }
  }

  this.ghostIntervalId = setInterval(UpdateGohosts.bind(this),100);

  function UpdateGohosts() {
    const position = this.mapManager.getItemPosition(3);
    if(position.x == -1 && position.y == -1) {
      return;
    }
    var direction = this.redGhost.getDirection(position)
    common.apply(this, [this.redGhost, direction, position]);
  }

  function common(player, direction, position) {

    const destination = this.mapManager.getDestinationPosition(direction, position);
    const temp = player.getNewPosition(direction, destination);
    if (temp.x != position.x || temp.y != position.y) {
      if(player instanceof  RedGhost){
      }
      this.mapManager.updateMap(player.getNewPositions());
      this.Start();
    }
    if (this.mapManager.checkLoose()) {
      this.player.reduceLife();
      this.checkGameState();
    }
  }

  this.checkGameState = function() {
    if (this.player.getLifes() <= 0) {
      alert("Mniej zyc");
      clearInterval(this.ghostIntervalId);

      this.Start();

    } else {
      this.mapManager.resetPlayer();
      this.player.resetPosition();
    }
  }
  this.close = function () {
    clearInterval(this.ghostIntervalId);
  }
}
Game.prototype = Object.create(EventEmitter.prototype);
