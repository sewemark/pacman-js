import ActorDefinitions from '../map-definitions/map-config';
import Ghost from './ghost';

var YellowGhost = (function() {
  "use strict";

  var priv = new WeakMap();

  var  _ = function (inst) {
    return priv.get(inst);
  }

  function YellowGhostConstructor(ghostCollisionStrategy, mapManager) {
    var data = mapManager.GetNextTripForGhost(ActorDefinitions.YELLOWGHOST);
    var privMembers = {
      mapManager: mapManager,
      initData: data,
      position: data.initaliGhostPosition,
      path: data.path,
      ghostCollisionStrategy: ghostCollisionStrategy,
      newPositions: [],
      GHOST: ActorDefinitions.YELLOWGHOST,
      mode: 'bad'
    }
    Ghost.call(this, ghostCollisionStrategy, mapManager, privMembers);
    priv.set(this, privMembers);

  }

  YellowGhostConstructor.prototype = Object.create(Ghost.prototype);
  YellowGhostConstructor.prototype.constructor = YellowGhostConstructor;

  return YellowGhostConstructor;

})();


export default YellowGhost;

