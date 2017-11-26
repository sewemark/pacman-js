import './index.css';


import level1 from './map-definitions/map';
import Game from './game';
import MapManager from './map-manager';

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - (window.innerWidth % level1[0].length);
canvas.height = window.innerHeight - (window.innerHeight % level1.length);
var ctx = canvas.getContext("2d");
const cellWidth = canvas.width / level1[0].length * 1.0;
const cellHeight = canvas.height / level1.length * 1.0;

var mapManager = new MapManager(level1, ctx, cellWidth, cellHeight);
var game = new Game(mapManager);

setUpKeyListeners();

function setUpKeyListeners() {
  document.addEventListener('keydown', (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      game.HandleUserInput(event.keyCode);
    }
  }, false);
}


window.game = game;
