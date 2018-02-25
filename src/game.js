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
  //this.yellowGhost = new YellowGhost(this.ghostCollisionStrategy, this.mapManager);
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(ActorDefinitions.PLAYER));
  this.ghostIntervalId;
  this.Start = function () {
    if(!this.ghostIntervalId) {
       this.ghostIntervalId = setInterval(this.UpdateGohosts.bind(this),100);
    }
    this.mapRenderer.render();
    this.uiInterfaceAdapter.updateUserInfo({
      playerPoints:this.player.getPoints(),
      playerLifes: this.player.getLifes()
    });
  };

  this.HandleUserInput = function (direction) {
    const position = this.mapManager.getItemPosition(ActorDefinitions.PLAYER);
    this.common(this.player, direction, position);
    this.spiritesManager.updateSpirit(direction);
  };

  this.UpdateGohosts = function () {
    const position = this.mapManager.getItemPosition(ActorDefinitions.REDGHOST);
    var nextPosition = this.redGhost.getNextGhostPath(position)[0];
    var destinationValue = this.mapManager.getPosition(nextPosition);
    while(this.redGhost.checkCollisionWithOther(destinationValue))
    {
      this.redGhost.resestPosition();
      nextPosition = this.redGhost.getNextGhostPath(position);
      destinationValue = this.mapManager.getPosition(nextPosition);
    }

    const direction = this.redGhost.getDirection(nextPosition, position);


    this.commonGhost(this.redGhost, direction, position, destinationValue);

   /* const yellowPosition = this.mapManager.getItemPosition(ActorDefinitions.YELLOWGHOST);
    const yellowDirection = this.yellowGhost.getDirection(yellowPosition, yellowDestination);

    const yellowDestination = this.mapManager.getDestinationPosition(yellowDirection, position);


    this.commonGhost(this.yellowGhost, yellowDirection, yellowPosition, yellowDestination);
    */
  }

  this.commonGhost = function(player, direction, position, destination) {


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

  this.common = function(player, direction, position) {

    const destination = this.mapManager.getDestinationPosition(direction, position);
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
