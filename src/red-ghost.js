import ActorDefinitions from './map-definitions/map-config';
import Ghost from './ghost';

var RedGhost = (function() {
  "use strict";

  var priv = new WeakMap();

  var  _ = function (inst) {
    return priv.get(inst);
  }

  function RedGhostConstructor(ghostCollisionStrategy, mapManager) {

    var data = mapManager.getNextTripForGhost(ActorDefinitions.REDGHOST);

    var privMembers = {
      mapManager: mapManager,
      initData: data,
      position: data.initaliGhostPosition,
      path: data.path,
      ghostCollisionStrategy: ghostCollisionStrategy,
      newPositions: [],
      GHOST: ActorDefinitions.REDGHOST,
    }

    Ghost.call(this, ghostCollisionStrategy, mapManager, privMembers);
    priv.set(this, privMembers);

  }

  RedGhostConstructor.prototype = Object.create(Ghost.prototype);
  RedGhostConstructor.prototype.constructor = RedGhostConstructor;

  return RedGhostConstructor;

})();


export default RedGhost;

