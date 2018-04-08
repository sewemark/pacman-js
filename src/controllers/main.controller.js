import menuController from './menu.controller';
import { levels}  from "../map-definitions/map";
import windowImg from '../assets/Windows_03.png';
import button from '../assets/Button_05.png';
import '../index.css';
import levelCopy from '../map-definitions/map';
import SpiritesManager from '../map-definitions/sprites-manager';
import MapManager from '../map/map-manager';
import MapRenderer from '../map/map-renderer';
import Game from '../game/game';
import UIIntefaceAdapter  from '../ui-adapters/ui-interface-adapter';

function  mainController() {

  function init2() {
    var wrapper = document.getElementById("wrapper-div");
    const menu = wrapper.children[0];
   // const img = document.getElementById("testImg");
    //img.src =windowImg;
    levels.forEach( (x,index) => {
      const ul  = document.getElementById('select-level-div-ul');
      const li  = document.createElement('li');
      const div = document.createElement('div');

      li.style.backgroundImage = "../assets/Button_05.png";
      div.innerText = "Level " + (index+1).toString();
      li.appendChild(div);
      li.onclick = startGame;
      ul.appendChild(li);
    })
    for(let i =1; i<wrapper.children.length;i++) {
      wrapper.children[i].style.visibility = "hidden";
      wrapper.children[i].style.display = "none";
    }

  }

  function startGame(target, levelId) {
    window.game = init();
    window.game.Start();
    var wrapper = document.getElementById("wrapper-div");
    for(let i =0; i<wrapper.children.length -1;i++) {
      wrapper.children[i].style.visibility = "hidden";
      wrapper.children[i].style.display = "none";

    }
    wrapper.children[wrapper.children.length-1].style.visibility = "visible";
    wrapper.children[wrapper.children.length-1].style.display = "block";

  }

  function endGame(target) {

    var wrapper = document.getElementById("wrapper-div");
    for(let i =1; i<wrapper.children.length;i++) {
      wrapper.children[i].style.visibility = "hidden";
      wrapper.children[i].style.display = "none";

    }
    wrapper.children[0].style.visibility = "visible";
    wrapper.children[0].style.display = "block";
    window.game.close();
    delete window.game;
  }

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
    endGame(undefined, undefined)
  }

  return {
    init:init2,
    startGame:startGame
  }

}
export default  mainController;
