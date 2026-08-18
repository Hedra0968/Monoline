// get subject mark from user, number between 0 and 50
function getMark(subjectName) {
  let mark;
  while (true) {
    mark = prompt("Enter mark for " + subjectName + " (0 to 50):");
    if (mark === null || mark.trim() === "") {
      alert("You must Enter a Value! Empty or Cancel is not allowed");
      continue;
    }
    mark = mark.trim();
    if (isNaN(mark)) {
      alert("You must Enter Numbers only!");
      continue;
    }
    mark = Number(mark);
    if (mark < 0 || mark > 50) {
      alert("Mark must be Between 0 and 50!");
      continue;
    }
    break;
  }
  return mark;
}
// grade letter based on percentage
function getGrade(percentage) {
  if (percentage >= 90) {
    return "A";
  } else if (percentage >= 80) {
    return "B";
  } else if (percentage >= 70) {
    return "C";
  } else if (percentage >= 60) {
    return "D";
  } else if (percentage >= 40) {
    return "E";
  } else {
    return "F";
  }
}
function calculateGrades() {
  let physics = getMark("Physics");
  let chemistry = getMark("Chemistry");
  let biology = getMark("Biology");
  let mathematics = getMark("Mathematics");
  let computer = getMark("Computer");
  // add marks manually
  let total = physics + chemistry + biology + mathematics + computer;
  let fullMark = 250;
  let percentage = (total / fullMark) * 100;
  let grade = getGrade(percentage);
  document.getElementById("result").innerHTML =
    "Total: " + total + " / " + fullMark + "<br>" +
    "Percentage: " + percentage + "%<br>" +
    "Grade: " + grade;
}
document.getElementById("startBtn").addEventListener("click", calculateGrades);
