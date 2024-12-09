const addNoteButton = document.getElementById('addNote');
const noteContentInput = document.getElementById('noteContent');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <p contenteditable="true" onblur="updateNote(${index}, this.innerText)">${note}</p>
            <div class="note-actions">
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function addNote() {
    const noteContent = noteContentInput.value.trim();
    if (noteContent) {
        notes.push(noteContent);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        noteContentInput.value = '';
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function updateNote(index, newContent) {
    notes[index] = newContent.trim();
    localStorage.setItem('notes', JSON.stringify(notes));
}

addNoteButton.addEventListener('click', addNote);
renderNotes();
