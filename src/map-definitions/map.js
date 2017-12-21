var level1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
  [1, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1],
  [1, 4, 4, 1, 4, 4, 4, 2, 1, 4, 1, 4, 4, 4, 4, 4, 1, 4, 1],
  [1, 4, 4, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 4, 1, 4, 1],
  [1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
  [1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
  [1, 4, 4, 1, 4, 1, 1, 1, 1, 1, 4, 1, 1, 4, 4, 4, 1, 4, 1],
  [1, 1, 4, 1, 4, 1, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 1, 4, 1],
  [1, 4, 4, 1, 4, 1, 1, 1, 1, 1, 1, 4, 1, 4, 4, 4, 1, 4, 1],
  [1, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
  [1, 4, 1, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
  [1, 4, 1, 4, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4, 1],
  [1, 4, 1, 4, 1, 4, 1, 1, 4, 4, 4, 1, 4, 4, 4, 1, 1, 4, 1],
  [1, 4, 1, 4, 3, 4, 4, 1, 4, 4, 4, 1, 4, 1, 4, 4, 4, 4, 1],
  [1, 4, 1, 1, 1, 1, 4, 1, 4, 4, 4, 1, 4, 1, 4, 1, 4, 4, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
export default copy(level1);
//refact to getting user position dynamically
const userPosition = {
  x: 7,
  y: 3
};
export {
  userPosition
}
function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
}
