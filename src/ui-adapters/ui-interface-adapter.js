import ActorDefinitions  from '../map-definitions/map-config';

export default function UIIntefaceAdapter(spritesManager) {
  this.spritesManager = spritesManager;
  this.updateUserInfo = function (data) {
    var pointsElement = document.getElementById("content-p-points");
    pointsElement.innerText = "You have  " + data.playerPoints + " point";
    var img = document.createElement("img");
    img.setAttribute("src", this.spritesManager.getIcons(ActorDefinitions.FOODICON));
    img.style="background:none; border:none;width:2.5em;height:2.5em";
    pointsElement.appendChild(img);
    var elem = document.getElementById("content-ul--lifes");

    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
    elem.innerText = "Lifes";
    for (let i = 0; i < data.playerLifes; i++) {
      img = document.createElement("img");
      img.style="background:none; border:none;width:2.5em;height:2.5em";
      img.setAttribute("src", this.spritesManager.getIcons(ActorDefinitions.LIFEICON));
      elem.appendChild(img);
    }


  }
}
