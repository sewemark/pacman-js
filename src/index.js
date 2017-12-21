import './index.css';


import level1 from './map-definitions/map';

import SpiritesManager from './sprites-manager';
import MapManager from './map-manager';
import Game from './game';
function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
}


function init(newGameListener) {
  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth - (window.innerWidth % level1[0].length);
  canvas.height = window.innerHeight - (window.innerHeight % level1.length);
  var ctx = canvas.getContext("2d");
  const cellWidth = canvas.width / level1[0].length * 1.0;
  const cellHeight = canvas.height / level1.length * 1.0;
  const spiritesManager = new SpiritesManager();
  var mapManager = new MapManager(copy(level1), canvas, cellWidth, cellHeight, spiritesManager);
  var game = new Game(mapManager, spiritesManager, newGameListener);


  setUpKeyListeners();

  function setUpKeyListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        game.HandleUserInput(event.keyCode);
      }
    }, false);
  }


  return game;
}

function newGameListener() {
  //  const game = init(newGameListener);
  // window.game = game;
  //game.Start();
  // conosole.log("New game listnerne");
}


const game = new init(newGameListener.bind(window));
window.game = game;
game.on('end', () => {
  console.log("EMITTING");
  window.game = new init(newGameListener.bind(window));
  window.game.Start();
  ///console.log(window.game);
})
