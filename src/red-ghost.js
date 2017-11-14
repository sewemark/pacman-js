export default function RedGhost(position, destination, path) {
  var mode = "scatter";
  var position = position;
  var destination = destination;
  this.path = path;


  function getDirection(position) {
    var firstPath = this.path.splice(0,1);
    if (firstPath[0][0] == position.x) {
        if(firstPath[0][1] > position.y) return 40;
        else  return 38;

    } else {
         if(firstPath [0][0] > position.x) return 39;
        else  return 37;
    }
  }



  return {
    getDirection: getDirection,
    path:path
  }
}
