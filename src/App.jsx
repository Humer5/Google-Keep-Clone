import { createSignal } from "solid-js";
import Layout from "./components/Layout/layout";


// Sample content for demonstration
const App = () => {
  const [notes, setNotes] = createSignal([
    { id: 1, content: "First note", completed: false },
    { id: 2, content: "Second note", completed: false },
  ]);

  return (
    <Layout>
      {/* Main Content Area */}
      <div class="notes-container">
        {/* Notes input box */}
        <div class="note-input">
          <textarea placeholder="Take a note..." />
          <div class="note-actions">
            <button>
              <span class="material-symbols-outlined">check_box</span>
            </button>
            <button>
              <span class="material-symbols-outlined">brush</span>
            </button>
            <button>
              <span class="material-symbols-outlined">image</span>
            </button>
          </div>
        </div>

        {/* Notes list */}
        <div class="notes-list">
          {notes().length > 0 ? (
            notes().map((note) => (
              <div class="note-item" key={note.id}>
                <p>{note.content}</p>
              </div>
            ))
          ) : (
            <div class="empty-state">
              <span class="material-symbols-outlined">lightbulb</span>
              <p>Notes that you add appear here</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
