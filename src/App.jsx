import { createSignal, onMount } from "solid-js";
import { Router, Route, useNavigate } from "@solidjs/router";
import Login from "./components/Login/login";
import Layout from "./components/Layout/layout";

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  return (
    <Router>
      <Route path="/" component={LoginHandler} />
      <Route path="/layout" component={LayoutHandler} />
    </Router>
  );
};

const LoginHandler = () => {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const navigate = useNavigate();

  onMount(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setIsLoggedIn(true);
      navigate("/layout");
    }
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("/layout");
  };

  return (
    !isLoggedIn() ? (
      <Login onLoginSuccess={handleLoginSuccess} />
    ) : (
      <Layout>
        <NotesComponent />
      </Layout>
    )
  );
};

const LayoutHandler = () => (
  <Layout>
    <NotesComponent />
  </Layout>
);

const NotesComponent = () => {
  const [notes, setNotes] = createSignal([]);

  const handleNoteInput = (e) => {
    const newNote = {
      id: Date.now(),
      content: e.target.value,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div class="notes-container">
      <div class="note-input">
        <textarea placeholder="Take a note..." onInput={handleNoteInput} />
      </div>
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
  );
};

export default App;

