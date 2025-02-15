// js/app.js
import { login, logout } from './modules/auth.js';
import { loadStudentModule } from './modules/student.js';
import { loadCourseModule } from './modules/course.js';
import { loadFacultyModule } from './modules/faculty.js';
import { loadTimetableModule } from './modules/timetable.js';
import { loadExamModule } from './modules/exam.js';
import { loadFeeModule } from './modules/fee.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginPage = document.getElementById('login-page');
  const dashboard = document.getElementById('dashboard');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout');
  const moduleNav = document.getElementById('module-nav');
  const moduleContent = document.getElementById('module-content');

  // Check for active session
  const sessionUser = JSON.parse(localStorage.getItem('ums_user'));
  if (sessionUser) {
    loginPage.classList.add('d-none');
    dashboard.classList.remove('d-none');
    initializeNav(sessionUser.role);
  }

  // Login handler
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    const isAuthenticated = await login(username, password, role);
    if (isAuthenticated) {
      loginPage.classList.add('d-none');
      dashboard.classList.remove('d-none');
      initializeNav(role);
    } else {
      alert('❌ Invalid credentials! Try again.');
    }
  });

  // Logout handler
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    dashboard.classList.add('d-none');
    loginPage.classList.remove('d-none');
    moduleContent.innerHTML = '';
    alert('✅ Logged out successfully.');
  });

  // Build navigation dynamically based on user role
  function initializeNav(role) {
    moduleNav.innerHTML = '';

    const moduleList = {
      admin: ['student', 'course', 'faculty', 'timetable', 'exam', 'fee'],
      faculty: ['course', 'timetable', 'exam'],
      student: ['course', 'timetable', 'exam', 'fee']
    };

    const moduleLabels = {
      student: '🎓 Student Management',
      course: '📚 Course Management',
      faculty: '👨‍🏫 Faculty Management',
      timetable: '📅 Timetable Management',
      exam: '📝 Examination Management',
      fee: '💰 Fee Management'
    };

    const modules = moduleList[role] || [];
    modules.forEach(module => {
      const li = document.createElement('li');
      li.className = 'nav-item';
      li.innerHTML = `<a class="nav-link" href="#" data-module="${module}">${moduleLabels[module]}</a>`;
      moduleNav.appendChild(li);
    });
  }

  // Event delegation for module navigation
  moduleNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.dataset.module) {
      e.preventDefault();
      loadModule(e.target.dataset.module);
    }
  });

  // Module loader
  function loadModule(moduleId) {
    const moduleMap = {
      student: loadStudentModule,
      course: loadCourseModule,
      faculty: loadFacultyModule,
      timetable: loadTimetableModule,
      exam: loadExamModule,
      fee: loadFeeModule
    };

    try {
      if (moduleMap[moduleId]) {
        moduleContent.innerHTML = `<div class="alert alert-info">📌 Loading ${moduleId}...</div>`;
        setTimeout(() => {
          moduleMap[moduleId](moduleContent);
        }, 500);
      } else {
        throw new Error('Module not found.');
      }
    } catch (error) {
      moduleContent.innerHTML = `<div class="alert alert-danger">⚠️ Error: ${error.message}</div>`;
    }
  }
});
