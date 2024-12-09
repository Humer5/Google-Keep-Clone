const form = document.getElementById('authForm');

// Default credentials
const defaultUsername = 'user123';
const defaultPassword = 'pass123';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const enteredUsername = document.getElementById('username').value.trim();
    const enteredPassword = document.getElementById('password').value.trim();

    if (enteredUsername === defaultUsername && enteredPassword === defaultPassword) {
        alert('Login Successful! Redirecting...');
        window.location.href = 'dashboard.html'; // Simulate redirection to main app/dashboard
    } else {
        alert('Invalid Credentials. Please try again.');
    }
});
