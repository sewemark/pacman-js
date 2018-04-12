import {levels, levelsDefinitions} from "../map-definitions/map";
import '../index.css';
import SpiritesManager from '../map-definitions/sprites-manager';
import MapManager from '../map/map-manager';
import MapRenderer from '../map/map-renderer';
import Game from '../game/game';
import UIIntefaceAdapter from '../ui-adapters/ui-interface-adapter';
import PacmanCollisionStartegy from "../collisions/pacman-collision-strategy";
import GhostCollisionStartegy from "../collisions/ghost-collision-strategy";
import RedGhost from "../ghosts/red-ghost";
import BlueGhost from '../ghosts/blue-ghost';

import YellowGhost from "../ghosts/yellow-ghost";
import Player from "../player/player";
import ActorDefinitions from "../map-definitions/map-config";
import {deepCopy} from "../common/utils";

function MainController() {
  const spiriteManager = new SpiritesManager();

  function Init() {
    var wrapper = document.getElementById("wrapper-div");
    BuildMenu();
    HidePanels();

    function BuildMenu() {
      levels.forEach((x, index) => {
        const ul = document.getElementById('select-level-div-ul');
        const li = document.createElement('li');
        const div = document.createElement('div');

        li.style.backgroundImage = "../assets/Button_05.png";
        div.innerText = "Level " + (index + 1).toString();
        li.appendChild(div);
        li.onclick = StartGame;
        ul.appendChild(li);
      })
    }

    function HidePanels() {
      for (let i = 1; i < wrapper.children.length; i++) {
        wrapper.children[i].style.visibility = "hidden";
        wrapper.children[i].style.display = "none";
      }
    }
  }

  function StartGame(target) {
    window.game = InitGame(getLevelToPlay(target));
    window.game.Start();
    InitUIState();
  }

  function getLevelToPlay(target) {
      const levelIndex = target.target.innerText.split(' ').pop();
      return deepCopy(levelsDefinitions[levelIndex]);
  }
  function InitUIState() {
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

  function EndGame() {
    HideGameState();
    window.game.Close();
    delete window.game;
  }

  function HideGameState() {
    var wrapper = document.getElementById("wrapper-div");
    for (let i = 1; i < wrapper.children.length; i++) {
      wrapper.children[i].style.visibility = "hidden";
      wrapper.children[i].style.display = "none";
    }
    wrapper.children[0].style.visibility = "visible";
    wrapper.children[0].style.display = "block";
  }

  function InitGame(levelToPlay) {
    window.uiIntefaceAdapter = new UIIntefaceAdapter(spiriteManager);
    const gameCanvas = BuildGameCanvas(levelToPlay);
    const game = BuildGame(gameCanvas,levelToPlay);
    InitUIListeners(game);
    return game;
  }

  function InitUIListeners(userInputHandler) {
    var button = document.getElementById("new-game-button");
    button.addEventListener("click", NewGameListener.bind(window));
    setUpGameKeyListeners();

    function setUpGameKeyListeners() {
      document.addEventListener('keydown', (event) => {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          userInputHandler.HandleUserInput(event.keyCode);
        }
      }, false);
    }
  }

  function BuildGameCanvas(levelToPlay) {
    const canvas = document.getElementById("game-board-canvas");
    canvas.width = window.innerWidth - (window.innerWidth % levelToPlay[0].length);
    canvas.height = window.innerHeight - (window.innerHeight % levelToPlay.length);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellWidth = canvas.width / levelToPlay[0].length;
    const cellHeight = canvas.height / levelToPlay.length;

    return {
      canvas: canvas,
      cellWidth: cellWidth,
      cellHeight: cellHeight
    }
  }

  function BuildGame(gameBoard, levelToPlay) {
    const mapRenderer = new MapRenderer(levelToPlay, gameBoard, spiriteManager);
    const mapManager = new MapManager(levelToPlay);
    const ghostCollisionStrategy = new GhostCollisionStartegy(mapManager.GetLevelInfo());
    const pacmanMoveStrategy = new PacmanCollisionStartegy(mapManager.GetLevelInfo());
    const redGhost = new RedGhost(ghostCollisionStrategy, mapManager);
    const blueGhost = new BlueGhost(ghostCollisionStrategy, mapManager);
    const yellowGhost = new YellowGhost(ghostCollisionStrategy, mapManager);
    const player = new Player(pacmanMoveStrategy, mapManager.GetItemPosition(ActorDefinitions.PLAYER));
    return new Game(mapManager,
      mapRenderer,
      spiriteManager,
      window.uiIntefaceAdapter,
      redGhost, yellowGhost, blueGhost, player);
  }

  function NewGameListener() {
    EndGame()
  }

  return {
    init: Init,
  }
}

export default MainController;
