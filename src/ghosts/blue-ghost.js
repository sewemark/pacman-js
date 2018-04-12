import ActorDefinitions from '../map-definitions/map-config';
import Ghost from './ghost';

var BlueGhost = (function() {
  "use strict";

  var priv = new WeakMap();

  var  _ = function (inst) {
    return priv.get(inst);
  }

  function BlueGhostConstructor(ghostCollisionStrategy, mapManager) {

    var data = mapManager.GetNextTripForGhost(ActorDefinitions.BLUEGHOST);

    var privMembers = {
      mapManager: mapManager,
      initData: data,
      position: data.initaliGhostPosition,
      path: data.path,
      ghostCollisionStrategy: ghostCollisionStrategy,
      newPositions: [],
      GHOST: ActorDefinitions.BLUEGHOST,
      mode: 'bad'
    };

    Ghost.call(this, ghostCollisionStrategy, mapManager, privMembers);
    priv.set(this, privMembers);

  }

  BlueGhostConstructor.prototype = Object.create(Ghost.prototype);
  BlueGhostConstructor.prototype.constructor = BlueGhostConstructor;

  return BlueGhostConstructor;

})();


export default BlueGhost;

