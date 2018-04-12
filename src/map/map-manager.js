import PF from 'pathfinding';
import ActorDefinitions from '../map-definitions/map-config';
import { userPosition } from '../map-definitions/map';

export default function MapManager(map) {
  this.map = map;
  this.grid = new PF.Grid(this.map, [0, 2, 3, 4, 5, 6 ]);
  this.finder = new PF.AStarFinder();
  this.state = 0;

  this.GenerateRandomPoint = function () {
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

  this.GetItemPosition = function (item) {
    for (let i = 0; i < this.map.length; i++) {
      let index = this.map[i].findIndex(x => x === item)
      if (index >= 0) {
        return {
          y: i,
          x: index
        }
      }
    }
    return new Error('No such item in map');
  };

  this.GetPositionValue = function (position) {
    return this.map[position[1]][position[0]];
  };

  this.GetDestinationPosition = function (direction, playerPosition) {
    return this.destinationCheker[direction](playerPosition)
  };

  this.UpdateMap = function (positions) {
    var last = positions[positions.length - 1];
    if (last && this.map[last.position.y][last.position.x] === ActorDefinitions.PLAYER) {
          this.state = -1;
    }
    if((last && ActorDefinitions.GHOSTS.indexOf(this.map[last.position.y][last.position.x]) >=0)
      && this.map[positions[0].position.y][positions[0].position.x] === ActorDefinitions.PLAYER )
    {
      this.state = -1;
    }
    positions.forEach(item => {
      this.map[item.position.y][item.position.x] = item.value;
    });
  };

  this.GetNextTripForGhost = function (ghost) {
    this.grid = new PF.Grid(this.map, [0, 2, 3, 4, 5, 6]);
    var init = this.GenerateRandomPoint();
    var initaliGhostPosition = this.GetItemPosition(ghost);

    var path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    while (path.length === 0) {
      path = this.finder.findPath(initaliGhostPosition.x, initaliGhostPosition.y, init.x, init.y, this.grid);
    }

    return {
      init: init,
      initaliGhostPosition: initaliGhostPosition,
      path: path
    }
  };

  this.GetLevelInfo = () => {
    return {
      height: this.map.length,
      width: this.map[0].length
    }
  };

  this.CheckWin = function () {
    return this.map.findIndex(x => {
      return x.indexOf(ActorDefinitions.FOOD) >= 0;
    }) < 0;
  };

  this.CheckLoose = function () {
   return this.state === -1;
 };

  this.ResetPlayer = function () {
   this.state = 0;
   for(let i =0;i<this.map.length;i++){
     for(let j =0; j<this.map[0].length; j++){
       if(this.map[i][j] === ActorDefinitions.PLAYER ){
         this.map[i][j] = ActorDefinitions.EMPTY
       }
     }
   }
    this.map[userPosition.y][userPosition.x] = ActorDefinitions.PLAYER;
  };

  this.GetLevelWidth = () => this.map[0].length;

  this.GetLevelHeight = () => this.map.length;

  this.destinationCheker = {
    37: (playerPosition) => this.map[playerPosition.y][playerPosition.x - 1],
    39: (playerPosition) => this.map[playerPosition.y][playerPosition.x + 1],
    38: (playerPosition) => this.map[playerPosition.y - 1][playerPosition.x],
    40: (playerPosition) => this.map[playerPosition.y + 1][playerPosition.x],
  };
}
