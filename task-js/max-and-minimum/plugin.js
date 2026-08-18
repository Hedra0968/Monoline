// get number from user
function getNumber(label) {
  let value;
  while (true) {
    value = prompt(label);
    if (value === null || value.trim() === "") {
      alert("You must Enter a Value! Empty or Cancel is not allowed");
      continue;
    }
    value = value.trim();
    if (isNaN(value)) {
      alert("You must Enter Numbers only!");
      continue;
    }
    break;
  }
  return Number(value);
}
// find max and min
function findMaxAndMin(a, b, c) {
  let max = a;
  if (b > max) {
    max = b;
  }
  if (c > max) {
    max = c;
  }
  let min = a;
  if (b < min) {
    min = b;
  }
  if (c < min) {
    min = c;
  }
  return { max: max, min: min };
}
function calculateMaxMin() {
  let x = getNumber("Enter The First Number:");
  let y = getNumber("Enter The Second Number:");
  let z = getNumber("Enter The Third Number:");
  let result = findMaxAndMin(x, y, z);
  document.getElementById("result").innerHTML =
    "Numbers: " + x + " , " + y + " , " + z + "<br>" +
    "Max: " + result.max + "<br>" +
    "Min: " + result.min;
}
document.getElementById("startBtn").addEventListener("click", calculateMaxMin);