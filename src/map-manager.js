import PF from 'pathfinding';
import ActorDefinitions from './map-definitions/map-config';
import {
  userPosition
} from './map-definitions/map';
export default function MapManager(map, canvas, cellWidth, cellHeight, spiritsManager) {
  this.map = map;
  this.cellHeight = cellHeight;
  this.cellWidth = cellWidth;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.grid = new PF.Grid(this.map, [0, 2, 3, 4]);
  this.finder = new PF.AStarFinder();
  this.spiritsManager = spiritsManager;
  this.frame = 0;
  this.state = 0;
  this.render = function () {
    for (let i = 0; i < this.map[0].length; i++) {
      for (let j = 0; j < this.map.length; j++) {
        if (this.map[j][i] == 1) {
          //this.ctx.fillStyle = "black";
          //this.ctx.drawImage(this.spiritsManager.getSpirit(2),Math.floor(i * this.cellWidth),Math.floor(j * this.cellHeight),Math.floor(this.cellWidth),h);
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.WALL), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 0) {
          this.ctx.fillStyle = "white";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.EMPTY), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 4) {
          this.ctx.fillStyle = "white";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.FOOD), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          this.ctx.fillStyle = "green";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.FOODICON), Math.floor((i * this.cellWidth)) + Math.floor(this.cellWidth * 0.25), Math.floor((j * this.cellHeight)) + Math.floor(this.cellHeight * 0.25), Math.floor(this.cellWidth / 2), Math.floor(this.cellHeight / 2));
        } else if (this.map[j][i] == 2) {
          this.ctx.fillStyle = "white";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.EMPTY), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          var x = Math.floor(i * this.cellWidth);
          var y = Math.floor(j * this.cellHeight);
          var w = Math.floor(this.cellWidth);
          var h = Math.floor(this.cellHeight);
          this.ctx.save();
          this.ctx.translate(x + w / 2, y + h / 2);
          this.ctx.rotate(this.spiritsManager.getRotate() * Math.PI / 180.0);
          this.ctx.translate(-x - w / 2, -y - h / 2);
          this.ctx.drawImage(this.spiritsManager.getSpirit(2), x, y, w, h);
          this.ctx.restore();
          var image2 = this.ctx.getImageData(x, y, w, h);
          console.log(image2);
          var imageData = image2.data;
          console.log(imageData.length);
          var  length = imageData.length;
          for(let i = 0; i < length -4; i+=4){
            /*if(imageData[i]==0) {
              imageData[i]=0;
              imageData[i+1]=255;
              imageData[i+2]=0;
              imageData[i+3]=255;
            }*/
          }
         // image2.data = imageData;
          this.ctx.putImageData(image2, x, y);

        } else if (this.map[j][i] == 3) {

          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.EMPTY), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.REDGHOST), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        }
      }
    }

  }

  this.generateRandomPoint = function () {
    var yRandom = Math.floor((Math.random() * this.map.length) + 1);
    var xRandom = Math.floor((Math.random() * this.map[0].length) + 1);
    while (!this.map[yRandom] || [0, 4].indexOf(this.map[yRandom][xRandom]) < 0) {
      yRandom = Math.floor((Math.random() * this.map.length));
      xRandom = Math.floor((Math.random() * this.map[0].length));
    }
    return {
      y: yRandom,
      x: xRandom
    }
  }

  this.getItemPosition = function (item) {
    for (var i = 0; i < this.map.length; i++) {
      let index = this.map[i].findIndex(x => x == item)
      if (index >= 0) {
        return {
          y: i,
          x: index
        }
      }
    }
    console.log("Jak tu doszlo to cos sie spierdolilo");
    return {
      y: -1,
      x: -1
    }
  }

  this.getDestinationPosition = function (direction, playerPosition) {
    return this.destinationCheker[direction](playerPosition)
  }

  this.updateMap = function (positions) {
    var last = positions[positions.length - 1];
    if (last && this.map[last.position.y][last.position.x] == ActorDefinitions.PLAYER) {
          //this.map[last.position.y][last.position.x]= ActorDefinitions.EMPTY;
          this.state = -1;
    }
    if(last && ActorDefinitions.GHOSTS.indexOf(this.map[last.position.y][last.position.x]) >=0)
    {
      //this.map[positions[0].y][positions[0].x] == ActorDefinitions.EMPTY;
      this.state = -1;
    }
    positions.forEach(item => {
      this.map[item.position.y][item.position.x] = item.value;
    });
  }

 /* this.checkLoose = function () {
    return this.state == -1;
  }*/

  this.destinationCheker = {
    37: (playerPosition) => this.map[playerPosition.y][playerPosition.x - 1],
    39: (playerPosition) => this.map[playerPosition.y][playerPosition.x + 1],
    38: (playerPosition) => this.map[playerPosition.y - 1][playerPosition.x],
    40: (playerPosition) => this.map[playerPosition.y + 1][playerPosition.x],
  };

  this.getNextTripForGhost = function (ghost) {
    this.grid = new PF.Grid(this.map, [0, 2, 3, 4]);
    //this.grid = new PF.Grid(this.map, [0, 2, 3, 4]);
    var init = this.generateRandomPoint();
    var initaliGhostPosition = this.getItemPosition(ghost);

    while (init.x === initaliGhostPosition.x && init.y === initaliGhostPosition.y) {
      init = this.generateRandomPoint();
      initaliGhostPosition = this.getItemPosition(ghost);
    }

    var path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    while (path.length == 0) {
      path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    }

    return {
      init: init,
      initaliGhostPosition: initaliGhostPosition,
      path: path
    }
  }

  this.getLevelWidth = function () {
    return this.map[0].length;
  }

  this.getLevelHeight = function () {
    return this.map.length;
  }

  this.checkWin = function () {
    return this.map.findIndex(x => {
      return x.indexOf(ActorDefinitions.FOOD) >= 0;
    }) < 0;

  }

  this.checkLoose = function () {
    let index = this.map.findIndex(x => {
      return x.indexOf(ActorDefinitions.PLAYER) >= 0;
    }) ;
    return index < 0;
  }

   this.checkLoose = function () {
   return this.state == -1;
 }

  this.resetPlayer = function () {
    this.state = 0;
   for(let i =0;i<this.map.length;i++){
     for(let j =0; j<this.map[0].length; j++){
       if(this.map[i][j] == ActorDefinitions.PLAYER ){
         this.map[i][j] = ActorDefinitions.EMPTY
       }
     }
   }
    this.map[userPosition.y][userPosition.x] = ActorDefinitions.PLAYER;
  }

  this.getPrevValue= function (position) {
    return this.map[position.y][position.x];
  }
}
