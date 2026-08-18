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
// root degree
function getRootDegree() {
  let value;
  while (true) {
    value = getNumber("Enter the Root degree (example: 2 for square root):");
    if (value === 0) {
      alert("Root degree cannot be zero!");
      continue;
    }
    break;
  }
  return value;
}
// calculate the root
function calculateRoot(number, degree) {
  return number ** (1 / degree);
}
function runRootCalculator() {
  let number = getNumber("Enter The Number:");
  let degree = getRootDegree();
  let result = calculateRoot(number, degree);
  document.getElementById("result").innerHTML =
    "Root " + degree + " of " + number + " = " + result;
}
document.getElementById("startBtn").addEventListener("click", runRootCalculator);