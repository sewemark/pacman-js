import pacman from './assets/img/pacman/Pacman1.png';
import pacman1 from './assets/img/pacman/Pacman2.png';
import pacman2 from './assets/img/pacman/Pacman3.png';
import pacman3 from './assets/img/pacman/Pacman4.png';
var spirits = [pacman, pacman1, pacman2, pacman3];

export default function SpiritesManager(){
  this.userSpirit = null;
  this.frame = 0;
  this.GetUserSpirit = function(){
    var playerSprites = document.createElement("img");
    playerSprites.src = this.getPacmanSpirit();

  }
  this.getSpirit = function(actor){
    if(actor ==2){
      var playerSprites = document.createElement("img");
      playerSprites.src = spirits[this.frame];
      return playerSprites;
    }
  }
  this.updateSpirit= function(direction) {
    if(direction == 37){
      this.frame = 0;
    }
    else if(direction == 38){
      this.frame = 1;
    }
    else if(direction == 39){
      this.frame =2;
    }
    else if(direction == 40){
      this.frame = 3;
    }
  }


}
