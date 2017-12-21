import PacmanCollisionStartegy from './collisions/pacman-collision-strategy';
import GhostCollisionStartegy from './collisions/ghost-collision-strategy';
import Player from './player';
import RedGhost from './red-ghost';
import money from './assets/img/textures/heart.png';
import coin from './assets/img/textures/Coin.png';
import EventEmitter from 'events';

export default function Game(mapManager,spiritesManager,newGameListener) {

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

  this.renderUI = function() {
    var content = document.getElementById("content");
    var pointsElement = document.getElementById("content-p-points");
    pointsElement.innerText = "You have  " + this.player.getPoints() + " point";
    var img =document.createElement("img");
    img.setAttribute("src",coin);
    pointsElement.appendChild(img);
    var elem = document.getElementById("content-ul--lifes");
    while(elem.firstChild){
      elem.removeChild(elem.firstChild);
    }
    for(let i =0;i< this.player.getLifes();i++){
      var img =document.createElement("img");
        img.setAttribute("src",money);
       elem.appendChild(img);
    }

  }
  this.HandleUserInput = function (direction) {
    const position = this.mapManager.getItemPosition(2);
    common.apply(this, [this.player, direction, position]);
    this.spiritesManager.updateSpirit(direction);
    if (this.mapManager.checkWin()) {
      alert('wygrales');
    }
  }

  this.ghostIntervalId = setInterval(UpdateGohosts.bind(this), 100);

  function UpdateGohosts() {
    console.log("UPDATE GHOSTS");
    const position = this.mapManager.getItemPosition(3);
    var direction = this.redGhost.getDirection(position)
    common.apply(this, [this.redGhost, direction, position]);
    console.log(this.player.getLifes());
    console.log(this.mapManager.checkLoose());
    if (this.mapManager.checkLoose()) {
      this.player.reduceLife();
      if(this.player.getLifes() <= 0){
        this.emit('end');
        clearInterval(this.ghostIntervalId);
      }else {
        console.log('weszlo w chec  w check llooose');
        this.mapManager.resetPlayer();
        this.player.resetPosition();
      }
    }
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
Game.prototype = Object.create(EventEmitter.prototype);
