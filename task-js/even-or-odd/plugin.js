// get number from user
function getInteger(label) {
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
    value = Number(value);
    // check integer using % 
    if (value % 1 !== 0) {
      alert("You must Enter an integer Number");
      continue;
    }
    break;
  }
  return value;
}
// check even or odd
function checkEvenOrOdd(num) {
  if (num % 2 === 0) {
    return "The Number is Even";
  } else {
    return "The Number is Odd";
  }
}
function checkNumber() {
  let num = getInteger("Enter an integer Number:");
  let message = checkEvenOrOdd(num);
  document.getElementById("result").innerHTML =
    "Number: " + num + "<br>" + message;
}
document.getElementById("startBtn").addEventListener("click", checkNumber);