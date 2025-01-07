import { createSignal, onMount } from "solid-js";
import "../../styles/bin.css";

function Bin() {
  const [deletedNotes, setDeletedNotes] = createSignal([]); // Holds deleted notes

  // Load deleted notes from localStorage
  onMount(() => {
    const binNotes = JSON.parse(localStorage.getItem("deletedNotes")) || [];
    setDeletedNotes(binNotes);
  });

  // Restore a note to the main notes list
  const restoreNote = (noteIndex) => {
    const binNotes = [...deletedNotes()];
    const restoredNote = binNotes.splice(noteIndex, 1)[0];

    // Update deleted notes in localStorage
    setDeletedNotes(binNotes);
    localStorage.setItem("deletedNotes", JSON.stringify(binNotes));

    // Add the restored note to the main notes list in localStorage
    const mainNotes = JSON.parse(localStorage.getItem("notes")) || [];
    localStorage.setItem("notes", JSON.stringify([...mainNotes, restoredNote]));
  };

  // Permanently delete a note
  const deleteNotePermanently = (noteIndex) => {
    const binNotes = [...deletedNotes()];
    binNotes.splice(noteIndex, 1);

    // Update deleted notes in localStorage
    setDeletedNotes(binNotes);
    localStorage.setItem("deletedNotes", JSON.stringify(binNotes));
  };

  return (
    <div class="bin-container">
      <h2>Deleted Notes</h2>
      {deletedNotes().length === 0 ? (
        <p class="empty-bin-message">Your bin is empty</p>
      ) : (
        <div class="deleted-notes-list">
          {deletedNotes().map((note, index) => (
            <div class="deleted-note" key={index}>
              {/* Note title */}
              {note.title && <h3 class="note-title">{note.title}</h3>}

              {/* Note content */}
              {note.content && <p class="note-content">{note.content}</p>}

              {/* Display image if it exists */}
              {note.image && (
                <div class="note-image">
                  <img src={note.image} alt="Deleted note" />
                </div>
              )}

              {/* Action buttons */}
              <div class="note-actions">
                <button
                  class="restore-btn"
                  onClick={() => restoreNote(index)}
                >
                  Restore
                </button>
                <button
                  class="delete-btn"
                  onClick={() => deleteNotePermanently(index)}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bin;
