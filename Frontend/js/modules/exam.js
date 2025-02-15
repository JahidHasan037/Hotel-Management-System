// js/modules/exam.js
export function loadExamModule(container) {
    let exams = JSON.parse(localStorage.getItem('exams')) || [];
  
    function renderExams() {
        const examTable = document.getElementById('examTable');
        examTable.innerHTML = '';
        exams.forEach((exam, index) => {
            const row = `<tr>
                <td>${exam.course}</td>
                <td>${exam.date}</td>
                <td>${exam.time}</td>
                <td>${exam.venue}</td>
                <td>${exam.examiner}</td>
                <td>${exam.duration}</td>
                <td>
                  <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editExam(event)">Edit</button>
                  <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteExam(event)">Delete</button>
                </td>
              </tr>`;
            examTable.innerHTML += row;
        });
    }
  
    function saveExams() {
        localStorage.setItem('exams', JSON.stringify(exams));
    }
  
    function addOrUpdateExam(e) {
        e.preventDefault();
        const index = document.getElementById('examIndex').value;
        const course = document.getElementById('examCourse').value;
        const date = document.getElementById('examDate').value;
        const time = document.getElementById('examTime').value;
        const venue = document.getElementById('examVenue').value;
        const examiner = document.getElementById('examinerName').value; // Get examiner name
        const duration = document.getElementById('examDuration').value; // Get exam duration
        const examObj = { course, date, time, venue, examiner, duration };
        index === "" ? exams.push(examObj) : exams[index] = examObj;
        saveExams();
        renderExams();
        document.getElementById('examForm').reset();
        document.getElementById('examIndex').value = '';
    }
  
    window.editExam = function(e) {
        const index = e.target.getAttribute('data-index');
        const exam = exams[index];
        document.getElementById('examCourse').value = exam.course;
        document.getElementById('examDate').value = exam.date;
        document.getElementById('examTime').value = exam.time;
        document.getElementById('examVenue').value = exam.venue;
        document.getElementById('examinerName').value = exam.examiner; // Set examiner name
        document.getElementById('examDuration').value = exam.duration; // Set exam duration
        document.getElementById('examIndex').value = index;
    };
  
    window.deleteExam = function(e) {
        exams.splice(e.target.getAttribute('data-index'), 1);
        saveExams();
        renderExams();
    };
  
    container.innerHTML = `
      <div class="module-section">
        <h3>Examination Management Module</h3>
        <form id="examForm" class="mb-3">
          <input type="hidden" id="examIndex">
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
            <input type="text" id="examinerName" class="form-control" placeholder="Examiner Name" required> <!-- New examiner name field -->
          </div>
          <div class="form-group">
            <input type="text" id="examDuration" class="form-control" placeholder="Duration (e.g., 2 hours)" required> <!-- New duration field -->
          </div>
          <button type="submit" class="btn btn-primary">Save Exam</button>
        </form>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Examiner</th> <!-- New examiner column -->
              <th>Duration</th> <!-- New duration column -->
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="examTable"></tbody>
        </table>
      </div>
    `;
  
    document.getElementById('examForm').addEventListener('submit', addOrUpdateExam);
    renderExams();
  }
  