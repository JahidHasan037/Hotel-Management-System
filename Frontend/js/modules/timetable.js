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