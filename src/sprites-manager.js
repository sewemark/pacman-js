import ActorDefinitions  from './map-definitions/map-config';

import pacman from './assets/img/pacman/Pacman1.png';
import pacman1 from './assets/img/pacman/Pacman2.png';
import pacman2 from './assets/img/pacman/Pacman3.png';
import pacman3 from './assets/img/pacman/Pacman4.png';
import background from './assets/img/textures/background.png';
import wall from './assets/img/textures/texture.png';
import grass from './assets/img/textures/gras.png';
import money from './assets/img/textures/coin.png';
import redGhost from './assets/img/ghosts/ghost1.png';
var spirits = [pacman, pacman1, pacman2, pacman3];
var textures = [background, wall, grass, money];
var ghost = [redGhost];
export default function SpiritesManager(){
  this.userSpirit = null;
  this.frame = 0;
  this.degree =0;
  this.playerSprites = document.createElement("img");
  this.playerSprites.src = spirits[this.frame];
  this.backgroundSprite = document.createElement("img");
  this.backgroundSprite.src = textures[1];
  this.grassSprite = document.createElement("img");
  this.grassSprite.src = textures[2];
  this.foodSprite = document.createElement("img");
  this.foodSprite.src = textures[3];
  this.redghostSpirit = document.createElement("img");
  this.redghostSpirit.src = ghost[0];

  this.GetUserSpirit = function(){

  }
  this.getSpirit = function(actor){
    if(actor ==ActorDefinitions.PLAYER){
      return this.playerSprites;
    }else if(actor == ActorDefinitions.WALL){
      return this.backgroundSprite;
    }
    else if(actor == ActorDefinitions.EMPTY || actor == ActorDefinitions.FOOD){
      return this.grassSprite;
    }
    else if(actor == ActorDefinitions.FOODICON){
      return this.foodSprite;
    }
    else if(actor == ActorDefinitions.REDGHOST){
      return this.redghostSpirit;
    }
  }
  this.updateSpirit= function(direction) {
    if(direction == 37){
      this.degree = 0;
    }
    else if(direction == 38){
      this.degree = 270;
    }
    else if(direction == 39){
      this.degree = 0;
    }
    else if(direction == 40){
      this.degree = 0;
    }
    if(this.frame + 1 < spirits.length){
      this.frame++
    }else{
      this.frame = 0;
    }
    this.playerSprites = document.createElement("img");
    this.playerSprites.src = spirits[this.frame];
   // this.rotateImage(this.playerSprites)
    return this.playerSprites;
  }

  this.getRotate = function(){
    return this.degree;
  }


}
