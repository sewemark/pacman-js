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

  this.UpdateRed = function () {

  };

  this.UpdateGohosts = function () {

    const position = this.mapManager.getItemPosition(ActorDefinitions.REDGHOST);

    var nextPosition = this.redGhost.getNextGhostPath(position)[0];
    var destinationValue = this.mapManager.getPosition(nextPosition);


    while(this.redGhost.checkCollisionWithOther(destinationValue))
    {

      console.log("Kolizja");
      this.redGhost.resestPosition();
      nextPosition = this.redGhost.getNextGhostPath(position)[0];
      let temp=  this.mapManager.getPosition(nextPosition);
      destinationValue =temp;
    }

    const direction = this.redGhost.getDirection(nextPosition, position);

    this.commonGhost(this.redGhost, direction, position, destinationValue);
      const yposition = this.mapManager.getItemPosition(ActorDefinitions.YELLOWGHOST);
      var ynextPosition = this.yellowGhost.getNextGhostPath(yposition)[0];
      var ydestinationValue = this.mapManager.getPosition(ynextPosition);

      while(this.yellowGhost.checkCollisionWithOther(ydestinationValue))
      {

        this.yellowGhost.resestPosition();
        ynextPosition = this.yellowGhost.getNextGhostPath(yposition)[0];
        let temp1 =  this.mapManager.getPosition(ynextPosition);
        ydestinationValue = temp1;
      }

      const ydirection = this.yellowGhost.getDirection(ynextPosition, yposition);
      this.commonGhost(this.yellowGhost, ydirection, yposition, ydestinationValue,true);

  }

  this.commonGhost = function(player, direction, position, destination,czy) {


    const temp = player.getNewPosition(direction, destination);
    if (temp.x != position.x || temp.y != position.y) {
      this.mapManager.updateMap(player.getPendingPositions());
      if(czy) {
        this.Start();
      }
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
