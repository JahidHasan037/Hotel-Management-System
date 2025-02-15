// js/modules/faculty.js
export function loadFacultyModule(container) {
    let faculties = JSON.parse(localStorage.getItem('faculties')) || [];
    function renderFaculties() {
      const facultyTable = document.getElementById('facultyTable');
      facultyTable.innerHTML = '';
      faculties.forEach((faculty, index) => {
        const row = `<tr>
            <td>${faculty.name}</td>
            <td>${faculty.department}</td>
            <td>${faculty.email}</td>
            <td>
              <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editFaculty(event)">Edit</button>
              <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteFaculty(event)">Delete</button>
            </td>
          </tr>`;
        facultyTable.innerHTML += row;
      });
    }
    function saveFaculties() {
      localStorage.setItem('faculties', JSON.stringify(faculties));
    }
    function addOrUpdateFaculty(e) {
      e.preventDefault();
      const index = document.getElementById('facultyIndex').value;
      const name = document.getElementById('facultyName').value;
      const department = document.getElementById('facultyDepartment').value;
      const email = document.getElementById('facultyEmail').value;
      const faculty = { name, department, email };
      index === "" ? faculties.push(faculty) : faculties[index] = faculty;
      saveFaculties();
      renderFaculties();
      document.getElementById('facultyForm').reset();
      document.getElementById('facultyIndex').value = '';
    }
    window.editFaculty = function(e) {
      const index = e.target.getAttribute('data-index');
      const faculty = faculties[index];
      document.getElementById('facultyName').value = faculty.name;
      document.getElementById('facultyDepartment').value = faculty.department;
      document.getElementById('facultyEmail').value = faculty.email;
      document.getElementById('facultyIndex').value = index;
    };
    window.deleteFaculty = function(e) {
      faculties.splice(e.target.getAttribute('data-index'), 1);
      saveFaculties();
      renderFaculties();
    };
    container.innerHTML = `
      <div class="module-section">
        <h3>Faculty Management Module</h3>
        <form id="facultyForm" class="mb-3">
          <input type="hidden" id="facultyIndex">
          <div class="form-group">
            <input type="text" id="facultyName" class="form-control" placeholder="Faculty Name" required>
          </div>
          <div class="form-group">
            <input type="text" id="facultyDepartment" class="form-control" placeholder="Department" required>
          </div>
          <div class="form-group">
            <input type="email" id="facultyEmail" class="form-control" placeholder="Email" required>
          </div>
          <button type="submit" class="btn btn-primary">Save Faculty</button>
        </form>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="facultyTable"></tbody>
        </table>
      </div>
    `;
    document.getElementById('facultyForm').addEventListener('submit', addOrUpdateFaculty);
    renderFaculties();
  }
  