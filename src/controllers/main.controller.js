import {levels} from "../map-definitions/map";
import '../index.css';
import levelCopy from '../map-definitions/map';
import SpiritesManager from '../map-definitions/sprites-manager';
import MapManager from '../map/map-manager';
import MapRenderer from '../map/map-renderer';
import Game from '../game/game';
import UIIntefaceAdapter from '../ui-adapters/ui-interface-adapter';
import PacmanCollisionStartegy from "../collisions/pacman-collision-strategy";
import GhostCollisionStartegy from "../collisions/ghost-collision-strategy";
import RedGhost from "../ghosts/red-ghost";
import YellowGhost from "../ghosts/yellow-ghost";
import Player from "../player/player";
import ActorDefinitions from "../map-definitions/map-config";

function mainController() {
  const spiriteManager = new SpiritesManager();

  function init() {
    var wrapper = document.getElementById("wrapper-div");
    buildMenu();
    hidePanels();

    function buildMenu() {
      levels.forEach((x, index) => {
        const ul = document.getElementById('select-level-div-ul');
        const li = document.createElement('li');
        const div = document.createElement('div');

        li.style.backgroundImage = "../assets/Button_05.png";
        div.innerText = "Level " + (index + 1).toString();
        li.appendChild(div);
        li.onclick = startGame;
        ul.appendChild(li);
      })
    }

    function hidePanels() {
      for (let i = 1; i < wrapper.children.length; i++) {
        wrapper.children[i].style.visibility = "hidden";
        wrapper.children[i].style.display = "none";
      }
    }
  }

  function startGame() {
    window.game = initGame();
    window.game.Start();
    initUIState();
  }

  function initUIState() {
    var wrapper = document.getElementById("wrapper-div");
    showGamePanel();
    hidePanels();

    function showGamePanel() {
      for (let i = 0; i < wrapper.children.length - 1; i++) {
        wrapper.children[i].style.visibility = "hidden";
        wrapper.children[i].style.display = "none";

      }
    }

    function hidePanels() {
      wrapper.children[wrapper.children.length - 1].style.visibility = "visible";
      wrapper.children[wrapper.children.length - 1].style.display = "block";
    }
  }

  function endGame() {
    hideGameState();
    window.game.close();
    delete window.game;
  }

  function hideGameState() {
    var wrapper = document.getElementById("wrapper-div");
    for (let i = 1; i < wrapper.children.length; i++) {
      wrapper.children[i].style.visibility = "hidden";
      wrapper.children[i].style.display = "none";
    }
    wrapper.children[0].style.visibility = "visible";
    wrapper.children[0].style.display = "block";
  }

  function initGame() {
    window.uiIntefaceAdapter = new UIIntefaceAdapter(spiriteManager);
    const gameCanvas = buildGameCanvas();
    const game = buildGame(gameCanvas);
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

  function buildGameCanvas() {
    const canvas = document.getElementById("game-board-canvas");
    canvas.width = window.innerWidth - (window.innerWidth % levelCopy[0].length);
    canvas.height = window.innerHeight - (window.innerHeight % levelCopy.length);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellWidth = canvas.width / levelCopy[0].length;
    const cellHeight = canvas.height / levelCopy.length;

    return {
      canvas: canvas,
      cellWidth: cellWidth,
      cellHeight: cellHeight
    }
  }

  function buildGame(gameBoard) {
    const mapRenderer = new MapRenderer(levelCopy, gameBoard, spiriteManager);
    const mapManager = new MapManager(levelCopy);
    const ghostCollisionStrategy = new GhostCollisionStartegy(mapManager.getLevelInfo());
    const pacmanMoveStrategy = new PacmanCollisionStartegy(mapManager.getLevelInfo());
    const redGhost = new RedGhost(ghostCollisionStrategy, mapManager);
    const yellowGhost =  new YellowGhost(ghostCollisionStrategy, mapManager);
    const player = new Player(pacmanMoveStrategy, mapManager.getItemPosition(ActorDefinitions.PLAYER));
    return new Game(mapManager,
                    mapRenderer,
                    spiriteManager,
                    window.uiIntefaceAdapter,
                    pacmanMoveStrategy, ghostCollisionStrategy, redGhost, yellowGhost, player);
  }

  function newGameListener() {
    endGame(undefined, undefined)
  }

  return {
    init: init,
  }
}

export default mainController;
