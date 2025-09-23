document.addEventListener("DOMContentLoaded", () => {
  const studentInfo = document.getElementById("student-info");
  const addStudentBtn = document.getElementById("addStudentBtn");
  const submitBtn = document.getElementById("submitBtn");
  const studentTable = document.getElementById("studentTable").querySelector("tbody");

  let studentCount = 0;

  // Requirement 1: Show Name + NUID
  studentInfo.textContent = "Full Name: Nikhil Kachhela | NUID: 002039300";

  // Requirement 2b: Disable Submit button initially
  function updateSubmitButton() {
    const anyChecked = studentTable.querySelector("input[type='checkbox']:checked");
    if (anyChecked) {
      submitBtn.disabled = false;
      submitBtn.classList.add("active");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove("active");
    }
  }

