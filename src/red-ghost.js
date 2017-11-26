export default function RedGhost(initData) {
  var mode = "scatter";
  var position = initData.position;
  var destination = initData.destination;
  this.path = initData.path;


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
    path:this.path
  }
}
