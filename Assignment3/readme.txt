Assignment 3 – Dynamic Student Table

This project implements a dynamic student management system using HTML, CSS, and JavaScript. It allows adding, editing, deleting, expanding, and selecting student records in a tabular format.

Features: 

Student Info Header
    Displays your Full Name and NUID at the top of the page.

Add Student
    Adds a new student row with mock data (Student, Teacher, Subject, and random Marks).
    Each student has an expandable details row.
    Success message is shown when a student is added.

Select + Submit Button
    Submit button is initially disabled.
    Selecting any student row via checkbox enables the button.
    Selected rows are highlighted in yellow.

Delete Functionality

    When a row is selected, a Delete button appears.
    Deleting a student removes both the main row and its expandable details row.
    Rows are renumbered automatically after deletion.
    Confirmation alert shown after deletion.

Edit Functionality

    When a row is selected, an Edit button appears.
    Allows updating student details via a prompt.
    Displays a success message after update.

Expand/Collapse Details

    Each row has an arrow icon.
    Clicking it toggles an expandable row with extra student details.

Row Renumbering

    After deleting rows, all remaining students are renumbered (Student 1, Student 2, …).
    sTeacher, Subject, and details rows are updated accordingly.