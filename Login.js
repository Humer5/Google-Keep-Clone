document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Default credentials
    const defaultUsername = "admin";
    const defaultPassword = "password123";

    if (username === defaultUsername && password === defaultPassword) {
        alert("Login successful!");

        // Hide login section and show navigation
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('home-section').style.display = 'block';
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

function navigateTo(page) {
    if (page === 'CRUD') {
        window.location.href = 'Crud.html'; // Link to CRUD page
    } else if (page === 'ToDo') {
        window.location.href = 'todo.html'; // Link to To-Do page
    } else if (page === 'Images') {
        window.location.href = 'ImageOp.html'; // Link to Image Notes page
    }
}
