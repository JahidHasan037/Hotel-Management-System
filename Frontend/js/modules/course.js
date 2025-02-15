// js/modules/course.js
export function loadCourseModule(container) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    function renderCourses() {
        const courseTable = document.getElementById('courseTable');
        courseTable.innerHTML = '';
        courses.forEach((course, index) => {
            const row = `<tr>
                <td>${course.name}</td>
                <td>${course.code}</td>
                <td>
                    <img src="${course.instructorPic}" alt="${course.instructorName}" class="student-img" />
                    ${course.instructorName} (ID: ${course.instructorId})
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" data-index="${index}" onclick="editCourse(event)">Edit</button>
                    <button class="btn btn-sm btn-danger" data-index="${index}" onclick="deleteCourse(event)">Delete</button>
                </td>
            </tr>`;
            courseTable.innerHTML += row;
        });
    }

    function saveCourses() {
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    function addOrUpdateCourse(e) {
        e.preventDefault();
        const index = document.getElementById('courseIndex').value;
        const name = document.getElementById('courseName').value;
        const code = document.getElementById('courseCode').value;
        const instructorId = document.getElementById('instructorId').value;
        const instructorName = document.getElementById('courseInstructor').value;
        const instructorPic = document.getElementById('instructorPic').files[0];

        const course = {
            name,
            code,
            instructorId,
            instructorName,
            instructorPic: instructorPic ? URL.createObjectURL(instructorPic) : ''
        };

        if (index === "") {
            courses.push(course);
        } else {
            courses[index] = course;
        }

        saveCourses();
        renderCourses();
        document.getElementById('courseForm').reset();
        document.getElementById('imagePreview').style.display = 'none'; // Hide preview after saving
    }

    window.editCourse = function(e) {
        const index = e.target.getAttribute('data-index');
        const course = courses[index];
        document.getElementById('courseName').value = course.name;
        document.getElementById('courseCode').value = course.code;
        document.getElementById('instructorId').value = course.instructorId;
        document.getElementById('courseInstructor').value = course.instructorName;
        
        // Display the current instructor picture
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = course.instructorPic || 'default-avatar.png';
        imagePreview.style.display = 'block'; // Show the preview

        document.getElementById('courseIndex').value = index;
    };

    window.deleteCourse = function(e) {
        courses.splice(e.target.getAttribute('data-index'), 1);
        saveCourses();
        renderCourses();
    };

    // Preview selected image
    window.previewImage = function() {
        const file = document.getElementById('instructorPic').files[0];
        const imagePreview = document.getElementById('imagePreview');
        if (file) {
            imagePreview.src = URL.createObjectURL(file);
            imagePreview.style.display = 'block'; // Show the preview
        } else {
            imagePreview.style.display = 'none'; // Hide if no file is selected
        }
    };

    container.innerHTML = `
        <div class="module-section">
            <h3>Course Management Module</h3>
            <form id="courseForm" class="mb-3">
                <input type="hidden" id="courseIndex">
                <div class="form-group">
                    <input type="text" id="courseName" class="form-control" placeholder="Course Name" required>
                </div>
                <div class="form-group">
                    <input type="text" id="courseCode" class="form-control" placeholder="Course Code" required>
                </div>
                <div class="form-group">
                    <input type="text" id="instructorId" class="form-control" placeholder="Instructor ID" required>
                </div>
                <div class="form-group">
                    <input type="text" id="courseInstructor" class="form-control" placeholder="Instructor Name" required>
                </div>
                <div class="form-group">
                    <input type="file" id="instructorPic" class="form-control" accept="image/*" onchange="previewImage()" required>
                </div>
                <img id="imagePreview" alt="Image Preview" class="student-img" style="display:none; margin-top: 10px;">
                <button type="submit" class="btn btn-primary">Save Course</button>
            </form>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Instructor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="courseTable"></tbody>
            </table>
        </div>
    `;

    document.getElementById('courseForm').addEventListener('submit', addOrUpdateCourse);
    renderCourses();
}
