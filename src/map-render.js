export default function MapRender(context, width, height, map) {
  for (let i = 0; i < map[0].length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[j][i] == 1) {
        context.fillStyle = "black";
      } else if (map[j][i] == 0) {
        context.fillStyle = "white";
      } else if (map[j][i] == 2) {
        context.fillStyle = "yellow";
      }
      else if (map[j][i] == 3) {
        context.fillStyle = "red";
      }
      context.fillRect(Math.floor(i * width), Math.floor(j * height), Math.floor(width), Math.floor(height));
    }
  }
}
