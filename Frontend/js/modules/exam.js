// js/modules/exam.js

// Function to load the Exam Management Module inside a given container
export function loadExamModule(container) {
  // Retrieve exams from localStorage or initialize an empty array
  let exams = JSON.parse(localStorage.getItem('exams')) || [];

  // Function to display exams in the table
  function renderExams() {
      const examTable = document.getElementById('examTable');
      examTable.innerHTML = ''; // Clear the existing table data

      // Loop through exams and create table rows dynamically
      exams.forEach((exam, index) => {
          const row = `<tr>
              <td>${exam.course}</td>
              <td>${exam.date}</td>
              <td>${exam.time}</td>
              <td>${exam.venue}</td>
              <td>${exam.examiner}</td> <!-- Examiner column -->
              <td>${exam.duration}</td> <!-- Duration column -->
              <td>
                <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editExam(event)">Edit</button>
                <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteExam(event)">Delete</button>
              </td>
            </tr>`;
          examTable.innerHTML += row;
      });
  }

  // Function to save exams to localStorage
  function saveExams() {
      localStorage.setItem('exams', JSON.stringify(exams));
  }

  // Function to handle adding or updating an exam
  function addOrUpdateExam(e) {
      e.preventDefault(); // Prevent form submission

      // Get values from form fields
      const index = document.getElementById('examIndex').value;
      const course = document.getElementById('examCourse').value;
      const date = document.getElementById('examDate').value;
      const time = document.getElementById('examTime').value;
      const venue = document.getElementById('examVenue').value;
      const examiner = document.getElementById('examinerName').value; // Get examiner name
      const duration = document.getElementById('examDuration').value; // Get exam duration

      // Create an exam object
      const examObj = { course, date, time, venue, examiner, duration };

      // If index is empty, add a new exam; otherwise, update the existing exam
      if (index === "") {
          exams.push(examObj);
      } else {
          exams[index] = examObj;
      }

      // Save the updated exams list and re-render the table
      saveExams();
      renderExams();

      // Reset the form fields after submission
      document.getElementById('examForm').reset();
      document.getElementById('examIndex').value = '';
  }

  // Function to edit an existing exam
  window.editExam = function(e) {
      const index = e.target.getAttribute('data-index'); // Get exam index
      const exam = exams[index]; // Retrieve the selected exam

      // Populate the form with exam details for editing
      document.getElementById('examCourse').value = exam.course;
      document.getElementById('examDate').value = exam.date;
      document.getElementById('examTime').value = exam.time;
      document.getElementById('examVenue').value = exam.venue;
      document.getElementById('examinerName').value = exam.examiner; // Set examiner name
      document.getElementById('examDuration').value = exam.duration; // Set exam duration
      document.getElementById('examIndex').value = index; // Store index for updating
  };

  // Function to delete an exam
  window.deleteExam = function(e) {
      const index = e.target.getAttribute('data-index'); // Get exam index
      exams.splice(index, 1); // Remove exam from the array

      // Save the updated exams list and re-render the table
      saveExams();
      renderExams();
  };

  // HTML template for the Exam Management UI
  container.innerHTML = `
    <div class="module-section">
      <h3>Examination Management Module</h3>
      
      <!-- Form to Add or Edit an Exam -->
      <form id="examForm" class="mb-3">
        <input type="hidden" id="examIndex"> <!-- Hidden field to store exam index -->

        <div class="form-group">
          <input type="text" id="examCourse" class="form-control" placeholder="Course Name" required>
        </div>

        <div class="form-group">
          <input type="date" id="examDate" class="form-control" required>
        </div>

        <div class="form-group">
          <input type="time" id="examTime" class="form-control" required>
        </div>

        <div class="form-group">
          <input type="text" id="examVenue" class="form-control" placeholder="Venue" required>
        </div>

        <div class="form-group">
          <input type="text" id="examinerName" class="form-control" placeholder="Examiner Name" required> <!-- Examiner name field -->
        </div>

        <div class="form-group">
          <input type="text" id="examDuration" class="form-control" placeholder="Duration (e.g., 2 hours)" required> <!-- Exam duration field -->
        </div>

        <button type="submit" class="btn btn-primary">Save Exam</button>
      </form>

      <!-- Table to Display Exam List -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Course</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Examiner</th> <!-- Examiner column -->
            <th>Duration</th> <!-- Duration column -->
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="examTable"></tbody>
      </table>
    </div>
  `;

  // Attach event listener to the form for adding/updating exams
  document.getElementById('examForm').addEventListener('submit', addOrUpdateExam);

  // Render the exam list when the module is loaded
  renderExams();
}
