// js/modules/student.js
export function loadStudentModule(container) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
  
    function renderTable() {
      const tableBody = document.getElementById('studentTable');
      tableBody.innerHTML = '';
      students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.roll}</td>
          <td>${student.courses}</td>
          <td>${student.year}</td>
          <td>${student.semester}</td>
          <td>${student.email}</td>
          <td>${student.image ? `<img src="${student.image}" alt="${student.name}" width="50" height="50">` : 'No Image'}</td>
          <td>
            <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editStudent(event)">Edit</button>
            <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteStudent(event)">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    function saveStudents() {
      localStorage.setItem('students', JSON.stringify(students));
    }
  
    container.innerHTML = `
      <div class="module-section">
        <h3>Student Management Module</h3>
        <form id="studentForm" class="mb-3">
          <input type="hidden" id="studentIndex" value="">
          <div class="form-group">
            <input type="text" id="studentName" class="form-control" placeholder="Student Name" required>
          </div>
          <div class="form-group">
            <input type="text" id="rollNumber" class="form-control" placeholder="Roll Number" required>
          </div>
          <div class="form-group">
            <input type="text" id="studentCourses" class="form-control" placeholder="Courses" required>
          </div>
          <div class="form-group">
            <input type="text" id="studentYear" class="form-control" placeholder="Year" required>
          </div>
          <div class="form-group">
            <input type="text" id="studentSemester" class="form-control" placeholder="Semester" required>
          </div>
          <div class="form-group">
            <input type="email" id="studentEmail" class="form-control" placeholder="Email" required>
          </div>
          <div class="form-group">
            <input type="file" id="studentImage" class="form-control" accept="image/*">
          </div>
          <button type="submit" class="btn btn-primary">Save Student</button>
        </form>
        <h3>Student List</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Courses</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Email</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="studentTable"></tbody>
        </table>
      </div>
    `;
  
    const studentForm = document.getElementById('studentForm');
    studentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const index = document.getElementById('studentIndex').value;
      const name = document.getElementById('studentName').value;
      const roll = document.getElementById('rollNumber').value;
      const courses = document.getElementById('studentCourses').value;
      const year = document.getElementById('studentYear').value;
      const semester = document.getElementById('studentSemester').value;
      const email = document.getElementById('studentEmail').value;
      const imageInput = document.getElementById('studentImage');
      let studentImage = '';
  
      if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        studentImage = URL.createObjectURL(file);
      }
  
      const studentObj = { name, roll, courses, year, semester, email, image: studentImage };
  
      if (index === "") {
        students.push(studentObj);
      } else {
        students[index] = studentObj;
      }
      saveStudents();
      renderTable();
      studentForm.reset();
      document.getElementById('studentIndex').value = '';
    });
  
    window.editStudent = function(e) {
      const index = e.target.getAttribute('data-index');
      const student = students[index];
      document.getElementById('studentName').value = student.name;
      document.getElementById('rollNumber').value = student.roll;
      document.getElementById('studentCourses').value = student.courses;
      document.getElementById('studentYear').value = student.year;
      document.getElementById('studentSemester').value = student.semester;
      document.getElementById('studentEmail').value = student.email;
      document.getElementById('studentIndex').value = index;
      document.getElementById('studentImage').value = ''; // Reset image input
    };
  
    window.deleteStudent = function(e) {
      const index = e.target.getAttribute('data-index');
      if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        saveStudents();
        renderTable();
      }
    };
  
    renderTable();
}
