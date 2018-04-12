export default function getItemPosition(array, item) {
  for (var i = 0; i < array.length; i++) {
    let index = array[i].findIndex(x => x === item);
    if (index >= 0) {
      return {
        y: i,
        x: index
      }
    }
  }
  return {
    y: -1,
    x: -1
  }
}

export function deepCopy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? deepCopy(v) : v;
  }
  return output;
}
