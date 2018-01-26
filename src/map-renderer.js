import ActorDefinitions from "./map-definitions/map-config";

export default function MapRenderer (map, canvas, cellWidth, cellHeight, spiritsManager){
  this.map = map;
  this.cellHeight = cellHeight;
  this.cellWidth = cellWidth;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.spiritsManager = spiritsManager;

  this.render = function () {
    for (let i = 0; i < this.map[0].length; i++) {
      for (let j = 0; j < this.map.length; j++) {
        if (this.map[j][i] == 1) {
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.WALL), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 0) {
          this.ctx.fillStyle = "white";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.EMPTY), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        } else if (this.map[j][i] == 4) {
          this.ctx.fillStyle = "white";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.FOOD), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          this.ctx.fillStyle = "green";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.FOODICON), Math.floor((i * this.cellWidth)) + Math.floor(this.cellWidth * 0.25), Math.floor((j * this.cellHeight)) + Math.floor(this.cellHeight * 0.25), Math.floor(this.cellWidth / 2), Math.floor(this.cellHeight / 2));
        } else if (this.map[j][i] == 2) {
          this.ctx.fillStyle = "white";
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.EMPTY), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          var x = Math.floor(i * this.cellWidth);
          var y = Math.floor(j * this.cellHeight);
          var w = Math.floor(this.cellWidth);
          var h = Math.floor(this.cellHeight);
          this.ctx.save();
          this.ctx.translate(x + w / 2, y + h / 2);
          this.ctx.rotate(this.spiritsManager.getRotate() * Math.PI / 180.0);
          this.ctx.translate(-x - w / 2, -y - h / 2);
          this.ctx.drawImage(this.spiritsManager.getSpirit(2), x, y, w, h);
          this.ctx.restore();
        } else if (this.map[j][i] == 3) {
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.EMPTY), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
          this.ctx.drawImage(this.spiritsManager.getSpirit(ActorDefinitions.REDGHOST), Math.floor(i * this.cellWidth), Math.floor(j * this.cellHeight), Math.floor(this.cellWidth), Math.floor(this.cellHeight));
        }
      }
    }

  }
}
