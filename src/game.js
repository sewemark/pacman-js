import PacmanCollisionStartegy from './collisions/pacman-collision-strategy';
import GhostCollisionStartegy from './collisions/ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';
import money from './assets/img/textures/heart.png';
import coin from './assets/img/textures/coin.png';
import EventEmitter from 'events';

export default function Game(mapManager, spiritesManager, newGameListener) {

  this.mapManager = mapManager;
  this.spiritesManager = spiritesManager;
  this.newGameListener = newGameListener;
  this.pacmanMoveStrategy = new PacmanCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.ghostCollisionStrategy = new GhostCollisionStartegy(this.mapManager.getLevelWidth(), this.mapManager.getLevelHeight());
  this.redGhost = new RedGhost(this.ghostCollisionStrategy, this.mapManager);
  this.player = new Player(this.pacmanMoveStrategy, this.mapManager.getItemPosition(2));
  this.ghostIntervalId;
  this.Start = function () {
    this.mapManager.render();
    this.renderUI();
  }

  this.renderUI = function () {
    var content = document.getElementById("content");
    var pointsElement = document.getElementById("content-p-points");
    pointsElement.innerText = "You have  " + this.player.getPoints() + " point";
    var img = document.createElement("img");
    img.setAttribute("src", coin);
    pointsElement.appendChild(img);
    var elem = document.getElementById("content-ul--lifes");
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    for (let i = 0; i < this.player.getLifes(); i++) {
      var img = document.createElement("img");
      img.setAttribute("src", money);
      elem.appendChild(img);
    }

  }

  this.HandleUserInput = function (direction) {
    if( this.player.getLifes() == 0 )
      return;
    const position = this.mapManager.getItemPosition(2);
    if(position.x == -1 && position.y == -1)
    {
      console.log("Undefine position player");
      this.checkGameState();
    }
    common.apply(this, [this.player, direction, position]);
    this.spiritesManager.updateSpirit(direction);
    if (this.mapManager.checkWin()) {
      alert('wygrales');
    }
  }

  this.ghostIntervalId = setInterval(UpdateGohosts.bind(this), 100);

  function UpdateGohosts() {
    const position = this.mapManager.getItemPosition(3);
    if(position.x == -1 && position.y == -1) {
      console.log("Undefine position ghost");
      return;
    }
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
    if (this.mapManager.checkLoose()) {
      alert("Weszlo w checkloose");

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
      //console.log("Mniejsze od zera");
      this.mapManager.resetPlayer();
      this.player.resetPosition();
    }
  }
}
Game.prototype = Object.create(EventEmitter.prototype);
