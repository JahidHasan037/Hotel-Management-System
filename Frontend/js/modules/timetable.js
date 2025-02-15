// js/modules/timetable.js
export function loadTimetableModule(container) {
    let timetables = JSON.parse(localStorage.getItem('timetables')) || [];
  
    function renderTimetable() {
        const timetableTable = document.getElementById('timetableTable');
        timetableTable.innerHTML = '';
        timetables.forEach((tt, index) => {
            const row = `<tr>
                <td>${tt.day}</td>
                <td>${tt.time}</td>
                <td>${tt.subject}</td>
                <td>${tt.room}</td>
                <td>${tt.instructorId}</td>
                <td>${tt.instructorName}</td>
                <td>
                    <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editTimetable(event)">Edit</button>
                    <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteTimetable(event)">Delete</button>
                </td>
            </tr>`;
            timetableTable.innerHTML += row;
        });
    }
  
    function saveTimetables() {
        localStorage.setItem('timetables', JSON.stringify(timetables));
    }
  
    function addOrUpdateTimetable(e) {
        e.preventDefault();
        const index = document.getElementById('timetableIndex').value;
        const day = document.getElementById('timetableDay').value;
        const time = document.getElementById('timetableTime').value;
        const subject = document.getElementById('timetableSubject').value;
        const room = document.getElementById('timetableRoom').value;
        const instructorId = document.getElementById('instructorId').value; // New field
        const instructorName = document.getElementById('instructorName').value; // New field
        const tt = { day, time, subject, room, instructorId, instructorName }; // Updated object
        index === "" ? timetables.push(tt) : timetables[index] = tt;
        saveTimetables();
        renderTimetable();
        document.getElementById('timetableForm').reset();
        document.getElementById('timetableIndex').value = '';
  }
  
  window.editTimetable = function(e) {
    const index = e.target.getAttribute('data-index');
    const tt = timetables[index];
    document.getElementById('timetableDay').value = tt.day;
    document.getElementById('timetableTime').value = tt.time;
    document.getElementById('timetableSubject').value = tt.subject;
    document.getElementById('timetableRoom').value = tt.room;
    document.getElementById('instructorId').value = tt.instructorId; // New field
    document.getElementById('instructorName').value = tt.instructorName; // New field
    document.getElementById('timetableIndex').value = index;
};

window.deleteTimetable = function(e) {
    timetables.splice(e.target.getAttribute('data-index'), 1);
    saveTimetables();
    renderTimetable();
};

container.innerHTML = `
<div class="module-section">
  <h3>Timetable Management Module</h3>
  <form id="timetableForm" class="mb-3">
    <input type="hidden" id="timetableIndex">
    <div class="form-group">
      <input type="text" id="timetableDay" class="form-control" placeholder="Day (e.g., Monday)" required>
    </div>
    <div class="form-group">
          <input type="time" id="timetableTime" class="form-control" placeholder="Time" required>
        </div>
        <div class="form-group">
          <input type="text" id="timetableSubject" class="form-control" placeholder="Subject" required>
        </div>
        <div class="form-group">
          <input type="text" id="timetableRoom" class="form-control" placeholder="Room" required>
        </div>
        <div class="form-group">
          <input type="text" id="instructorId" class="form-control" placeholder="Instructor ID" required> <!-- New field -->
        </div>
        <div class="form-group">
          <input type="text" id="instructorName" class="form-control" placeholder="Instructor Name" required> <!-- New field -->
        </div>
        <button type="submit" class="btn btn-primary">Save Timetable</button>
      </form>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Subject</th>
            <th>Room</th>
            <th>Instructor ID</th> <!-- New column -->
            <th>Instructor Name</th> <!-- New column -->
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="timetableTable"></tbody>
      </table>
    </div>
  `;

  document.getElementById('timetableForm').addEventListener('submit', addOrUpdateTimetable);
  renderTimetable();
}