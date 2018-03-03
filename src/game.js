import PacmanCollisionStartegy from './collisions/pacman-collision-strategy';
import GhostCollisionStartegy from './collisions/ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';
import ActorDefinitions  from './map-definitions/map-config';
import YellowGhost from "./yellow-ghost";

export default function Game(mapManager, mapRenderer, spiritesManager, uiInterfaceAdapter) {

  this.mapManager = mapManager;
  this.spiritesManager = spiritesManager;
  this.uiInterfaceAdapter = uiInterfaceAdapter;
  this.mapRenderer = mapRenderer;

  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelInfo());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelInfo());
  this.redGhost = new RedGhost(this.ghostCollisionStrategy, this.mapManager);
  this.yellowGhost = new YellowGhost(this.ghostCollisionStrategy, this.mapManager);
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(ActorDefinitions.PLAYER));
  this.ghostIntervalId;

  this.Start = function () {
    if(!this.ghostIntervalId) {
       this.ghostIntervalId = setInterval(this.UpdateGohosts.bind(this),200);
    }
    this.mapRenderer.render();
    this.uiInterfaceAdapter.updateUserInfo({
      playerPoints:this.player.getPoints(),
      playerLifes: this.player.getLifes()
    });
  };

  this.HandleUserInput = function (direction) {
    const position = this.mapManager.getItemPosition(ActorDefinitions.PLAYER);
    const destination = this.mapManager.getDestinationPosition(direction, position);
    this.common(this.player, direction, position, destination);
    this.spiritesManager.updateSpirit(direction);
  };

  this.UpdateGhost = function (ghost) {
    const position = this.mapManager.getItemPosition(ghost.getActorValue());
    var nextPosition = ghost.getNextGhostPath(position)[0];
    var destinationValue = this.mapManager.getPosition(nextPosition);
    let i = 0;

    while(ghost.checkCollisionWithOther(destinationValue) && i < 5)
    {
      ghost.resestPosition();
      nextPosition = ghost.getNextGhostPath(position)[0];
      let temp=  this.mapManager.getPosition(nextPosition);
      destinationValue =temp;
      i++;
      if(i ==5)
      {
        nextPosition = this.mapManager.getItemPosition(ghost.getActorValue());
      }
    }
    if(i < 5) {
      const direction = ghost.getDirection(nextPosition, position);
      this.common(ghost, direction, position, destinationValue);
    }
  }

  this.ghosts = [ this.redGhost,this.yellowGhost];

  this.UpdateGohosts = function () {
    this.ghosts.reverse();
    this.ghosts.forEach(x=> {
      this.UpdateGhost.call(this, x);
    });

  }

  this.common = function(player, direction, position, destination) {
    const temp = player.getNewPosition(direction, destination);
    if (temp.x != position.x || temp.y != position.y) {
      this.mapManager.updateMap(player.getPendingPositions());
      this.Start();
    }
    if(this.mapManager.checkLoose()) {
      this.player.reduceLife();
      this.checkGameState();
    }
    if(this.mapManager.checkWin()) {
      alert('wygrales');
    }
  }

  this.checkGameState = function() {
    if (this.player.getLifes() <= 0) {
      clearInterval(this.ghostIntervalId);
      this.Start();
    } else {
      this.mapManager.resetPlayer();
      this.player.resetPosition();
    }
  };

  this.close = function () {
    clearInterval(this.ghostIntervalId);
  }
}
