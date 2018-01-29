import ActorDefinitions from './map-definitions/map-config';
import Ghost from './ghost';

var RedGhost = (function() {
  "use strict";

  function RedGhostConstructor(ghostCollisionStrategy, mapManager) {
    var data = mapManager.getNextTripForGhost(ActorDefinitions.REDGHOST);
    var privMembers = {
      mapManager: mapManager,
      initData: data,
      position: data.initaliGhostPosition,
      path: data.path,
      ghostCollisionStrategy: ghostCollisionStrategy,
      newPositions: []
    }
    Ghost.apply(this, [...arguments, privMembers]);

  }
  RedGhostConstructor.prototype = Object.create(Ghost.prototype);

  return RedGhostConstructor;

})();


export default RedGhost;

