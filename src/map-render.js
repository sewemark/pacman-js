export default function MapRender(context, width, height, map) {
  for (let i = 0; i < map[0].length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[j][i] == 1) {
        context.fillStyle = "black";
        context.fillRect(Math.floor(i * width), Math.floor(j * height), Math.floor(width), Math.floor(height));

      } else if (map[j][i] == 0) {
        context.fillStyle = "white";
        context.fillRect(Math.floor(i * width), Math.floor(j * height), Math.floor(width), Math.floor(height));
      }

      else if (map[j][i] == 4) {
        context.fillStyle = "white";
        context.fillRect(Math.floor(i * width), Math.floor(j * height), Math.floor(width), Math.floor(height));
        context.fillStyle = "green";
        context.fillRect(Math.floor((i * width)), Math.floor((j * height)) , Math.floor(width/2), Math.floor(height/2 ));
      }
      else if (map[j][i] == 2) {
        context.fillStyle = "yellow";
        context.fillRect(Math.floor(i * width), Math.floor(j * height), Math.floor(width), Math.floor(height));
      }
      else if (map[j][i] == 3) {
        context.fillStyle = "red";
        context.fillRect(Math.floor(i * width), Math.floor(j * height), Math.floor(width), Math.floor(height));
      }
    }
  }
}
