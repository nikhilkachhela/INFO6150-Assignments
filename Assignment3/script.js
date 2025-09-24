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

        // Add Delete + Edit buttons
        deleteCell.innerHTML = `<button class="btn btn-delete">Delete</button>`;
        editCell.innerHTML = `<button class="btn btn-edit">Edit</button>`;

        deleteCell.querySelector("button").addEventListener("click", () => {
          const studentName = row.cells[1].textContent;
          row.remove();
          expandRow.remove();
          alert(`${studentName} Record deleted successfully`);
          renumberStudents();
          updateSubmitButton();
        });

        editCell.querySelector("button").addEventListener("click", () => {
          const studentName = row.cells[1].textContent;
          const newData = prompt(`Edit details of ${studentName}:`, "");
          if (newData && newData.trim() !== "") {
            alert(`${studentName} data updated successfully`);
          }
        });

      } else {
        row.classList.remove("yellow-row");
        deleteCell.innerHTML = "";
        editCell.innerHTML = "";
      }
      updateSubmitButton();
    });

    // Expand/Collapse
    arrow.addEventListener("click", () => {
      if (expandRow.classList.contains("collapsed")) {
        expandRow.classList.remove("collapsed");
        expandRow.classList.add("expanded");
        arrow.style.transform = "rotate(90deg)";
      } else {
        expandRow.classList.remove("expanded");
        expandRow.classList.add("collapsed");
        arrow.style.transform = "rotate(0deg)";
      }
    });
  }

  function renumberStudents() {
  const rows = studentTable.querySelectorAll("tr");
  let number = 1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Main student rows have at least 5 cells (checkbox + student + teacher + subject + marks...)
    if (row.cells.length > 1 && row.cells[1].textContent.startsWith("Student")) {
      row.cells[1].textContent = `Student ${number}`;
      row.cells[2].textContent = `Teacher ${number}`;
      row.cells[3].textContent = `Subject ${number}`;

      // Update expandable row (the very next row after this one)
      const expandRow = rows[i + 1];
      if (expandRow && expandRow.cells.length === 1) {
        expandRow.cells[0].textContent = `Extra details for Student ${number}`;
      }

      number++;
    }
  }

  studentCount = number - 1; // keep counter in sync
}


  addStudentBtn.addEventListener("click", addStudent);
});
