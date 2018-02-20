import './index.css';
import  level1  from './map-definitions/map';
import SpiritesManager from './sprites-manager';
import MapManager from './map-manager';
import MapRenderer from './map-renderer';
import Game from './game';
import UIIntefaceAdapter  from './ui-interface-adapter';
import { deepCopy } from './utils';

function init() {
  window.uiIntefaceAdapter = new UIIntefaceAdapter(new SpiritesManager());
  initUIListeners();
  return initGame();
}

function initUIListeners() {
  var button = document.getElementById("new-game-button");
  button.addEventListener("click", newGameListener.bind(window));
}

function initGame() {
  const gameCanvas = initGameCanvas();
  const game = initGameObjects(gameCanvas);
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

function initGameCanvas() {
  var canvas = document.getElementById("game-board-canvas");
  canvas.width = window.innerWidth - (window.innerWidth % level1[0].length);
  canvas.height = window.innerHeight - (window.innerHeight % level1.length);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cellWidth = canvas.width / level1[0].length * 1.0;
  const cellHeight = canvas.height / level1.length * 1.0;
  return{
    canvas:canvas,
    cellWidth:cellWidth,
    cellHeight:cellHeight
  }
}

function initGameObjects(gameBoard) {
  const spiritesManager = new SpiritesManager();
  let levelCopy = deepCopy(level1);
  const mapRenderer = new MapRenderer(levelCopy, gameBoard.canvas, gameBoard.cellWidth, gameBoard.cellHeight, spiritesManager)
  const mapManager =  new MapManager(levelCopy);
  return new Game(mapManager, mapRenderer, spiritesManager, window.uiIntefaceAdapter);
}

function newGameListener() {
  window.game.close();
  window.game = new initGame();
}

window.game = new init();

