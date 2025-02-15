// js/modules/auth.js

// Hardcoded credentials for demonstration purposes
const CREDENTIALS = {
    admin: { username: 'admin', password: 'admin123' },
    faculty: { username: 'faculty', password: 'faculty123' },
    student: { username: 'student', password: 'student123' },
};

function isValidCredentials(username, password) {
    // Simple validation: check if username and password are provided
    return username && password && password.length >= 4; // Example: password must be at least 4 characters
}

export async function login(username, password, role) {
    // Check for valid credentials
    if (!isValidCredentials(username, password)) {
        throw new Error('Invalid username or password format.');
    }

    // Simulate an asynchronous authentication process
    return new Promise((resolve) => {
        setTimeout(() => {
            // Validate credentials based on the role
            if (CREDENTIALS[role] && 
                username === CREDENTIALS[role].username && 
                password === CREDENTIALS[role].password) {
                localStorage.setItem('ums_user', JSON.stringify({ username, role }));
                resolve(true);
            } else {
                resolve(false);
            }
        }, 500);
    });
}

export function logout() {
    localStorage.removeItem('ums_user');
}