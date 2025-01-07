import { createSignal, createEffect } from "solid-js";
import "../../../styles/note-adder.css";

function NoteAdder() {
  const [notes, setNotes] = createSignal([]);
  const [hoveredNote, setHoveredNote] = createSignal(null);

  // Load notes from localStorage on component mount
  createEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  });

  const handlePin = (index) => {
    const updatedNotes = [...notes()];
    updatedNotes[index].pinned = !updatedNotes[index].pinned;
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDelete = (index) => {
    const updatedNotes = notes().filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (noteIndex) => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const deletedNote = notes.splice(noteIndex, 1)[0];
    localStorage.setItem("notes", JSON.stringify(notes));
  
    const deletedNotes = JSON.parse(localStorage.getItem("deletedNotes")) || [];
    localStorage.setItem("deletedNotes", JSON.stringify([...deletedNotes, deletedNote]));
  };
  
  return (
    <div class="notes-container">
      {notes().length === 0 ? (
        <p class="empty-notes">Notes that you add appear here...</p>
      ) : (
        notes().map((note, index) => (
          <div
            class={`note-card ${note.pinned ? "pinned" : ""}`}
            onMouseEnter={() => setHoveredNote(index)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            {note.title && <h3 class="note-title">{note.title}</h3>}
            <p class="note-content">{note.content}</p>
            <div class="note-actions">
              <button
                class={`note-action-button pin-button ${
                  note.pinned ? "active" : ""
                }`}
                onClick={() => handlePin(index)}
                title="Pin note"
              >
                <span class="material-symbols-outlined">push_pin</span>
              </button>
              {hoveredNote() === index && (
                <button
                  class="note-action-button delete-button"
                  onClick={() => handleDelete(index)}
                  title="Delete note"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NoteAdder;
