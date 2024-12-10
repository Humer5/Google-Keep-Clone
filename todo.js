let notes = [];

document.getElementById('noteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    const note = {
        id: Date.now(),
        title,
        content,
        completed: false,
    };

    notes.push(note);
    displayNotes('all');

    document.getElementById('noteForm').reset();
});

document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayNotes(button.dataset.filter);
    });
});

function displayNotes(filter) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    let filteredNotes = notes;
    if (filter === 'active') {
        filteredNotes = notes.filter(note => !note.completed);
    } else if (filter === 'completed') {
        filteredNotes = notes.filter(note => note.completed);
    }

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        if (note.completed) noteDiv.classList.add('completed');

        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="toggleCompletion(${note.id})">
                ${note.completed ? 'Mark Active' : 'Mark Completed'}
            </button>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function toggleCompletion(id) {
    notes = notes.map(note => note.id === id ? { ...note, completed: !note.completed } : note);
    const activeFilter = document.querySelector('.filter.active').dataset.filter;
    displayNotes(activeFilter);
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    const activeFilter = document.querySelector('.filter.active').dataset.filter;
    displayNotes(activeFilter);
}

