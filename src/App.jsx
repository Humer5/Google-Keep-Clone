import { createSignal } from "solid-js";
// import Login from "./components/Login/login";
import Layout from "./components/Layout/layout";


const App = () => {
  // const [notes, setNotes] = createSignal([]);
 
 
  return (
  <div>
    {/* <Login/> */}
    <Layout>
      {/* Main Content Area */}
      <div class="notes-container">
        {/* Notes input box */}
        <div class="note-input">
          <textarea placeholder="Take a note..." />
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
    </div>
  );
};

export default App;
