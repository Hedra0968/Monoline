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
// check if the number is negative, positive or zero
function checkSign(num) {
  if (num > 0) {
    return "The Number is Positive";
  } else if (num < 0) {
    return "The Number is Negative";
  } else {
    return "The Number is Zero";
  }
}
function checkNumberSign() {
  let num = getNumber("Enter a Number:");
  let message = checkSign(num);
  document.getElementById("result").innerHTML =
    "Number: " + num + "<br>" + message;
}
document.getElementById("startBtn").addEventListener("click", checkNumberSign);