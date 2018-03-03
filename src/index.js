import './index.css';
import levelCopy from './map-definitions/map';
import SpiritesManager from './map-definitions/sprites-manager';
import MapManager from './map/map-manager';
import MapRenderer from './map/map-renderer';
import Game from './game/game';
import UIIntefaceAdapter  from './ui-adapters/ui-interface-adapter';

const spiriteManager = new SpiritesManager();

function init() {
  window.uiIntefaceAdapter = new UIIntefaceAdapter(spiriteManager);
  const game = gameFactory();
  initUIListeners(game);
  return game;
}

function initUIListeners(userInputHandler) {
  var button = document.getElementById("new-game-button");
  button.addEventListener("click", newGameListener.bind(window));
  setUpGameKeyListeners();

  function setUpGameKeyListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        userInputHandler.HandleUserInput(event.keyCode);
      }
    }, false);
  }
}

function gameFactory() {
  const gameCanvas = buildGameCanvas();
  return buildGame(gameCanvas);
}

function buildGameCanvas() {
  const canvas = document.getElementById("game-board-canvas");
  canvas.width = window.innerWidth - (window.innerWidth % levelCopy[0].length);
  canvas.height = window.innerHeight - (window.innerHeight % levelCopy.length);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cellWidth = canvas.width / levelCopy[0].length;
  const cellHeight = canvas.height / levelCopy.length;

  return{
    canvas:canvas,
    cellWidth:cellWidth,
    cellHeight:cellHeight
  }
}

function buildGame(gameBoard) {
  const mapRenderer = new MapRenderer(levelCopy, gameBoard, spiriteManager);
  const mapManager =  new MapManager(levelCopy);
  return new Game(mapManager, mapRenderer, spiriteManager, window.uiIntefaceAdapter);
}

function newGameListener() {
  window.game.close();
  window.game = gameFactory();
}

window.game = init();

