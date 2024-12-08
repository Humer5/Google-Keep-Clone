const form = document.getElementById('authForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username)) {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            alert('Login successful!');
        } else {
            alert('Incorrect password!');
        }
    } else {
        localStorage.setItem(username, password);
        alert('Signup successful! Please log in.');
    }
});