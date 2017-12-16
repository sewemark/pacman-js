import ActorDefinitions  from './map-definitions/map-config';

import pacman from './assets/img/pacman/Pacman1.png';
import pacman1 from './assets/img/pacman/Pacman2.png';
import pacman2 from './assets/img/pacman/Pacman3.png';
import pacman3 from './assets/img/pacman/Pacman4.png';
import background from './assets/img/textures/background.png';
import wall from './assets/img/textures/texture.png';
import grass from './assets/img/textures/gras.png';

var spirits = [pacman, pacman1, pacman2, pacman3];
var textures = [background, wall, grass]
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
  }
  this.updateSpirit= function(direction) {
    console.log(direction);
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
    this.rotateImage(this.playerSprites)
    return this.playerSprites;
  }

  this.getRotate = function(){
    return this.degree;
  }


}
