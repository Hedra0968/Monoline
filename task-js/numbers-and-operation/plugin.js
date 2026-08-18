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
// get operation only
function getOperation() {
  let op;
  while (true) {
    op = prompt("Enter the Operation (+  -  *  /  %):");
    if (op === null || op.trim() === "") {
      alert("You must Enter an Operation! Empty or Cancel is not allowed");
      continue;
    }
    op = op.trim();
    if (op !== "+" && op !== "-" && op !== "*" && op !== "/" && op !== "%") {
      alert("Enter a Valid Operation: +  -  *  /  %");
      continue;
    }
    break;
  }
  return op;
}
// each operation has its own function
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero is not allowed";
  }
  return a / b;
}
function modulus(a, b) {
  if (b === 0) {
    return "Error: Division by zero is not allowed";
  }
  return a % b;
}
// this function calls
function calculate(a, b, operation) {
  if (operation === "+") {
    return add(a, b);
  } else if (operation === "-") {
    return subtract(a, b);
  } else if (operation === "*") {
    return multiply(a, b);
  } else if (operation === "/") {
    return divide(a, b);
  } else if (operation === "%") {
    return modulus(a, b);
  }
}
function runCalculator() {
  let num1 = getNumber("Enter The First Number:");
  let num2 = getNumber("Enter The Second Number:");
  let operation = getOperation();
  let result = calculate(num1, num2, operation);
  document.getElementById("result").innerHTML =
    num1 + " " + operation + " " + num2 + " = " + result;
}
document.getElementById("startBtn").addEventListener("click", runCalculator);