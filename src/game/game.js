import PacmanCollisionStartegy from '../collisions/pacman-collision-strategy';
import GhostCollisionStartegy from '../collisions/ghost-collision-strategy';
import Player from '../player/player';
import RedGhost from '../ghosts/red-ghost';
import ActorDefinitions  from '../map-definitions/map-config';
import YellowGhost from "../ghosts/yellow-ghost";

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
  this.ghosts = [ this.redGhost,this.yellowGhost];
  this.ghostIntervalId;

  this.Start = function () {
    if(!this.ghostIntervalId) {
       this.ghostIntervalId = setInterval(this.UpdateGohosts.bind(this), 200);
    }
    this.mapRenderer.render();
    this.uiInterfaceAdapter.updateUserInfo({
      playerPoints:this.player.getPoints(),
      playerLifes: this.player.getLifes()
    });
  };

  this.HandleUserInput = function (direction) {
    this.moveUser(this.player, direction);
    this.spiritesManager.updateSpirit(direction);
  };

  this.UpdateGhost = function (ghost) {

    tryGetNewPathForGhost.call(this);
    tryMoveGhost.call(this);

    function tryMoveGhost() {
      const position = this.mapManager.getItemPosition(ghost.getActorValue());
      var nextPosition = ghost.getNextGhostPath(position)[0];
      var destinationValue = this.mapManager.getPositionValue(nextPosition);
      let maxNumOfCollisionResolver = 0;
      while(ghost.checkCollisionWithOther(destinationValue) && maxNumOfCollisionResolver < 5)
      {
        ghost.resestPosition();
        nextPosition = ghost.getNextGhostPath(position)[0];
        destinationValue = this.mapManager.getPositionValue(nextPosition);
        maxNumOfCollisionResolver++;
      }

      if(maxNumOfCollisionResolver < 5) {
        const direction = ghost.getDirection(nextPosition, position);
        this.moveGhost(ghost, direction, position, destinationValue);
      }
    }

    function tryGetNewPathForGhost() {
      while(ghost.checkIfNoMoreMoves()){
        const newPath = this.mapManager.getNextTripForGhost(ghost.getActorValue()).path;
        ghost.setPath(newPath);
      }
    }
  };

  this.UpdateGohosts = function () {
    this.ghosts.reverse();
    this.ghosts.forEach(x=> {
      this.UpdateGhost.call(this, x);
    });
  };


  this.moveUser = function(actor, direction) {
    const currentPosition = this.mapManager.getItemPosition(actor.getActorValue());
    const destinationValue = this.mapManager.getDestinationPosition(direction, currentPosition);

    if(actor.canMoveToPosition(direction, destinationValue)){

        const newPositions = actor.getNewPosition(direction, destinationValue);
        this.mapManager.updateMap(newPositions);
        this.Start();

      if(this.mapManager.checkLoose()) {
        this.player.reduceLife();
        this.checkGameState();
      }

      if(this.mapManager.checkWin()) {
        alert('wygrales');
      }
    }

  };

  this.moveGhost = function(actor, direction, position, destination) {
    const temp = actor.getNewPosition(direction, destination);
    if (temp.x != position.x || temp.y != position.y) {
      this.mapManager.updateMap(actor.getPendingPositions());
      this.Start();
    }
    if(this.mapManager.checkLoose()) {
      this.player.reduceLife();
      this.checkGameState();
    }
    if(this.mapManager.checkWin()) {
      alert('wygrales');
    }
  };

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
