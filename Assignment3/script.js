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

  // Create new student row
  function addStudent() {
    studentCount++;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox"></td>
      <td>Student ${studentCount}</td>
      <td>Teacher ${studentCount}</td>
      <td>Subject ${studentCount}</td>
      <td>${Math.floor(Math.random() * 100)}</td>
      <td><img src="https://cdn-icons-png.flaticon.com/512/32/32195.png" class="arrow" width="20"></td>
      <td></td>
      <td></td>
    `;

    // Expandable hidden row
    const expandRow = document.createElement("tr");
    expandRow.classList.add("collapsed");
    expandRow.innerHTML = `
      <td colspan="8">Extra details for Student ${studentCount}</td>
    `;

    studentTable.appendChild(row);
    studentTable.appendChild(expandRow);

    alert(`Student ${studentCount} Record added successfully`);
    attachRowEvents(row, expandRow);
  }

  function attachRowEvents(row, expandRow) {
    const checkbox = row.querySelector("input[type='checkbox']");
    const arrow = row.querySelector(".arrow");
    const deleteCell = row.cells[6];
    const editCell = row.cells[7];

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        row.classList.add("yellow-row");


