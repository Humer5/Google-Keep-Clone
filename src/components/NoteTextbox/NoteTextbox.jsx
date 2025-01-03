import { createSignal, onCleanup } from "solid-js"; // Import Solid.js signals
import "../../styles/notetextbox.css";

function NoteTextbox() {
  // Step 1: Track the input value using a signal (state variable)
  const [note, setNote] = createSignal(localStorage.getItem("note") || ""); // Load from localStorage or default to empty

  // Step 2: Save the note to localStorage whenever it changes
  const handleNoteChange = (event) => {
    const newNote = event.target.value;
    setNote(newNote);
    localStorage.setItem("note", newNote); // Save the note to localStorage
  };

  // Step 3: Load the initial value from localStorage on mount (already handled in line 5)

  return (
    <div class="note-textbox-container">
      <input
        type="text"
        placeholder="Take a note..."
        class="note-textbox"
        value={note()} // Bind the input value to the state variable
        onInput={handleNoteChange} // Update the note on input change
      />
      <div class="note-icons">
        <button class="note-icon-button">
          <span class="material-symbols-outlined">check_box</span>
        </button>
        <button class="note-icon-button">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="note-icon-button">
          <span class="material-symbols-outlined">image</span>
        </button>
      </div>
    </div>
  );
}

export default NoteTextbox;
