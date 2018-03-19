import PF from 'pathfinding';
import ActorDefinitions from '../map-definitions/map-config';
import {
  userPosition
} from '../map-definitions/map';

export default function MapManager(map) {
  this.map = map;
  this.grid = new PF.Grid(this.map, [0, 2, 3, 4, 5 ]);
  this.finder = new PF.AStarFinder();
  this.state = 0;

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
  };

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
    return new Error('No such item in map');
  };

  this.getPositionValue = function (position) {
    const next =  this.map[position[1]][position[0]];
    return next;
  };

  this.getDestinationPosition = function (direction, playerPosition) {
    return this.destinationCheker[direction](playerPosition)
  };

  this.getDestinationPosition2 = function (actor, direction) {
    const position = this.getItemPosition(actor);
    return this.destinationCheker[direction](position)
  };

  this.updateMap = function (positions) {
    var last = positions[positions.length - 1];
    if (last && this.map[last.position.y][last.position.x] == ActorDefinitions.PLAYER) {
          this.state = -1;
    }
    if((last && ActorDefinitions.GHOSTS.indexOf(this.map[last.position.y][last.position.x]) >=0)
      && this.map[positions[0].position.y][positions[0].position.x] == ActorDefinitions.PLAYER )
    {
      console.log("Weszlo tam gzie nie mialo1!!!!!!!!!1");
      this.state = -1;
    }
    positions.forEach(item => {
      this.map[item.position.y][item.position.x] = item.value;
    });
  };

  this.getNextTripForGhost = function (ghost) {
    this.grid = new PF.Grid(this.map, [0, 2, 3, 4, 5]);
    var init = this.generateRandomPoint();
    var initaliGhostPosition = this.getItemPosition(ghost);

    //while ( Math.abs(init.x - initaliGhostPosition.x) < 5 || Math.abs(init.y - initaliGhostPosition.y) < 5 ) {
    //&& Math.abs(init.y - initaliGhostPosition.y) < 5 ) {
      //init = this.generateRandomPoint();
    //}*/

    var path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    while (path.length == 0) {
      path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    }

    return {
      init: init,
      initaliGhostPosition: initaliGhostPosition,
      path: path
    }
  };

  this.getLevelInfo = () => {
    return {
      height: this.map.length,
      width: this.map[0].length
    }
  };

  this.checkWin = function () {
    return this.map.findIndex(x => {
      return x.indexOf(ActorDefinitions.FOOD) >= 0;
    }) < 0;
  };

  this.checkLoose = function () {
   return this.state == -1;
 };

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
  };

  this.getLevelWidth = () => this.map[0].length;

  this.getLevelHeight = () => this.map.length;

  this.destinationCheker = {
    37: (playerPosition) => this.map[playerPosition.y][playerPosition.x - 1],
    39: (playerPosition) => this.map[playerPosition.y][playerPosition.x + 1],
    38: (playerPosition) => this.map[playerPosition.y - 1][playerPosition.x],
    40: (playerPosition) => this.map[playerPosition.y + 1][playerPosition.x],
  };
}
