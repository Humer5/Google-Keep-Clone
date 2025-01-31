import { createSignal, createEffect, onCleanup } from "solid-js";
import "../../../styles/note-adder.css";

function NoteAdder() {
  const [notes, setNotes] = createSignal([]);
  const [hoveredNote, setHoveredNote] = createSignal(null);
  const [editingNoteIndex, setEditingNoteIndex] = createSignal(null);
  const [editContent, setEditContent] = createSignal("");
  const [viewingImage, setViewingImage] = createSignal(null);

  // Load notes from localStorage on component mount
  createEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  });

  // ✅ Listen for custom event from NoteBox.jsx to update notes in real-time
  const updateNotesFromEvent = (event) => {
    setNotes(event.detail);
  };

  window.addEventListener("notesUpdated", updateNotesFromEvent);

  // ✅ Cleanup event listener on unmount
  onCleanup(() => {
    window.removeEventListener("notesUpdated", updateNotesFromEvent);
  });

  const handleEdit = (index) => {
    setEditingNoteIndex(index);
    setEditContent(notes()[index].content);
  };

  const saveEdit = (index) => {
    const updatedNotes = [...notes()];
    updatedNotes[index].content = editContent();
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditingNoteIndex(null);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes().filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleImageClick = (src) => {
    setViewingImage(src);
  };

  const closeImageViewer = () => {
    setViewingImage(null);
  };

  return (
    <div class="notes-container">
      {notes().length === 0 ? (
        <p class="empty-notes">Notes that you add appear here...</p>
      ) : (
        notes().map((note, index) => (
          <div
            class="note-card"
            onMouseEnter={() => setHoveredNote(index)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            {note.title && <h3 class="note-title">{note.title}</h3>}
            {editingNoteIndex() === index ? (
              <textarea
                class="note-edit-textarea"
                value={editContent()}
                onInput={(e) => setEditContent(e.target.value)}
              />
            ) : (
              <p class="note-content">{note.content}</p>
            )}

            {note.image && (
              <div class="note-image-container">
                <img
                  src={note.image}
                  alt="Note content"
                  class="note-image"
                  onClick={() => handleImageClick(note.image)}
                />
              </div>
            )}

            {note.checklist && (
              <ul class="note-checklist">
                {note.checklist.map((item, idx) => (
                  <li key={idx}>
                    {item}
                    <button
                      onClick={() => {
                        const updatedNotes = [...notes()];
                        updatedNotes[index].checklist = updatedNotes[index].checklist.filter((_, i) => i !== idx);
                        setNotes(updatedNotes);
                        localStorage.setItem("notes", JSON.stringify(updatedNotes));
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div class="note-actions">
              {editingNoteIndex() === index ? (
                <button
                  class="note-action-button save-button"
                  onClick={() => saveEdit(index)}
                  title="Save changes"
                >
                  <span class="material-symbols-outlined">save</span>
                </button>
              ) : (
                <button
                  class="note-action-button edit-button"
                  onClick={() => handleEdit(index)}
                  title="Edit note"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>
              )}
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

      {viewingImage() && (
        <div class="image-viewer" onClick={closeImageViewer}>
          <img src={viewingImage()} alt="Full View" class="full-view-image" />
        </div>
      )}
    </div>
  );
}

export default NoteAdder;
